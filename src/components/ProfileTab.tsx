import React, { useState } from 'react';
import { 
  Settings, 
  Share2, 
  MessageSquare, 
  Download, 
  Heart, 
  ExternalLink, 
  Check, 
  Briefcase, 
  MapPin, 
  Calendar,
  FolderGit2
} from 'lucide-react';
import { currentUser } from '../data/mockData';

interface ProfileTabProps {
  onOpenChat?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onOpenChat }) => {
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'projects' | 'resources'>('timeline');
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareProfile = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative min-h-full pb-20 bg-[#F0F2F5]">
      {/* Top Floating App Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#0068FF] px-4 py-3 shadow-sm text-white">
        <span className="text-xl font-bold tracking-tight text-white">Cá nhân</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShareProfile}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Chia sẻ hồ sơ"
          >
            {copiedLink ? <Check className="h-4 w-4 text-white" /> : <Share2 className="h-4 w-4" />}
          </button>
          <button
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Cài đặt"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Banner & Avatar Stack */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-36 w-full overflow-hidden bg-gray-200">
          <img
            src={currentUser.coverImage}
            alt="Cover background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Avatar */}
        <div className="absolute -bottom-10 left-4">
          <div className="relative h-20 w-20 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-white">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Bio & Controls */}
      <div className="px-4 pt-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#1A1A1A]">{currentUser.name}</h1>
            <p className="text-xs font-semibold text-[#0068FF] mt-0.5">
              {currentUser.title} • {currentUser.department}
            </p>
          </div>
        </div>

        {/* Location & Join date */}
        <div className="mt-2 flex items-center gap-4 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            {currentUser.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            Tham gia 01/2023
          </span>
        </div>

        {/* Bio */}
        <p className="mt-2.5 text-xs leading-relaxed text-gray-600">
          {currentUser.bio}
        </p>

        {/* Action Buttons: Follow & Message */}
        <div className="mt-4 flex items-center gap-3">
          <button
            id="profile-follow-btn"
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition shadow-xs cursor-pointer ${
              isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-[#0068FF] text-white hover:bg-blue-600'
            }`}
          >
            {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
          </button>

          <button
            id="profile-message-btn"
            onClick={onOpenChat}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-2xs transition cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#0068FF]" />
            <span>Nhắn tin</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm text-center">
          <div>
            <div className="text-base font-black text-[#1A1A1A]">{currentUser.followers}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Người theo dõi</div>
          </div>
          <div className="border-x border-gray-100">
            <div className="text-base font-black text-[#1A1A1A]">{currentUser.projectsCount}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dự án</div>
          </div>
          <div>
            <div className="text-base font-black text-[#1A1A1A]">{currentUser.following}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Đang theo dõi</div>
          </div>
        </div>
      </div>

      {/* Tabs: Timeline | Projects | Resources */}
      <div className="mt-4 border-b border-gray-200 bg-white px-4">
        <div className="flex gap-6">
          {(['timeline', 'projects', 'resources'] as const).map((tab) => {
            const isActive = activeSubTab === tab;
            const tabNames: Record<string, string> = {
              timeline: 'Dòng thời gian',
              projects: 'Dự án',
              resources: 'Tài nguyên'
            };
            return (
              <button
                key={tab}
                id={`profile-subtab-${tab}`}
                onClick={() => setActiveSubTab(tab)}
                className={`py-3 text-xs font-bold transition border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#0068FF] text-[#0068FF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tabNames[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4">
        {activeSubTab === 'timeline' && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">{currentUser.name}</h4>
                  <p className="text-[10px] text-gray-400">đã cập nhật dự án • 2 giờ trước</p>
                </div>
              </div>

              <p className="mt-2.5 text-xs text-[#1A1A1A] leading-relaxed">
                Vừa hoàn thành kiểm thử đồng bộ giữa Flutter mobile client và Web dashboard. Hiệu suất mượt mà 60fps và độ trễ dưới 50ms! ⚡
              </p>

              <div className="mt-3 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
                  alt="Telemetry"
                  className="h-40 w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50 pt-2">
                <span className="flex items-center gap-1 text-rose-600 font-semibold">
                  <Heart className="h-3.5 w-3.5 fill-rose-600" /> 148 lượt thích
                </span>
                <span>24 bình luận</span>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'projects' && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-blue-50 p-2 text-[#0068FF]">
                    <FolderGit2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Hệ thống Nebula Dashboard</h4>
                    <span className="text-[10px] text-emerald-600 font-bold">Đã triển khai sản xuất</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Nền tảng phân tích số liệu thời gian thực và quản trị luồng xử lý dữ liệu doanh nghiệp.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">TypeScript</span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">Flutter</span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">gRPC</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Neural Mesh v2</h4>
                    <span className="text-[10px] text-[#0068FF] font-bold">Đang phát triển Sprint</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Hệ thống đồng bộ thiết bị IoT biên và truyền dữ liệu thời gian thực.
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'resources' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-[#0068FF] font-black text-xs">
                  FIG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Synergy Design Tokens & Specs</h4>
                  <p className="text-[10px] text-gray-400">Figma Kit • 42.8 MB</p>
                </div>
              </div>
              <button 
                onClick={() => alert("Đang tải tài liệu Figma Kit...")}
                className="rounded-xl bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                title="Tải xuống"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 font-black text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Kiến trúc Micro-frontend doanh nghiệp</h4>
                  <p className="text-[10px] text-gray-400">Whitepaper • 8.4 MB</p>
                </div>
              </div>
              <button 
                onClick={() => alert("Đang tải Whitepaper...")}
                className="rounded-xl bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                title="Tải xuống"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
