import React, { useState } from 'react';
import { X, Image as ImageIcon, Calendar, Sparkles, Send } from 'lucide-react';
import { PostItem } from '../types';
import { currentUser } from '../data/mockData';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: PostItem) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onAddPost }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;

    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: `${currentUser.title} • ${currentUser.department}`,
      authorAvatar: currentUser.avatar,
      timeAgo: 'Just now',
      content: content.trim(),
      image: selectedImage || undefined,
      likes: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isBookmarked: false,
    };

    onAddPost(newPost);
    setContent('');
    setSelectedImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div 
        id="create-post-dialog"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#0068FF]/20"
            />
            <div>
              <h3 className="text-base font-bold text-[#1A1A1A]">{currentUser.name}</h3>
              <span className="text-xs text-gray-500">Đăng lên mạng lưới Synergy</span>
            </div>
          </div>
          <button 
            id="close-create-post-btn"
            onClick={onClose} 
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <textarea
            id="post-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì? Chia sẻ cập nhật, thông báo hoặc giải pháp mới..."
            rows={4}
            className="w-full resize-none border-0 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-0 text-sm leading-relaxed"
            autoFocus
          />

          {selectedImage && (
            <div className="relative mb-4 overflow-hidden rounded-xl border border-gray-200">
              <img src={selectedImage} alt="Post attachment" className="h-44 w-full object-cover" />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Sample photos selector */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
              <span>Đính kèm ảnh mẫu nhanh:</span>
              {selectedImage && <span className="text-[#0068FF]">Đã chọn</span>}
            </div>
            <div className="flex gap-2">
              {sampleImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`h-14 w-20 overflow-hidden rounded-lg border-2 transition cursor-pointer ${
                    selectedImage === img ? 'border-[#0068FF] ring-2 ring-[#0068FF]/30' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="Sample" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedImage(sampleImages[0])}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0068FF] hover:bg-blue-100 transition cursor-pointer"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Ảnh</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Sự kiện</span>
              </button>
              <button
                type="button"
                onClick={() => setContent(prev => prev + " #Innovation #AI")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Thẻ</span>
              </button>
            </div>

            <button
              id="submit-post-btn"
              type="submit"
              disabled={!content.trim() && !selectedImage}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0068FF] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Đăng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
