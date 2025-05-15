import { useEffect, useRef, useState } from "react";
import useStore from '@/lib/Zustand';

interface WebSocketMessage {
  messagesid: string;
  chat_id: string;
  userrefid: string;
  username: string;
  description: string;
  readstatus: boolean;
  tstamp: string;
}

interface WebSocketError {
  error: string;
}

type WebSocketResponse = { message: WebSocketMessage } | { error: string };

const useWebSocket = (chatId: string, onMessage: (message: WebSocketMessage) => void) => {
  const { userId } = useStore();
  const wsRef = useRef<WebSocket | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = () => {
    if (!chatId || !userId) {
      console.warn('useWebSocket - Missing chatId or userId');
      return;
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/chat/${chatId}?user_id=${userId}`;
    console.log('useWebSocket - Connecting to:', wsUrl);
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('useWebSocket - WebSocket connected for chat:', chatId);
      setReconnectAttempts(0); // Reset reconnect attempts on successful connection
    };

    wsRef.current.onmessage = (event) => {
      console.log('useWebSocket - Received message at:', new Date().toISOString(), event.data);
      try {
        const data: WebSocketResponse = JSON.parse(event.data);
        if ('error' in data) {
          console.error('useWebSocket - Error in message:', data.error);
          return;
        }
        onMessage(data.message);
      } catch (error) {
        console.error('useWebSocket - Error parsing message:', error);
      }
    };

    wsRef.current.onclose = (event) => {
      console.log('useWebSocket - WebSocket closed for chat:', chatId, 'Code:', event.code, 'Reason:', event.reason);
      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000); // Exponential backoff, max 30s
        console.log(`useWebSocket - Attempting to reconnect in ${delay}ms...`);
        reconnectInterval.current = setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connectWebSocket();
        }, delay);
      } else {
        console.error('useWebSocket - Max reconnect attempts reached');
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('useWebSocket - WebSocket error:', error);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectInterval.current) {
        clearTimeout(reconnectInterval.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [chatId, userId]);

  const sendMessage = (message: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('useWebSocket - Sending message:', message);
      wsRef.current.send(JSON.stringify({ message }));
    } else {
      console.error('useWebSocket - WebSocket not open, queuing message');
      // Optionally queue the message and retry after reconnection
      setTimeout(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ message }));
        }
      }, 1000);
    }
  };

  return { sendMessage };
};

export default useWebSocket;