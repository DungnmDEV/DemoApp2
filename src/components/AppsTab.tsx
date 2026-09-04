import React, { useState } from 'react';
import { 
  Search, 
  CheckSquare, 
  Share2, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  X,
  Plus,
  CheckCircle2,
  Clock,
  BarChart3,
  Package,
  ExternalLink
} from 'lucide-react';
import { AppToolItem } from '../types';
import { currentUser } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface AppsTabProps {
  apps: AppToolItem[];
  onNavigateToProfile?: () => void;
}

export const AppsTab: React.FC<AppsTabProps> = ({ apps, onNavigateToProfile }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Apps');
  const [activeModalApp, setActiveModalApp] = useState<AppToolItem | null>(null);

  const categories = ['All Apps', 'Productivity', 'Analytics', 'CRM', 'Management', 'Security'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckSquare':
        return <CheckSquare className="h-5 w-5 text-[#0068FF]" />;
      case 'Share2':
        return <Share2 className="h-5 w-5 text-orange-600" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'Calendar':
        return <Calendar className="h-5 w-5 text-indigo-600" />;
      case 'BookOpen':
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-blue-300" />;
      case 'Package':
        return <Package className="h-5 w-5 text-amber-600" />;
      default:
        return <CheckSquare className="h-5 w-5 text-[#0068FF]" />;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case 'CheckSquare':
        return 'bg-blue-100';
      case 'Share2':
        return 'bg-orange-100';
      case 'TrendingUp':
        return 'bg-green-100';
      case 'Calendar':
        return 'bg-indigo-100';
      case 'BookOpen':
        return 'bg-purple-100';
      case 'Package':
        return 'bg-amber-100';
      default:
        return 'bg-blue-100';
    }
  };

  const filteredApps = apps.filter((app) => {
    if (selectedCategory === 'All Apps') return true;
    return app.category === selectedCategory;
  });

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
          <span className="text-xl font-bold tracking-tight text-white">Ứng dụng</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Tìm ứng dụng"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Directory Title & Subtitle */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Danh mục ứng dụng</h2>
        <p className="mt-0.5 text-xs text-gray-500 leading-relaxed max-w-sm">
          Hệ sinh thái công cụ hỗ trợ công việc và quản trị doanh nghiệp.
        </p>
      </div>

      {/* Categories Filter Carousel */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                isSelected
                  ? 'bg-[#0068FF] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* App Cards List */}
      <div className="px-4 py-2 space-y-3">
        {filteredApps.filter(app => app.id !== 'app-ai-assistant').map((app) => (
          <div
            key={app.id}
            id={`app-card-${app.id}`}
            onClick={() => setActiveModalApp(app)}
            className="group relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 cursor-pointer transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${getIconBg(app.iconName)}`}>
                  {getIcon(app.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#0068FF] transition">
                    {app.title}
                  </h3>
                  {app.badge && (
                    <span className="mt-0.5 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0068FF] border border-blue-200">
                      {app.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-gray-400 group-hover:text-[#0068FF] transition">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              {app.description}
            </p>
          </div>
        ))}

        {/* Coming Soon Synergy AI Assistant Card */}
        <div 
          onClick={() => setActiveModalApp({
            id: 'app-ai-assistant',
            title: 'Synergy AI Assistant',
            description: 'Trợ lý AI tích hợp tự động hóa quy trình, tóm tắt cuộc họp và phân tích số liệu thời gian thực.',
            category: 'Productivity',
            iconName: 'Sparkles',
            actionType: 'open',
            badge: 'SẮP RA MẮT',
            badgeType: 'soon'
          })}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-[#0068FF] to-indigo-900 p-5 text-white shadow-md cursor-pointer hover:ring-2 hover:ring-blue-300 transition"
        >
          {/* Subtle wave / network overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block rounded-md bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Sắp ra mắt
            </span>

            <h3 className="mt-3 text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Synergy AI Assistant</span>
              <Sparkles className="h-4 w-4 text-amber-300" />
            </h3>

            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Automate workflows and generate reports using natural language.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive App Detail / Tool Launcher Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getIconBg(activeModalApp.iconName)}`}>
                  {getIcon(activeModalApp.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{activeModalApp.title}</h3>
                  <span className="text-xs text-slate-500">{activeModalApp.category} • Enterprise Suite</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeModalApp.description}
              </p>

              {/* Task Manager Kanban Preview */}
              {activeModalApp.id === 'app-task-manager' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                    <span>Active Sprint: Q3 Distributed Synchronization</span>
                    <span className="text-blue-600 font-semibold">82% completed</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 text-xs shadow-2xs border border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="font-medium text-slate-800">Finalize Flutter Canvas Layout</span>
                      </div>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700 font-bold">Done</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 text-xs shadow-2xs border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-slate-800">Cross-Platform Sync Optimization</span>
                      </div>
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700 font-bold">In Progress</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BI Analytics Metrics Preview */}
              {activeModalApp.id === 'app-bi-analytics' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <BarChart3 className="h-4 w-4 text-teal-600" />
                    <span>Real-time Velocity Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white p-2.5 border border-slate-100 text-center">
                      <div className="text-xl font-extrabold text-teal-600">+35%</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Synchronization Gain</div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 border border-slate-100 text-center">
                      <div className="text-xl font-extrabold text-blue-600">99.98%</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Service Uptime</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    if (activeModalApp.id === 'app-demo-1') {
                      alert(`Redirecting to QL Kho (DemoApp1)...\nUser: ${user?.username}\nToken: MOCK_TOKEN_PASSING`);
                    }
                    setActiveModalApp(null);
                  }}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                >
                  Launch {activeModalApp.title}
                </button>
                <button
                  onClick={() => setActiveModalApp(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
