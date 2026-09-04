import { StoryItem, PostItem, ActiveUser, ChatConversation, ContactItem, AppToolItem, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'Alex Chen',
  title: 'Senior Product Architect',
  department: 'Synergy Labs',
  company: 'Synergy Enterprise Inc.',
  location: 'San Francisco, CA',
  bio: 'Building the future of distributed work systems. Passionate about interconnected UI/UX, scalable architecture, and fostering collaborative ecosystems.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  followers: '1.2k',
  following: '320',
  projectsCount: 48,
  awards: ['UX Innovator of the Year 2023', 'Top 10 Enterprise Architects APAC'],
  skills: ['Product Strategy', 'Design Systems', 'Leadership', 'User Research', 'Motion UI', 'Flutter & React']
};

export const mockStories: StoryItem[] = [
  {
    id: 'story-self',
    name: 'Post Story',
    avatar: currentUser.avatar,
    previewImage: currentUser.avatar,
    hasUnseen: false,
    isSelf: true,
  },
  {
    id: 'story-1',
    name: 'Elena M.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    hasUnseen: true,
  },
  {
    id: 'story-2',
    name: 'Tech Labs',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    hasUnseen: true,
  },
  {
    id: 'story-3',
    name: 'Global HQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80',
    hasUnseen: true,
  },
  {
    id: 'story-4',
    name: 'Design Team',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    hasUnseen: false,
  },
];

export const mockPosts: PostItem[] = [
  {
    id: 'post-1',
    authorName: 'Julian Vance',
    authorRole: 'Lead Architect @ InnovateAI',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    timeAgo: '2h',
    content: 'Extremely proud to announce that our team has successfully integrated the new neural synchronization protocol. Efficiency gains are already exceeding 35% in our initial benchmarks. The future of synergy is here. 🚀 #AI #Architecture #Innovation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    likes: 1245,
    commentsCount: 84,
    sharesCount: 12,
    isLiked: false,
    isBookmarked: false,
    tag: '#Innovation'
  },
  {
    id: 'post-2',
    authorName: 'Sarah Jenkins',
    authorRole: 'Founder & CEO @ GrowthPulse',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    timeAgo: '5h',
    content: '',
    isQuote: true,
    quoteText: '"Reliability isn\'t just a metric; it\'s the foundation of trust in a high-stakes productivity environment."',
    likes: 450,
    commentsCount: 23,
    sharesCount: 5,
    isLiked: true,
    isBookmarked: true,
    tag: '#SynergyVibes'
  },
  {
    id: 'post-3',
    authorName: 'Creative Core Agency',
    authorRole: 'Design Collective',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    timeAgo: '8h',
    content: 'Snapshot from our latest branding workshop. Visual identity is about more than colors—it\'s about emotional resonance and clear system hierarchies.',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80'
    ],
    likes: 822,
    commentsCount: 41,
    sharesCount: 18,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post-4',
    authorName: 'Marcus Thorne',
    authorRole: 'Senior Cloud Architect at NexusSystems',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    timeAgo: '1d',
    content: 'Just finished the final migration phase for our new distributed database architecture. The scalability improvements are exceeding all expectations! Looking forward to sharing the technical case study soon. #CloudComputing #SystemsArchitecture',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=80',
    likes: 910,
    commentsCount: 56,
    sharesCount: 29,
    isLiked: true,
    isBookmarked: false
  }
];

