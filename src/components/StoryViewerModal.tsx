import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { StoryItem } from '../types';

interface StoryViewerModalProps {
  story: StoryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNext) onNext();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onNext]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
      <div 
        id="story-modal-container"
        className="relative h-[650px] w-full max-w-sm overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-slate-800 flex flex-col justify-between"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${story.previewImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        </div>

        {/* Top Progress bar & User info */}
        <div className="relative z-10 p-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/30 mb-3">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={story.avatar} 
                alt={story.name} 
                className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">{story.name}</h4>
                <span className="text-[11px] text-slate-300">2h ago • Synergy Story</span>
              </div>
            </div>
            <button 
              id="close-story-btn"
              onClick={onClose}
              className="rounded-full bg-black/40 p-1.5 text-white/80 hover:bg-black/70 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="relative z-10 flex justify-between px-3">
          {onPrev && (
            <button 
              onClick={onPrev}
              className="rounded-full bg-black/30 p-2 text-white/70 hover:bg-black/60 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <div className="flex-1" />
          {onNext && (
            <button 
              onClick={onNext}
              className="rounded-full bg-black/30 p-2 text-white/70 hover:bg-black/60 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Bottom Reaction bar */}
        <div className="relative z-10 p-4">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder={`Trả lời tin của ${story.name}...`}
              className="flex-1 rounded-full bg-white/20 px-4 py-2 text-xs text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button className="rounded-full bg-[#0068FF] p-2.5 text-white hover:bg-blue-600 transition cursor-pointer">
              <Heart className="h-4 w-4 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
