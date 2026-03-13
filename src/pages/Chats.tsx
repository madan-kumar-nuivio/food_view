import { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import { getChatUsers, getChatMessages, sendChatMessage } from '../services/mockDataService';
import { useStore } from '../store/useStore';
import type { ChatUser, ChatMessage } from '../types';

export default function Chats() {
  const { activeChatId, setActiveChatId } = useStore();
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [search, setSearch] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat users on mount
  useEffect(() => {
    getChatUsers().then((users) => {
      setChatUsers(users);
      setLoading(false);
    });
  }, []);

  // Load messages when active chat changes
  useEffect(() => {
    if (!activeChatId) return;
    getChatMessages(activeChatId).then(setMessages);
  }, [activeChatId]);

  const activeUser = chatUsers.find((u) => u.id === activeChatId);

  const filteredUsers = chatUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async () => {
    if (!messageInput.trim()) return;
    const text = messageInput.trim();
    setMessageInput('');

    // Optimistic update
    const optimistic: ChatMessage = {
      id: `local-${Date.now()}`,
      senderId: 'admin',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages((prev) => [...prev, optimistic]);

    // Send to API
    try {
      const saved = await sendChatMessage(activeChatId, text);
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? saved : m))
      );
    } catch {
      // Keep optimistic message on failure
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
      {/* Left Panel - Chat List */}
      <div className="w-80 border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Messages</h3>
          <SearchBar value={search} onChange={setSearch} placeholder="Search contacts..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setActiveChatId(user.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                activeChatId === user.id
                  ? 'bg-primary-lightest border-l-4 border-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative shrink-0">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                  <span className="text-xs text-gray-400 shrink-0">{user.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
              </div>
              {user.unread && (
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shrink-0">
                  {user.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeUser && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{activeUser.name}</p>
                <p className="text-xs text-emerald-500">{activeUser.online ? 'Active now' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Phone size={18} className="text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Video size={18} className="text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <MoreVertical size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.isOwn
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-700 rounded-bl-md'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.isOwn ? 'text-violet-200' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Paperclip size={18} className="text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Smile size={18} className="text-gray-400" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-200"
            />
            <button
              onClick={handleSend}
              className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
