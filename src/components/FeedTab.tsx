import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Edit3, 
  X,
  Send
} from 'lucide-react';
import { StoryItem, PostItem } from '../types';
import { currentUser } from '../data/mockData';

interface FeedTabProps {
  stories: StoryItem[];
  posts: PostItem[];
  onOpenStory: (story: StoryItem) => void;
  onOpenCreatePost: () => void;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onNavigateToProfile?: () => void;
}

export const FeedTab: React.FC<FeedTabProps> = ({
  stories,
  posts,
  onOpenStory,
  onOpenCreatePost,
  onToggleLike,
  onToggleBookmark,
  onNavigateToProfile,
}) => {
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentsList, setCommentsList] = useState<{ [postId: string]: { user: string; avatar: string; text: string; time: string }[] }>({
    'post-1': [
      { user: 'Maya Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', text: 'Huge congratulations to the entire architecture team! This is a milestone for enterprise synergy.', time: '1h ago' },
      { user: 'Robert King', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', text: 'Are the benchmarks tested on cross-region latency?', time: '45m ago' },
    ],
    'post-2': [
      { user: 'Leo Sterling', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', text: 'Totally agree with Sarah! Trust drives true velocity.', time: '3h ago' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    setCommentsList(prev => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        {
          user: currentUser.name,
          avatar: currentUser.avatar,
          text: newCommentText.trim(),
          time: 'Just now'
        }
      ]
    }));
    setNewCommentText('');
  };

  const handleShare = (author: string) => {
    setShareToast(`Link to ${author}'s post copied to clipboard!`);
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="relative min-h-full pb-20 bg-[#F0F2F5]">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {shareToast}
        </div>
      )}

      {/* Top Header - Clean Minimalism signature #0068FF */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#0068FF] px-4 py-3 shadow-sm text-white">
        <div className="flex items-center gap-3">
          <button 
            id="header-user-avatar-btn"
            onClick={onNavigateToProfile}
            className="group relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/50 transition hover:ring-white"
          >
            <img src={currentUser.avatar} alt="Alex" className="h-full w-full object-cover" />
          </button>
          <span className="text-xl font-bold tracking-tight text-white">Synergy</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            id="feed-search-btn"
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button 
            id="feed-create-post-top-btn"
            onClick={onOpenCreatePost}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Tạo bài viết mới"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Stories Horizontal Row */}
      <section className="bg-white py-3 shadow-xs border-b border-gray-200">
        <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar">
          {stories.map((story) => (
            <button
              key={story.id}
              id={`story-item-${story.id}`}
              onClick={() => onOpenStory(story)}
              className="flex shrink-0 flex-col items-center gap-1 cursor-pointer min-w-[65px] focus:outline-none group"
            >
              <div 
                className={`relative h-14 w-14 rounded-full p-0.5 transition-transform group-hover:scale-105 flex items-center justify-center ${
                  story.isSelf 
                    ? 'border-2 border-dashed border-[#0068FF] bg-gray-100' 
                    : story.hasUnseen 
                      ? 'border-2 border-[#0068FF]' 
                      : 'border-2 border-gray-300 opacity-70'
                }`}
              >
                <div className="h-full w-full overflow-hidden rounded-full bg-white">
                  <img
                    src={story.previewImage}
                    alt={story.name}
                    className="h-full w-full object-cover"
                  />
                  {story.isSelf && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0068FF]/30 backdrop-blur-2xs rounded-full">
                      <div className="rounded-full bg-[#0068FF] p-1 text-white shadow-xs">
                        <Plus className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <span className="max-w-[70px] truncate text-[10px] font-medium text-[#1A1A1A]">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Composer Card */}
      <section className="p-4">
        <div 
          id="feed-composer-box"
          className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm"
        >
          <div 
            onClick={onOpenCreatePost}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt="Alex"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex-1 rounded-full bg-[#F0F2F5] px-4 py-2 text-xs font-normal text-gray-500 hover:bg-gray-200/60 transition">
              Bạn đang nghĩ gì, chia sẻ cùng đồng nghiệp...
            </div>
          </div>

          <div className="mt-3 flex items-center justify-around border-t border-gray-100 pt-2.5">
            <button 
              id="composer-action-media"
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              <ImageIcon className="h-4 w-4 text-[#0068FF]" />
              <span>Hình ảnh</span>
            </button>
            <div className="h-3.5 w-px bg-gray-200" />
            <button 
              id="composer-action-event"
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>Sự kiện</span>
            </button>
            <div className="h-3.5 w-px bg-gray-200" />
            <button 
              id="composer-action-write"
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              <FileText className="h-4 w-4 text-emerald-600" />
              <span>Bài viết</span>
            </button>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="px-4 space-y-3.5">
        {posts.map((post) => (
          <article 
            key={post.id}
            id={`post-card-${post.id}`}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            {/* Post Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] leading-tight">
                    {post.authorName}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {post.authorRole} • {post.timeAgo}
                  </p>
                </div>
              </div>
              <button 
                className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                title="Tùy chọn"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Post Content */}
            {post.isQuote ? (
              <div className="my-3 rounded-xl border border-gray-100 bg-blue-50/40 p-4">
                <blockquote className="text-base font-semibold italic text-[#1A1A1A] leading-snug">
                  {post.quoteText}
                </blockquote>
                {post.tag && (
                  <span className="mt-2.5 inline-block text-xs font-bold text-[#0068FF]">
                    {post.tag}
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-[13.5px] leading-relaxed text-[#1A1A1A] whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            )}

            {/* Post Image Attachment */}
            {post.image && (
              <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
                <img
                  src={post.image}
                  alt="Post visual"
                  className="w-full max-h-80 object-cover hover:scale-[1.01] transition duration-300"
                />
              </div>
            )}

            {/* Post Dual Images */}
            {post.images && post.images.length > 1 && (
              <div className="mt-3 grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
                {post.images.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Post attachment ${i + 1}`}
                    className="h-44 w-full object-cover rounded-lg border border-gray-100"
                  />
                ))}
              </div>
            )}

            {/* Post Actions & Counts */}
            <div className="mt-3.5 flex items-center justify-between border-t border-gray-100 pt-3 text-gray-500">
              <div className="flex items-center gap-5">
                {/* Like Button */}
                <button
                  id={`like-btn-${post.id}`}
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition ${
                    post.isLiked ? 'text-rose-600' : 'hover:text-[#1A1A1A]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${post.isLiked ? 'fill-rose-600 stroke-rose-600 scale-110' : ''} transition-transform`}
                  />
                  <span>{post.likes}</span>
                </button>

                {/* Comment Button */}
                <button
                  id={`comment-btn-${post.id}`}
                  onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#1A1A1A] transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.commentsCount + (commentsList[post.id]?.length || 0)}</span>
                </button>

                {/* Share Button */}
                <button
                  id={`share-btn-${post.id}`}
                  onClick={() => handleShare(post.authorName)}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#1A1A1A] transition"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{post.sharesCount}</span>
                </button>
              </div>

              {/* Bookmark Button */}
              <button
                id={`bookmark-btn-${post.id}`}
                onClick={() => onToggleBookmark(post.id)}
                className={`text-gray-400 transition ${
                  post.isBookmarked ? 'text-[#0068FF]' : 'hover:text-gray-700'
                }`}
                title="Lưu bài viết"
              >
                <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-[#0068FF]' : ''}`} />
              </button>
            </div>

            {/* Expanded Comments Section */}
            {activeCommentsPostId === post.id && (
              <div className="mt-3 border-t border-gray-100 pt-3 bg-gray-50/60 -mx-4 -mb-4 p-4 rounded-b-2xl">
                <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar mb-3">
                  {(commentsList[post.id] || []).length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Chưa có bình luận nào. Hãy bắt đầu cuộc trò chuyện!</p>
                  ) : (
                    commentsList[post.id].map((comment, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <img src={comment.avatar} alt={comment.user} className="h-7 w-7 rounded-full object-cover mt-0.5" />
                        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-2xs border border-gray-100 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[#1A1A1A]">{comment.user}</span>
                            <span className="text-[10px] text-gray-400">{comment.time}</span>
                          </div>
                          <p className="text-gray-700 leading-snug">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    placeholder="Viết bình luận..."
                    className="flex-1 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-[#1A1A1A] placeholder-gray-400 focus:border-[#0068FF] focus:outline-none shadow-2xs"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="rounded-full bg-[#0068FF] p-1.5 text-white hover:bg-blue-600 transition shadow-2xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Floating Action Button */}
      <button
        id="fab-create-post-btn"
        onClick={onOpenCreatePost}
        className="fixed bottom-20 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:scale-105 active:scale-95 transition"
        title="Tạo bài viết mới"
      >
        <Edit3 className="h-5 w-5" />
      </button>
    </div>
  );
};
