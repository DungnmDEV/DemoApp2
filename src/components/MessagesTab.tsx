import React, { useState } from 'react';
import { Search, SlidersHorizontal, Edit3, CheckCheck } from 'lucide-react';
import { ActiveUser, ChatConversation } from '../types';
import { currentUser } from '../data/mockData';
import { ChatDetailView } from './ChatDetailView';

interface MessagesTabProps {
  activeUsers: ActiveUser[];
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string | null) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onNavigateToProfile?: () => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({
  activeUsers,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onNavigateToProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);

  // If a conversation is active, render the ChatDetailView!
  const currentChat = conversations.find((c) => c.id === activeConversationId);
  if (currentChat) {
    return (
      <ChatDetailView
        conversation={currentChat}
        onBack={() => onSelectConversation(null)}
        onSendMessage={onSendMessage}
      />
    );
  }

  const filteredConversations = conversations.filter(
    (c) =>
      c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-full pb-20 bg-[#F0F2F5]">
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#0068FF] px-4 py-3 shadow-sm text-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateToProfile}
            className="group relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/50 transition hover:ring-white"
          >
            <img src={currentUser.avatar} alt="Alex" className="h-full w-full object-cover" />
          </button>
          <span className="text-xl font-bold tracking-tight text-white">Tin nhắn</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setNewChatModalOpen(true)}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Tin nhắn mới"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-[#0068FF]/5">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 shadow-xs">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            id="messages-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bạn bè, tin nhắn..."
            className="w-full bg-transparent text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* ACTIVE NOW section */}
      <div className="bg-white border-y border-gray-100 shadow-2xs py-2.5 mb-3">
        <div className="flex items-center justify-between px-4 pb-2">
          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
            Đang hoạt động
          </span>
          <button className="text-[11px] font-bold text-[#0068FF] hover:underline">
            Tất cả
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 py-1 no-scrollbar">
          {activeUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => {
                const target = conversations.find(c => c.userName.toLowerCase().includes(user.name.toLowerCase()));
                if (target) onSelectConversation(target.id);
                else onSelectConversation(conversations[0]?.id || null);
              }}
              className="flex shrink-0 flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500 p-0.5 group-hover:scale-105 transition"
                />
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] font-medium text-[#1A1A1A] max-w-[60px] truncate">{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Chats Section */}
      <div className="px-3">
        <div className="flex items-center justify-between px-2 py-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">Tin nhắn gần đây</h3>
          <button className="rounded-full p-1 text-gray-400 hover:text-gray-600">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Conversation List Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              id={`conversation-item-${conv.id}`}
              onClick={() => onSelectConversation(conv.id)}
              className={`flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50 cursor-pointer transition ${
                conv.unreadCount > 0 ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={conv.avatar}
                  alt={conv.userName}
                  className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
                />
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                    {conv.unreadCount}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="truncate text-sm font-bold text-[#1A1A1A]">
                    {conv.userName}
                  </h4>
                  <span
                    className={`text-[10px] ${
                      conv.unreadCount > 0 ? 'text-[#0068FF] font-bold' : 'text-gray-400'
                    }`}
                  >
                    {conv.time}
                  </span>
                </div>
                <p
                  className={`truncate text-xs leading-relaxed ${
                    conv.unreadCount > 0
                      ? 'font-medium text-[#0068FF]'
                      : 'text-gray-500'
                  }`}
                >
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        id="fab-new-chat-btn"
        onClick={() => setNewChatModalOpen(true)}
        className="fixed bottom-20 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:scale-105 active:scale-95 transition"
        title="Soạn tin nhắn"
      >
        <Edit3 className="h-5 w-5" />
      </button>

      {/* Simple New Chat Modal */}
      {newChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl border border-gray-100">
            <h3 className="text-base font-bold text-[#1A1A1A] mb-1">Cuộc trò chuyện mới</h3>
            <p className="text-xs text-gray-500 mb-4">Chọn liên hệ để bắt đầu nhắn tin ngay.</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setNewChatModalOpen(false);
                    onSelectConversation(c.id);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <img src={c.avatar} alt={c.userName} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{c.userName}</p>
                    <p className="text-[10px] text-slate-500">{c.userRole || 'Team Member'}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setNewChatModalOpen(false)}
              className="mt-4 w-full rounded-xl bg-slate-100 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
