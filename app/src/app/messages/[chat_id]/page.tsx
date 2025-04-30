'use client';
import { useEffect, useState, FormEvent, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import useStore from '@/lib/Zustand';
import useWebSocket from '../../../hooks/useWebSocket';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import Link from 'next/link';

interface Message {
  messagesid: string;
  chat_id: string;
  userrefid: string;
  username: string;
  description: string;
  readstatus: boolean;
  tstamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { chat_id } = useParams();
  const searchParams = useSearchParams();
  const { userId } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [otherUser, setOtherUser] = useState<string>('Unknown User');
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chat_id as string | null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket setup
  const { sendMessage } = useWebSocket(currentChatId || '', (message) => {
    if (!message.messagesid || !currentChatId) return;
    if (message.error) {
      toast.error(message.error);
      return;
    }
    setMessages((prev) => {
      // Avoid duplicating messages
      if (prev.some((m) => m.messagesid === message.messagesid)) {
        return prev;
      }
      const updatedMessages = [...prev, { ...message, tstamp: message.tstamp || new Date().toISOString() }];
      // Mark incoming messages as read if not from current user
      if (message.userrefid !== userId) {
        markMessagesAsRead([message]);
      }
      return updatedMessages;
    });
  });

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages or initialize new chat
  useEffect(() => {
    if (!userId) {
      router.push('/signin');
      return;
    }

    const sender = searchParams.get('sender');
    const receiver = searchParams.get('receiver');

    const initializeChat = async () => {
      try {
        if (chat_id) {
          // Existing chat: fetch messages
          const response = await axiosInstance.get(`/get-messages/${chat_id}`);
          if (response.data.status_code === 200) {
            const fetchedMessages: Message[] = response.data.data || [];
            setMessages(fetchedMessages);

            // Determine other user
            const otherUserMessage = fetchedMessages.find((msg) => msg.userrefid !== userId);
            let targetReceiverId = receiverId;
            let targetUsername = 'Unknown User';

            if (otherUserMessage) {
              targetReceiverId = otherUserMessage.userrefid;
              targetUsername = otherUserMessage.username;
            } else {
              // Fetch chat details to get other user
              const chatResponse = await axiosInstance.get(`/get-chat/${chat_id}`);
              if (chatResponse.data.status_code === 200) {
                const otherUserId = chatResponse.data.data.userrefid.find((id: string) => id !== userId);
                if (otherUserId) {
                  const userResponse = await axiosInstance.get(`/user/${otherUserId}`);
                  if (userResponse.data.status_code === 200) {
                    targetUsername = userResponse.data.data.username || 'Unknown User';
                    targetReceiverId = otherUserId;
                  }
                }
              }
            }

            setOtherUser(targetUsername);
            setReceiverId(targetReceiverId);

            // Mark unread messages as read
            const unreadMessages = fetchedMessages.filter(
              (msg) => !msg.readstatus && msg.userrefid !== userId
            );
            if (unreadMessages.length > 0) {
              markMessagesAsRead(unreadMessages);
            }
          } else {
            throw new Error(response.data.message || 'Invalid chat');
          }
        } else if (receiver && sender === userId) {
          // New chat: fetch receiver's details
          const userResponse = await axiosInstance.get(`/user/${receiver}`);
          if (userResponse.data.status_code === 200) {
            setOtherUser(userResponse.data.data.username || 'Unknown User');
            setReceiverId(receiver);
          }
          setMessages([]);
        } else {
          throw new Error('Invalid chat parameters');
        }
      } catch (error: any) {
        console.error('Error initializing chat:', error);
        toast.error(error.response?.data?.message || 'Failed to initialize chat');
        router.push('/messages');
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [chat_id, userId, router, searchParams, receiverId]);

  // Mark messages as read
  const markMessagesAsRead = async (msgs: Message[]) => {
    try {
      for (const msg of msgs) {
        if (!msg.readstatus && msg.userrefid !== userId) {
          await axiosInstance.put(`/mark-as-read/${msg.messagesid}`);
          setMessages((prev) =>
            prev.map((m) =>
              m.messagesid === msg.messagesid ? { ...m, readstatus: true } : m
            )
          );
        }
      }
    } catch (error: any) {
      console.error('Error marking messages as read:', error);
      toast.error('Failed to update message status');
    }
  };

  // Send a new message
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId || isSending) {
      toast.error('Please enter a message');
      return;
    }
    if (!receiverId) {
      toast.error('No recipient selected');
      return;
    }

    setIsSending(true);
    try {
      const payload = {
        sender_id: userId,
        receiver_id: receiverId,
        description: newMessage,
        chat_id: currentChatId || undefined,
      };
      const response = await axiosInstance.post('/send-message/', payload);
      if (response.data.status_code === 200) {
        const sentMessage = response.data.data.message;
        const newChatId = response.data.data.chat_id;

        if (!currentChatId && newChatId) {
          setCurrentChatId(newChatId);
          router.replace(`/messages/${newChatId}`);
        }

        const messageToSend: Message = {
          messagesid: sentMessage.messagesid,
          chat_id: newChatId,
          userrefid: userId,
          username: sentMessage.username || 'You',
          description: newMessage,
          readstatus: false,
          tstamp: new Date().toISOString(),
        };

        // Update local state
        setMessages((prev) => [...prev, messageToSend]);
        sendMessage(messageToSend);
        setNewMessage('');
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('bids');
    router.push('/');
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
              Browse Tasks
            </Link>
            <Link href="/post-task" className="text-sm font-medium hover:underline underline-offset-4">
              Post a Task
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:underline underline-offset-4">
              Messages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/messages" className="text-sm text-muted-foreground hover:underline">
              ← Back to Messages
            </Link>
          </div>
          <div className="border rounded-md p-4 h-[500px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{otherUser.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-medium">{otherUser}</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.messagesid}
                    className={`flex ${msg.userrefid === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.userrefid === userId ? 'bg-primary text-white' : 'bg-gray-100'
                      }`}
                    >
                      <p>{msg.description}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.tstamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}