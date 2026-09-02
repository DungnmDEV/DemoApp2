import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  PlusCircle, 
  Smile, 
  Send, 
  FileText, 
  CheckCheck,
  Download
} from 'lucide-react';
import { ChatConversation, ChatMessage } from '../types';

interface ChatDetailViewProps {
  conversation: ChatConversation;
  onBack: () => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const ChatDetailView: React.FC<ChatDetailViewProps> = ({
  conversation,
  onBack,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [callingState, setCallingState] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(conversation.id, inputText.trim());
    setInputText('');
  };

  const handleCall = (type: 'audio' | 'video') => {
    setCallingState(type === 'audio' ? `Calling ${conversation.userName}...` : `Starting Video Call with ${conversation.userName}...`);
    setTimeout(() => {
      setCallingState(null);
    }, 2800);
  };

  return (
    <div className="relative flex h-full flex-col bg-[#F0F2F5] z-30">
      {/* Call simulated toast */}
      {callingState && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Phone className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>{callingState}</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#0068FF] px-3 py-2.5 shadow-sm text-white">
        <div className="flex items-center gap-2">
          <button
            id="chat-back-btn"
            onClick={onBack}
            className="p-1.5 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="relative">
            <img
              src={conversation.avatar}
              alt={conversation.userName}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/50"
            />
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            )}
          </div>
          <div className="ml-1">
            <h3 className="text-sm font-bold text-white leading-tight">
              {conversation.userName}
            </h3>
            <span className="text-[10px] text-white/80 font-medium">Đang hoạt động</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleCall('video')}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Video call"
          >
            <Video className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCall('audio')}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Cuộc gọi thoại"
          >
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div className="my-2 flex justify-center">
          <span className="rounded-full bg-gray-200/80 px-3 py-1 text-[10px] font-semibold text-gray-600">
            Hôm nay
          </span>
        </div>

        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`relative max-w-[82%] rounded-2xl p-3 shadow-xs ${
                msg.isMe
                  ? 'bg-[#0068FF] text-white rounded-br-xs'
                  : 'bg-white text-[#1A1A1A] rounded-bl-xs border border-gray-100 shadow-sm'
              }`}
            >
              {/* Image attachment if any */}
              {msg.image && (
                <div className="mb-2 overflow-hidden rounded-xl">
                  <img
                    src={msg.image}
                    alt="Shared visual"
                    className="max-h-56 w-full object-cover rounded-lg"
                  />
                </div>
              )}

              {/* File attachment if any */}
              {msg.file && (
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-100 p-2.5 text-gray-800">
                  <div className="rounded-lg bg-red-100 p-2 text-red-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-bold">{msg.file.name}</p>
                    <p className="text-[10px] text-gray-500">{msg.file.size}</p>
                  </div>
                  <button className="rounded-full p-1.5 hover:bg-gray-200 text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Text content */}
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {/* Timestamp & Status */}
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                  msg.isMe ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.isMe && <CheckCheck className="h-3.5 w-3.5 text-blue-200" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing & Message Input Bar */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-0 border-t border-gray-200 bg-white p-2.5 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => onSendMessage(conversation.id, "Báo cáo tiến độ đã được cập nhật! 📊")}
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
          title="Đính kèm nhanh"
        >
          <PlusCircle className="h-5 w-5 text-[#0068FF]" />
        </button>
        <button
          type="button"
          onClick={() => setInputText(prev => prev + " 👍")}
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
          title="Emoji"
        >
          <Smile className="h-5 w-5" />
        </button>

        <input
          id="chat-message-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 rounded-full bg-[#F0F2F5] px-4 py-2 text-xs text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0068FF] transition border border-gray-200"
        />

        <button
          id="chat-send-btn"
          type="submit"
          disabled={!inputText.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-xs hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
