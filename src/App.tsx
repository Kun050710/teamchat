import React, { useState } from 'react';
import {
  Search,
  Users,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Circle,
  Menu,
  X,
} from 'lucide-react';

const mockChats = [
  {
    id: 1,
    name: 'Design Team',
    lastMessage: 'Great work on the new layout!',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=120&fit=crop',
    unread: 2,
  },
  {
    id: 2,
    name: 'Sarah Parker',
    lastMessage: 'When can we schedule the meeting?',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    unread: 0,
  },
  {
    id: 3,
    name: 'Project Alpha',
    lastMessage: 'The deadline has been extended',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=120&h=120&fit=crop',
    unread: 5,
  },
];

const mockMessages = [
  {
    id: 1,
    content: "Hey, how's the new design coming along?",
    sent: false,
    timestamp: '09:41',
  },
  {
    id: 2,
    content: "It's going great! I've just finished the main layout and working on the animations now.",
    sent: true,
    timestamp: '09:42',
  },
  {
    id: 3,
    content: "That sounds awesome! Can't wait to see it.",
    sent: false,
    timestamp: '09:43',
  },
];

function App() {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Handle send message
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatSelect = (chat: typeof mockChats[0]) => {
    setActiveChat(chat);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting a chat
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Left Panel */}
      <div
        className={`
          fixed lg:relative
          w-full lg:w-80
          h-full
          bg-gray-900
          border-r border-gray-800
          flex flex-col
          transition-transform duration-300
          z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-gray-800 mt-14 lg:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${
                activeChat.id === chat.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  {chat.isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1">
                      <Users className="w-3 h-3 text-blue-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between min-h-[72px]">
          <div className="flex items-center space-x-3">
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <h2 className="font-semibold">{activeChat.name}</h2>
              <div className="flex items-center text-sm text-gray-400">
                <Circle className="w-2 h-2 text-green-500 mr-2 fill-current" />
                Online
              </div>
            </div>
          </div>
          <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] px-4 py-2 rounded-2xl ${
                  msg.sent
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                    : 'bg-gray-800'
                }`}
              >
                <p className="text-sm sm:text-base">{msg.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center text-sm text-gray-400 mt-2">
            <div className="flex space-x-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
            </div>
            <span className="ml-2">Sarah is typing...</span>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-end space-x-3">
            <div className="flex-1 bg-gray-800 rounded-lg p-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent resize-none focus:outline-none text-sm sm:text-base max-h-32 min-h-[44px]"
                rows={1}
              />
            </div>
            <div className="flex space-x-2">
              <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
                <Paperclip className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
                <Smile className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;