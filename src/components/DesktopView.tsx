import React, { useState } from 'react';
import { 
  Newspaper, 
  MessageSquare, 
  Users, 
  Grid, 
  User, 
  Search, 
  Plus, 
  TrendingUp, 
  UserPlus, 
  Bell, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import { FeedTab } from './FeedTab';
import { MessagesTab } from './MessagesTab';
import { AppsTab } from './AppsTab';
import { ContactsTab } from './ContactsTab';
import { ProfileTab } from './ProfileTab';
import { 
  StoryItem, 
  PostItem, 
  ActiveUser, 
  ChatConversation, 
  AppToolItem, 
  ContactItem 
} from '../types';
import { currentUser } from '../data/mockData';

interface DesktopViewProps {
  currentTab: 'feed' | 'messages' | 'apps' | 'contacts' | 'profile';
  onSelectTab: (tab: 'feed' | 'messages' | 'apps' | 'contacts' | 'profile') => void;
  stories: StoryItem[];
  posts: PostItem[];
  activeUsers: ActiveUser[];
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string | null) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  apps: AppToolItem[];
  contacts: ContactItem[];
  onOpenStory: (story: StoryItem) => void;
  onOpenCreatePost: () => void;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  currentTab,
  onSelectTab,
  stories,
  posts,
  activeUsers,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  apps,
  contacts,
  onOpenStory,
  onOpenCreatePost,
  onToggleLike,
  onToggleBookmark,
}) => {
  const [addedPeople, setAddedPeople] = useState<string[]>([]);

  const suggestedPeople = [
    { id: 'p-1', name: 'Elena Rostova', role: 'AI Research Scientist', mutual: '14 mutual contacts', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 'p-2', name: 'Dr. Tariq Vance', role: 'Chief Data Officer', mutual: '8 mutual contacts', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 'p-3', name: 'Maya Lin', role: 'Product Lead @ Core', mutual: '23 mutual contacts', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
  ];

  const trendingTopics = [
    { tag: '#ArtificialIntelligence', count: '24.5k posts', growth: '+18%' },
    { tag: '#CloudDistributedMesh', count: '16.8k posts', growth: '+12%' },
    { tag: '#FlutterCrossPlatform', count: '14.2k posts', growth: '+29%' },
    { tag: '#EnterpriseSynergy', count: '9.4k posts', growth: '+8%' },
  ];

  const handleToggleAdd = (id: string) => {
    if (addedPeople.includes(id)) {
      setAddedPeople(addedPeople.filter(p => p !== id));
    } else {
      setAddedPeople([...addedPeople, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Desktop Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0068FF] px-6 py-2.5 shadow-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectTab('feed')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0068FF] font-black text-xl shadow-xs">
                S
              </div>
              <div className="leading-none">
                <span className="text-xl font-bold tracking-tight text-white">Synergy</span>
                <span className="block text-[10px] font-bold text-white/80 tracking-wider">PRO CONNECT</span>
              </div>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, công cụ, đồng nghiệp..."
                className="w-full rounded-full border border-white/20 bg-white/10 pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/70 focus:bg-white focus:text-[#1A1A1A] focus:placeholder-gray-400 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-400 ring-2 ring-[#0068FF]" />
            </button>

            <div 
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2.5 pl-3 border-l border-white/20 cursor-pointer hover:opacity-90 transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-none">{currentUser.name}</span>
                <span className="block text-[10px] text-white/80">{currentUser.title}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main 3-Column Body */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 p-6">
        {/* Left Column: Navigation Sidebar */}
        <aside className="w-64 shrink-0 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <nav className="space-y-1">
              <button
                onClick={() => onSelectTab('feed')}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentTab === 'feed'
                    ? 'bg-[#0068FF] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Newspaper className="h-4 w-4" />
                <span>Bản tin</span>
              </button>

              <button
                onClick={() => onSelectTab('messages')}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentTab === 'messages'
                    ? 'bg-[#0068FF] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4" />
                  <span>Tin nhắn</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                  currentTab === 'messages' ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#0068FF]'
                }`}>
                  3
                </span>
              </button>

              <button
                onClick={() => onSelectTab('contacts')}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentTab === 'contacts'
                    ? 'bg-[#0068FF] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Danh bạ</span>
              </button>

              <button
                onClick={() => onSelectTab('apps')}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentTab === 'apps'
                    ? 'bg-[#0068FF] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Ứng dụng</span>
              </button>

              <button
                onClick={() => onSelectTab('profile')}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentTab === 'profile'
                    ? 'bg-[#0068FF] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Cá nhân</span>
              </button>
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={onOpenCreatePost}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0068FF] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-600 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Tạo bài viết</span>
              </button>
            </div>
          </div>

          {/* Quick Stats widget */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Trạng thái hệ thống</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Đồng bộ nền tảng</span>
                <span className="font-bold text-emerald-600">Đang chạy (v3.2)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Flutter Mobile Node</span>
                <span className="font-bold text-[#0068FF]">Đã kết nối</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mã hóa dữ liệu</span>
                <span className="font-bold text-[#1A1A1A]">TLS 1.3 / E2E</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column: Dynamic Screen Content */}
        <main className="flex-1 max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {currentTab === 'feed' && (
            <FeedTab
              stories={stories}
              posts={posts}
              onOpenStory={onOpenStory}
              onOpenCreatePost={onOpenCreatePost}
              onToggleLike={onToggleLike}
              onToggleBookmark={onToggleBookmark}
              onNavigateToProfile={() => onSelectTab('profile')}
            />
          )}

          {currentTab === 'messages' && (
            <MessagesTab
              activeUsers={activeUsers}
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={onSelectConversation}
              onSendMessage={onSendMessage}
              onNavigateToProfile={() => onSelectTab('profile')}
            />
          )}

          {currentTab === 'apps' && (
            <AppsTab apps={apps} onNavigateToProfile={() => onSelectTab('profile')} />
          )}

          {currentTab === 'contacts' && (
            <ContactsTab
              contacts={contacts}
              onOpenChatWithUser={(userName) => {
                const target = conversations.find(c => c.userName.toLowerCase().includes(userName.toLowerCase()));
                onSelectTab('messages');
                if (target) onSelectConversation(target.id);
                else onSelectConversation(conversations[0]?.id || null);
              }}
              onNavigateToProfile={() => onSelectTab('profile')}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileTab
              onOpenChat={() => {
                onSelectTab('messages');
                onSelectConversation(conversations[0]?.id || null);
              }}
            />
          )}
        </main>

        {/* Right Column: People You May Know & Trending Topics */}
        <aside className="w-80 shrink-0 space-y-4">
          {/* People you may know */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                Người bạn có thể biết
              </h4>
              <button className="text-[11px] font-bold text-[#0068FF] hover:underline cursor-pointer">
                Xem tất cả
              </button>
            </div>

            <div className="space-y-3">
              {suggestedPeople.map((person) => {
                const isAdded = addedPeople.includes(person.id);
                return (
                  <div key={person.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={person.avatar} alt={person.name} className="h-9 w-9 rounded-full object-cover shrink-0" />
                      <div className="min-w-0">
                        <h5 className="truncate text-xs font-bold text-[#1A1A1A] leading-tight">{person.name}</h5>
                        <p className="truncate text-[10px] text-gray-500">{person.role}</p>
                        <p className="text-[9px] text-gray-400">{person.mutual}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAdd(person.id)}
                      className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-[#0068FF] hover:bg-blue-100'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Đã thêm</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3 w-3" />
                          <span>Kết bạn</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
              <TrendingUp className="h-4 w-4 text-[#0068FF]" />
              <span>Chủ đề thịnh hành</span>
            </div>

            <div className="space-y-2.5">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between text-xs hover:bg-gray-50 p-1.5 rounded-lg transition cursor-pointer">
                  <div>
                    <span className="font-bold text-[#0068FF] block">{topic.tag}</span>
                    <span className="text-[10px] text-gray-400">{topic.count}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">{topic.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
