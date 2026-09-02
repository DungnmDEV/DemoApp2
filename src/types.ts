export interface StoryItem {
  id: string;
  name: string;
  avatar: string;
  previewImage: string;
  hasUnseen: boolean;
  isSelf?: boolean;
}

export interface PostItem {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  images?: string[];
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tag?: string;
  isQuote?: boolean;
  quoteText?: string;
}

export interface ActiveUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  image?: string;
  file?: {
    name: string;
    size: string;
    type: 'pdf' | 'figma' | 'doc';
  };
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatConversation {
  id: string;
  userId: string;
  userName: string;
  userRole?: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface ContactItem {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials?: string;
  department: string;
  category: 'Corporate' | 'Engineering' | 'Design' | 'Marketing' | 'Operations';
  isFrequent?: boolean;
  isFavorite?: boolean;
  phone?: string;
  email?: string;
  status?: string;
}

export interface AppToolItem {
  id: string;
  title: string;
  description: string;
  category: 'Productivity' | 'Analytics' | 'CRM' | 'Management' | 'Security';
  iconName: string;
  badge?: string;
  badgeType?: 'active' | 'featured' | 'soon';
  actionType: 'open' | 'arrow' | 'toggle';
  usageCount?: string;
  version?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  department: string;
  company: string;
  location: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followers: string;
  following: string;
  projectsCount: number;
  awards: string[];
  skills: string[];
}
