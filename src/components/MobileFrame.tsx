import React from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Newspaper, 
  MessageSquare, 
  Grid, 
  Users, 
  User 
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: 'feed' | 'messages' | 'apps' | 'contacts' | 'profile';
  onSelectTab: (tab: 'feed' | 'messages' | 'apps' | 'contacts' | 'profile') => void;
  unreadMessagesCount?: number;
  deviceType?: 'iphone' | 'pixel' | 'clean';
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  onSelectTab,
  unreadMessagesCount = 3,
  deviceType = 'iphone',
}) => {
  return (
    <div className="relative mx-auto flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[48px] border-[10px] border-slate-800 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-slate-900/10">
      {/* Phone Hardware Details: Speaker & Dynamic Island */}
      {deviceType === 'iphone' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 flex h-7 w-28 items-center justify-between rounded-full bg-black px-2.5 shadow-xs">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-700/50" />
          <div className="h-2 w-2 rounded-full bg-blue-900/30" />
        </div>
      )}

      {deviceType === 'pixel' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 h-3.5 w-3.5 rounded-full bg-black ring-1 ring-slate-800" />
      )}

      {/* iOS Status Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-[#0068FF] px-6 pt-3 pb-1 text-xs font-semibold text-white backdrop-blur-md">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-white">
          <Signal className="h-3 w-3 fill-white stroke-none" />
          <Wifi className="h-3.5 w-3.5" />
          <div className="flex items-center">
            <Battery className="h-4 w-4 fill-white" />
          </div>
        </div>
      </div>

      {/* Main Screen Content Viewport */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#F0F2F5]">
        {children}
      </div>

      {/* Bottom Navigation Bar (5 Tabs) */}
      <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-gray-200 bg-white px-2 pt-2 pb-5 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        {/* Tab 1: Feed */}
        <button
          id="nav-tab-feed"
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center gap-1 px-3 py-1 transition group ${
            activeTab === 'feed' ? 'text-[#0068FF] font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Newspaper className={`h-5 w-5 ${activeTab === 'feed' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bản tin</span>
        </button>

        {/* Tab 2: Messages */}
        <button
          id="nav-tab-messages"
          onClick={() => onSelectTab('messages')}
          className={`relative flex flex-col items-center gap-1 px-3 py-1 transition group ${
            activeTab === 'messages' ? 'text-[#0068FF] font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <div className="relative">
            <MessageSquare className={`h-5 w-5 ${activeTab === 'messages' ? 'stroke-[2.5]' : ''}`} />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-2xs">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Tin nhắn</span>
        </button>

        {/* Tab 3: Apps */}
        <button
          id="nav-tab-apps"
          onClick={() => onSelectTab('apps')}
          className={`flex flex-col items-center gap-1 px-3 py-1 transition group ${
            activeTab === 'apps' ? 'text-[#0068FF] font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Grid className={`h-5 w-5 ${activeTab === 'apps' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Ứng dụng</span>
        </button>

        {/* Tab 4: Contacts */}
        <button
          id="nav-tab-contacts"
          onClick={() => onSelectTab('contacts')}
          className={`flex flex-col items-center gap-1 px-3 py-1 transition group ${
            activeTab === 'contacts' ? 'text-[#0068FF] font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Users className={`h-5 w-5 ${activeTab === 'contacts' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Danh bạ</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          id="nav-tab-profile"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center gap-1 px-3 py-1 transition group ${
            activeTab === 'profile' ? 'text-[#0068FF] font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <User className={`h-5 w-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Cá nhân</span>
        </button>
      </nav>

      {/* iOS Home Gesture Indicator Pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40 h-1 w-32 rounded-full bg-slate-900" />
    </div>
  );
};
