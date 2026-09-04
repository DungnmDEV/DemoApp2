import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Code2, 
  RotateCcw, 
  Layers, 
  ExternalLink,
  Sparkles,
  Download,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';
import { DesktopView } from './components/DesktopView';
import { FeedTab } from './components/FeedTab';
import { MessagesTab } from './components/MessagesTab';
import { AppsTab } from './components/AppsTab';
import { ContactsTab } from './components/ContactsTab';
import { ProfileTab } from './components/ProfileTab';
import { StoryViewerModal } from './components/StoryViewerModal';
import { CreatePostModal } from './components/CreatePostModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import LoginView from './components/LoginView';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  mockStories, 
  mockPosts, 
  mockActiveUsers, 
  mockConversations, 
  mockApps, 
  mockContacts 
} from './data/mockData';
import { StoryItem, PostItem, ChatConversation } from './types';

function AppContent() {
  // Auth state
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Navigation and view state
  const [activeTab, setActiveTab] = useState<'feed' | 'messages' | 'apps' | 'contacts' | 'profile'>('feed');
  const [displayMode, setDisplayMode] = useState<'mobile' | 'desktop'>('mobile');
  const [deviceType, setDeviceType] = useState<'iphone' | 'pixel'>('iphone');

  // Modals state
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [flutterModalOpen, setFlutterModalOpen] = useState(false);

  // Dynamic state for interactive demo
  const [posts, setPosts] = useState<PostItem[]>(mockPosts);
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Like toggle
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );
  };

  // Bookmark toggle
  const handleToggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, isBookmarked: !post.isBookmarked };
        }
        return post;
      })
    );
  };

  // Create post
  const handleAddPost = (newPost: PostItem) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Send message
  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'user-self',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
          };
          return {
            ...conv,
            lastMessage: text,
            time: 'Just now',
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  // Reset demo data
  const handleResetData = () => {
    setPosts(mockPosts);
    setConversations(mockConversations);
    setActiveConversationId(null);
    setActiveTab('feed');
  };

  // Unread badge count
  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Demo Bar / Client Presentation Toolbar */}
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0068FF] font-extrabold text-white">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white tracking-tight">Synergy Flutter Demo</span>
              <span className="rounded-full bg-[#0068FF]/20 px-2 py-0.5 text-[10px] font-bold text-[#0068FF]">
                Clean Minimalism UI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              5 Tabs: Bản tin • Tin nhắn • Ứng dụng • Danh bạ • Cá nhân
            </p>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center gap-2">
          {/* View mode toggle: Mobile vs Desktop */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              id="view-mode-mobile-btn"
              onClick={() => setDisplayMode('mobile')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                displayMode === 'mobile'
                  ? 'bg-[#0068FF] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile App</span>
            </button>

            <button
              id="view-mode-desktop-btn"
              onClick={() => setDisplayMode('desktop')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                displayMode === 'desktop'
                  ? 'bg-[#0068FF] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Bản Desktop</span>
            </button>
          </div>

          {/* Device hardware frame toggle (only when mobile is active) */}
          {displayMode === 'mobile' && (
            <div className="hidden md:flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                onClick={() => setDeviceType('iphone')}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                  deviceType === 'iphone' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                onClick={() => setDeviceType('pixel')}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                  deviceType === 'pixel' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pixel 9
              </button>
            </div>
          )}

          {/* Inspect & Copy Flutter Code Button */}
          <button
            id="open-flutter-code-btn"
            onClick={() => setFlutterModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0068FF] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-600 transition cursor-pointer"
          >
            <Code2 className="h-4 w-4" />
            <span>Mã nguồn Flutter (Dart)</span>
          </button>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800 ml-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-white leading-tight">{user?.username}</span>
              <span className="text-[10px] text-slate-400 leading-tight uppercase tracking-wider">{user?.type}</span>
            </div>
            <button
              onClick={logout}
              className="rounded-xl bg-slate-800/50 p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          {/* Reset Demo State Button */}
          <button
            onClick={handleResetData}
            className="rounded-xl border border-slate-800 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            title="Khôi phục dữ liệu mẫu"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {displayMode === 'mobile' ? (
          <div className="py-4">
            <MobileFrame
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setActiveConversationId(null);
              }}
              unreadMessagesCount={unreadCount}
              deviceType={deviceType}
            >
              {activeTab === 'feed' && (
                <FeedTab
                  stories={mockStories}
                  posts={posts}
                  onOpenStory={(story) => setActiveStory(story)}
                  onOpenCreatePost={() => setCreatePostModalOpen(true)}
                  onToggleLike={handleToggleLike}
                  onToggleBookmark={handleToggleBookmark}
                  onNavigateToProfile={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'messages' && (
                <MessagesTab
                  activeUsers={mockActiveUsers}
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelectConversation={(id) => setActiveConversationId(id)}
                  onSendMessage={handleSendMessage}
                  onNavigateToProfile={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'apps' && (
                <AppsTab
                  apps={mockApps}
                  onNavigateToProfile={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'contacts' && (
                <ContactsTab
                  contacts={mockContacts}
                  onOpenChatWithUser={(userName) => {
                    const target = conversations.find((c) =>
                      c.userName.toLowerCase().includes(userName.toLowerCase())
                    );
                    setActiveTab('messages');
                    if (target) {
                      setActiveConversationId(target.id);
                    } else {
                      setActiveConversationId(conversations[0]?.id || null);
                    }
                  }}
                  onNavigateToProfile={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileTab
                  onOpenChat={() => {
                    setActiveTab('messages');
                    setActiveConversationId(conversations[0]?.id || null);
                  }}
                />
              )}
            </MobileFrame>
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto">
            <DesktopView
              currentTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setActiveConversationId(null);
              }}
              stories={mockStories}
              posts={posts}
              activeUsers={mockActiveUsers}
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => setActiveConversationId(id)}
              onSendMessage={handleSendMessage}
              apps={mockApps}
              contacts={mockContacts}
              onOpenStory={(story) => setActiveStory(story)}
              onOpenCreatePost={() => setCreatePostModalOpen(true)}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}
      </main>

      {/* Floating Story Viewer Modal */}
      <StoryViewerModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onNext={() => {
          if (!activeStory) return;
          const currentIndex = mockStories.findIndex((s) => s.id === activeStory.id);
          if (currentIndex < mockStories.length - 1) {
            setActiveStory(mockStories[currentIndex + 1]);
          } else {
            setActiveStory(null);
          }
        }}
        onPrev={() => {
          if (!activeStory) return;
          const currentIndex = mockStories.findIndex((s) => s.id === activeStory.id);
          if (currentIndex > 0) {
            setActiveStory(mockStories[currentIndex - 1]);
          }
        }}
      />

      {/* Floating Create Post Modal */}
      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onAddPost={handleAddPost}
      />

      {/* Flutter Source Code Modal */}
      <FlutterCodeModal
        isOpen={flutterModalOpen}
        onClose={() => setFlutterModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