export const mockActiveUsers: ActiveUser[] = [
  {
    id: 'user-jordan',
    name: 'Jordan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  },
  {
    id: 'user-sarah',
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  },
  {
    id: 'user-marcus',
    name: 'Marcus',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  },
  {
    id: 'user-elena',
    name: 'Elena',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  },
  {
    id: 'user-alex',
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  },
  {
    id: 'user-david',
    name: 'David',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
  }
];

export const mockConversations: ChatConversation[] = [
  {
    id: 'chat-1',
    userId: 'jessica-chen',
    userName: 'Jessica Chen',
    userRole: 'Director of Strategic Partnerships',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'I\'ve attached the final synergy strategy report for Q3...',
    time: '12:45 PM',
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 'm1',
        senderId: 'jessica-chen',
        senderName: 'Jessica Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        text: 'Hi Alex! Here\'s the growth projection for the next quarter.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        timestamp: '9:15 AM',
        isMe: false,
      },
      {
        id: 'm2',
        senderId: 'me',
        senderName: 'Alex Chen',
        senderAvatar: currentUser.avatar,
        text: 'Absolutely, Tuesday works for me. I\'ve invited Marcus to the review session as well.',
        timestamp: '10:45 AM',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'jessica-chen',
        senderName: 'Jessica Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        text: 'The Q3 strategy looks solid. I especially liked the focus on interconnected professional networks. Should we finalize the budget by Tuesday?',
        timestamp: '10:48 AM',
        isMe: false,
      },
      {
        id: 'm4',
        senderId: 'jessica-chen',
        senderName: 'Jessica Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        text: 'I\'ve attached the final synergy strategy document below.',
        file: {
          name: 'Q3_Synergy_Strategy.pdf',
          size: '12.4 MB',
          type: 'pdf'
        },
        timestamp: '12:45 PM',
        isMe: false,
      }
    ]
  },
  {
    id: 'chat-2',
    userId: 'robert-sterling',
    userName: 'Robert Sterling',
    userRole: 'VP of Global Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'The board approved the new project roadmap unanimously.',
    time: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 'm2-1',
        senderId: 'robert-sterling',
        senderName: 'Robert Sterling',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        text: 'Alex, great news! The board approved the new project roadmap unanimously.',
        timestamp: 'Yesterday 4:20 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'chat-3',
    userId: 'product-team',
    userName: 'Product Design Team',
    userRole: '8 members',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Leo: Can everyone check the latest Figma components library?',
    time: 'Oct 24',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'm3-1',
        senderId: 'leo',
        senderName: 'Leo Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        text: 'Can everyone check the latest Figma components library before our 3pm sync?',
        timestamp: 'Oct 24, 2:15 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'chat-4',
    userId: 'anita-vance',
    userName: 'Anita Vance',
    userRole: 'UX Research Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    lastMessage: '✓✓ Thanks for the update, Anita! I\'ll see you tomorrow.',
    time: 'Oct 23',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 'm4-1',
        senderId: 'me',
        senderName: 'Alex Chen',
        senderAvatar: currentUser.avatar,
        text: 'Thanks for the update, Anita! I\'ll see you tomorrow at the briefing.',
        timestamp: 'Oct 23, 5:10 PM',
        isMe: true,
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-5',
    userId: 'david-miller',
    userName: 'David Miller',
    userRole: 'Cloud Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Sent a photo of the new cluster setup.',
    time: 'Oct 22',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'm5-1',
        senderId: 'david-miller',
        senderName: 'David Miller',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        text: 'Sent a photo of the new cluster setup. Latency dropped by 40%!',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
        timestamp: 'Oct 22, 11:30 AM',
        isMe: false
      }
    ]
  }
];

export const mockContacts: ContactItem[] = [
  // Frequent contacts
  {
    id: 'c-marcus',
    name: 'Marcus Thorne',
    role: 'Senior Design Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    department: 'Design Systems',
    category: 'Design',
    isFrequent: true,
    isFavorite: true,
    phone: '+1 (555) 234-5678',
    email: 'marcus.t@synergy.io',
    status: 'online'
  },
  {
    id: 'c-amira',
    name: 'Amira Al-Farsi',
    role: 'Head of Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    department: 'Global Operations',
    category: 'Operations',
    isFrequent: true,
    phone: '+1 (555) 345-6789',
    email: 'amira.af@synergy.io',
    status: 'busy'
  },
  {
    id: 'c-leo',
    name: 'Leo Chen',
    role: 'Full Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    department: 'Core Platform',
    category: 'Engineering',
    isFrequent: true,
    isFavorite: true,
    phone: '+1 (555) 456-7890',
    email: 'leo.c@synergy.io',
    status: 'online'
  },

  // Directory A-Z
  {
    id: 'c-alex-d',
    name: 'Alex Dumont',
    role: 'Marketing Director',
    initials: 'AD',
    department: 'Marketing & Brand',
    category: 'Marketing',
    phone: '+1 (555) 111-2233',
    email: 'alex.d@synergy.io'
  },
  {
    id: 'c-alina',
    name: 'Alina Sokolov',
    role: 'Backend Systems Engineer',
    initials: 'AS',
    department: 'Infrastructure',
    category: 'Engineering',
    phone: '+1 (555) 222-3344',
    email: 'alina.s@synergy.io'
  },
  {
    id: 'c-benjamin',
    name: 'Benjamin Hayes',
    role: 'Legal Counsel',
    initials: 'BH',
    department: 'Legal & Governance',
    category: 'Corporate',
    phone: '+1 (555) 333-4455',
    email: 'ben.h@synergy.io'
  },
  {
    id: 'c-chloe',
    name: 'Chloe Lane',
    role: 'UX Researcher',
    initials: 'CL',
    department: 'Product Discovery',
    category: 'Design',
    phone: '+1 (555) 444-5566',
    email: 'chloe.l@synergy.io'
  },
  {
    id: 'c-david-k',
    name: 'David Kim',
    role: 'DevOps Specialist',
    initials: 'DK',
    department: 'Cloud Ops',
    category: 'Engineering',
    phone: '+1 (555) 555-6677',
    email: 'david.k@synergy.io'
  },
  {
    id: 'c-elena-v',
    name: 'Elena Vance',
    role: 'Chief People Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    department: 'People & Culture',
    category: 'Corporate',
    phone: '+1 (555) 666-7788',
    email: 'elena.v@synergy.io'
  }
];

