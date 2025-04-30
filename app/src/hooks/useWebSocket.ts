

import { useEffect, useRef } from 'react';

export default function useWebSocket(chatId: string, onMessage: (message: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chatId) {
      console.warn('No chatId provided, WebSocket connection not established.');
      return;
    }

    const url = `ws://127.0.0.1:8000/ws/chat/${chatId}`;
    // const url = `wss://api.jobpool.in:8000/ws/chat/${chatId}`;
    console.log('Connecting to Chat WebSocket at URL:', url);

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('Chat WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (onMessage) {
        // Add incoming message and then trigger re-sorting via onMessage callback
        onMessage(message);
      }
    };

    socketRef.current.onerror = (event) => {
      console.error('Chat WebSocket error:', event);
    };

    socketRef.current.onclose = (event) => {
      console.log('Chat WebSocket disconnected', event);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [chatId, onMessage]);

  // Function to send a message through WebSocket
  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('Chat WebSocket is not open. Unable to send message:', message);
    }
  };

  return { sendMessage };
}