export const mockApps: AppToolItem[] = [
  {
    id: 'app-task-manager',
    title: 'Task Manager',
    description: 'Coordinate cross-functional projects and track real-time progress across teams.',
    category: 'Productivity',
    iconName: 'CheckSquare',
    badge: 'Active',
    badgeType: 'active',
    actionType: 'open',
    version: 'v2.4.0',
    usageCount: '1.4k active users'
  },
  {
    id: 'app-crm-pro',
    title: 'CRM Pro',
    description: 'Unified customer relationship management with integrated lead scoring and pipeline tracking.',
    category: 'CRM',
    iconName: 'Share2',
    actionType: 'arrow',
    usageCount: '890 teams'
  },
  {
    id: 'app-bi-analytics',
    title: 'BI Analytics',
    description: 'Deep-dive into organizational data with AI-powered predictive insights and visual dashboards.',
    category: 'Analytics',
    iconName: 'TrendingUp',
    actionType: 'arrow',
    badge: 'High Usage',
    badgeType: 'featured',
    usageCount: 'Enterprise'
  },
  {
    id: 'app-team-calendar',
    title: 'Team Calendar',
    description: 'Sync schedules effortlessly with smart availability detection and meeting room booking.',
    category: 'Productivity',
    iconName: 'Calendar',
    actionType: 'arrow',
    badge: 'Next event in 2h',
    badgeType: 'featured'
  },
  {
    id: 'app-wiki-docs',
    title: 'Wiki Docs',
    description: 'Centralized documentation, company policies, and collaborative training modules.',
    category: 'Productivity',
    iconName: 'BookOpen',
    actionType: 'arrow'
  },
  {
    id: 'app-ai-assistant',
    title: 'Synergy AI Assistant',
    description: 'Automate workflows and generate reports using natural language.',
    category: 'Productivity',
    iconName: 'Sparkles',
    badge: 'COMING SOON',
    badgeType: 'soon',
    actionType: 'arrow'
  },
  {
    id: 'app-demo-1',
    title: 'QL Kho (DemoApp1)',
    description: 'Hệ thống quản lý kho thông minh, tích hợp đồng bộ dữ liệu thời gian thực.',
    category: 'Management',
    iconName: 'Package',
    badge: 'LINKED',
    badgeType: 'active',
    actionType: 'open',
    usageCount: 'Enterprise'
  }
];

export const profileProjects = [
  {
    id: 'proj-1',
    title: 'Nebula Dashboard System',
    description: 'Enterprise scalability for data-rich environments with low latency streaming.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    tags: ['Design System', 'React', 'Flutter']
  },
  {
    id: 'proj-2',
    title: 'Vanderlust Mobile Experience',
    description: 'Award-winning travel and collaboration interface for global modern explorers.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
    tags: ['iOS', 'Android', 'Figma']
  }
];

export const profileResources = [
  {
    id: 'res-1',
    title: 'Synergy Design Tokens & Component Specs',
    type: 'Figma Library',
    size: '42.8 MB',
    downloads: '1.8k'
  },
  {
    id: 'res-2',
    title: 'Distributed Enterprise Microfrontends Whitepaper',
    type: 'PDF Document',
    size: '8.4 MB',
    downloads: '950'
  },
  {
    id: 'res-3',
    title: 'Cross-Platform Mobile Architecture (Flutter Guide)',
    type: 'Code Guide',
    size: '2.1 MB',
    downloads: '3.4k'
  }
];
