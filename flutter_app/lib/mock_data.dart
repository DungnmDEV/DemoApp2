// mock_data.dart - Dữ liệu giả lập phong phú cho Demo Synergy / ProConnect

class UserProfile {
  final String name;
  final String title;
  final String department;
  final String company;
  final String location;
  final String bio;
  final String avatar;
  final String coverImage;
  final String followers;
  final String following;
  final int projectsCount;
  final List<String> skills;

  const UserProfile({
    required this.name,
    required this.title,
    required this.department,
    required this.company,
    required this.location,
    required this.bio,
    required this.avatar,
    required this.coverImage,
    required this.followers,
    required this.following,
    required this.projectsCount,
    required this.skills,
  });
}

class StoryItem {
  final String id;
  final String name;
  final String avatar;
  final String previewImage;
  final bool hasUnseen;
  final bool isSelf;

  const StoryItem({
    required this.id,
    required this.name,
    required this.avatar,
    required this.previewImage,
    this.hasUnseen = false,
    this.isSelf = false,
  });
}

class PostItem {
  final String id;
  final String authorName;
  final String authorRole;
  final String authorAvatar;
  final String timeAgo;
  final String content;
  final String? image;
  final List<String>? images;
  final int likes;
  final int commentsCount;
  final int sharesCount;
  final bool isQuote;
  final String? quoteText;
  final String? tag;
  bool isLiked;
  bool isBookmarked;

  PostItem({
    required this.id,
    required this.authorName,
    required this.authorRole,
    required this.authorAvatar,
    required this.timeAgo,
    required this.content,
    this.image,
    this.images,
    required this.likes,
    required this.commentsCount,
    required this.sharesCount,
    this.isQuote = false,
    this.quoteText,
    this.tag,
    this.isLiked = false,
    this.isBookmarked = false,
  });
}

class ActiveUser {
  final String id;
  final String name;
  final String avatar;
  final bool isOnline;

  const ActiveUser({
    required this.id,
    required this.name,
    required this.avatar,
    this.isOnline = true,
  });
}

class ChatMessage {
  final String id;
  final String text;
  final String? image;
  final String? fileName;
  final String? fileSize;
  final String timestamp;
  final bool isMe;

  const ChatMessage({
    required this.id,
    required this.text,
    this.image,
    this.fileName,
    this.fileSize,
    required this.timestamp,
    required this.isMe,
  });
}

class Conversation {
  final String id;
  final String userName;
  final String userRole;
  final String avatar;
  final String lastMessage;
  final String time;
  final int unreadCount;
  final bool isOnline;
  final List<ChatMessage> messages;

  const Conversation({
    required this.id,
    required this.userName,
    required this.userRole,
    required this.avatar,
    required this.lastMessage,
    required this.time,
    this.unreadCount = 0,
    this.isOnline = false,
    required this.messages,
  });
}

class ContactItem {
  final String id;
  final String name;
  final String role;
  final String? avatar;
  final String? initials;
  final String department;
  final String category;
  final bool isFrequent;
  final bool isFavorite;
  final String phone;
  final String email;

  const ContactItem({
    required this.id,
    required this.name,
    required this.role,
    this.avatar,
    this.initials,
    required this.department,
    required this.category,
    this.isFrequent = false,
    this.isFavorite = false,
    required this.phone,
    required this.email,
  });
}

class AppItem {
  final String id;
  final String title;
  final String description;
  final String category;
  final String? badge;
  final bool isComingSoon;

  const AppItem({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    this.badge,
    this.isComingSoon = false,
  });
}

// ---------------- DỮ LIỆU MẪU (MOCK DATA) ----------------

final currentUserProfile = UserProfile(
  name: 'Alex Chen',
  title: 'Senior Product Architect',
  department: 'Synergy Labs',
  company: 'Synergy Enterprise Inc.',
  location: 'San Francisco, CA',
  bio: 'Building the future of distributed work systems. Passionate about interconnected UI/UX, scalable architecture, and fostering collaborative ecosystems.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
  followers: '1.2k',
  following: '320',
  projectsCount: 48,
  skills: ['Product Strategy', 'Design Systems', 'Leadership', 'User Research', 'Motion UI'],
);

final mockStories = <StoryItem>[
  StoryItem(
    id: 's0',
    name: 'Post Story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    isSelf: true,
  ),
  StoryItem(
    id: 's1',
    name: 'Elena M.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    hasUnseen: true,
  ),
  StoryItem(
    id: 's2',
    name: 'Tech Labs',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    hasUnseen: true,
  ),
  StoryItem(
    id: 's3',
    name: 'Global HQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    hasUnseen: true,
  ),
  StoryItem(
    id: 's4',
    name: 'Team',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
  ),
];

final mockFeedPosts = <PostItem>[
  PostItem(
    id: 'p1',
    authorName: 'Julian Vance',
    authorRole: 'Lead Architect @ InnovateAI • 2h',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    timeAgo: '2h',
    content: 'Extremely proud to announce that our team has successfully integrated the new neural synchronization protocol. Efficiency gains are already exceeding 35% in our initial benchmarks. The future of synergy is here. 🚀 #AI #Architecture #Innovation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    likes: 1245,
    commentsCount: 84,
    sharesCount: 12,
  ),
  PostItem(
    id: 'p2',
    authorName: 'Sarah Jenkins',
    authorRole: 'Founder & CEO @ GrowthPulse • 5h',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200',
    timeAgo: '5h',
    content: '',
    isQuote: true,
    quoteText: '"Reliability isn\'t just a metric; it\'s the foundation of trust in a high-stakes productivity environment."',
    likes: 450,
    commentsCount: 23,
    sharesCount: 4,
    tag: '#SynergyVibes',
    isLiked: true,
    isBookmarked: true,
  ),
  PostItem(
    id: 'p3',
    authorName: 'Creative Core Agency',
    authorRole: 'Design Collective • 8h',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
    timeAgo: '8h',
    content: 'Snapshot from our latest branding workshop. Visual identity is about more than colors—it\'s about emotional resonance.',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600'
    ],
    likes: 822,
    commentsCount: 41,
    sharesCount: 18,
  ),
];

final mockActiveUsersList = <ActiveUser>[
  ActiveUser(id: 'u1', name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'),
  ActiveUser(id: 'u2', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200'),
  ActiveUser(id: 'u3', name: 'Marcus', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'),
  ActiveUser(id: 'u4', name: 'Elena', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200'),
  ActiveUser(id: 'u5', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200'),
  ActiveUser(id: 'u6', name: 'David', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'),
];

final mockConversationsList = <Conversation>[
  Conversation(
    id: 'c1',
    userName: 'Jessica Chen',
    userRole: 'Director of Strategic Partnerships',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    lastMessage: 'I\'ve attached the final synergy strategy...',
    time: '12:45 PM',
    unreadCount: 2,
    isOnline: true,
    messages: [
      ChatMessage(
        id: 'm1',
        text: 'Hi Alex! Here\'s the growth projection for the next quarter.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
        timestamp: '9:15 AM',
        isMe: false,
      ),
      ChatMessage(
        id: 'm2',
        text: 'Absolutely, Tuesday works for me. I\'ve invited Marcus to the review session as well.',
        timestamp: '10:45 AM',
        isMe: true,
      ),
      ChatMessage(
        id: 'm3',
        text: 'The Q3 strategy looks solid. I especially liked the focus on interconnected professional networks. Should we finalize the budget by Tuesday?',
        timestamp: '10:48 AM',
        isMe: false,
      ),
      ChatMessage(
        id: 'm4',
        text: 'I\'ve attached the final synergy strategy document below.',
        fileName: 'Q3_Synergy_Strategy.pdf',
        fileSize: '12.4 MB',
        timestamp: '12:45 PM',
        isMe: false,
      ),
    ],
  ),
  Conversation(
    id: 'c2',
    userName: 'Robert Sterling',
    userRole: 'VP of Global Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    lastMessage: 'The board approved the new project roa...',
    time: 'Yesterday',
    messages: [
      ChatMessage(
        id: 'm2_1',
        text: 'The board approved the new project roadmap unanimously.',
        timestamp: 'Yesterday',
        isMe: false,
      ),
    ],
  ),
  Conversation(
    id: 'c3',
    userName: 'Product Design Team',
    userRole: 'Group • 8 members',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200',
    lastMessage: 'Leo: Can everyone check the latest Figm...',
    time: 'Oct 24',
    isOnline: true,
    messages: [],
  ),
  Conversation(
    id: 'c4',
    userName: 'Anita Vance',
    userRole: 'Lead Researcher',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    lastMessage: 'Thanks for the update, Anita! I\'ll see y...',
    time: 'Oct 23',
    messages: [],
  ),
  Conversation(
    id: 'c5',
    userName: 'David Miller',
    userRole: 'Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    lastMessage: 'Sent a photo',
    time: 'Oct 22',
    isOnline: true,
    messages: [],
  ),
];

final mockFrequentContacts = <ContactItem>[
  ContactItem(
    id: 'fc1',
    name: 'Marcus Thorne',
    role: 'Senior Design Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    department: 'Design Systems',
    category: 'Design',
    isFrequent: true,
    isFavorite: true,
    phone: '+1 (555) 234-5678',
    email: 'marcus.t@synergy.io',
  ),
  ContactItem(
    id: 'fc2',
    name: 'Amira Al-Farsi',
    role: 'Head of Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    department: 'Global Operations',
    category: 'Corporate',
    isFrequent: true,
    phone: '+1 (555) 345-6789',
    email: 'amira.af@synergy.io',
  ),
  ContactItem(
    id: 'fc3',
    name: 'Leo Chen',
    role: 'Full Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
    department: 'Core Platform',
    category: 'Engineering',
    isFrequent: true,
    isFavorite: true,
    phone: '+1 (555) 456-7890',
    email: 'leo.c@synergy.io',
  ),
];

final mockDirectoryContacts = <ContactItem>[
  ContactItem(
    id: 'd1',
    name: 'Alex Dumont',
    role: 'Marketing Director',
    initials: 'AD',
    department: 'Marketing & Brand',
    category: 'Corporate',
    phone: '+1 (555) 111-2233',
    email: 'alex.d@synergy.io',
  ),
  ContactItem(
    id: 'd2',
    name: 'Alina Sokolov',
    role: 'Backend Systems',
    initials: 'AS',
    department: 'Infrastructure',
    category: 'Engineering',
    phone: '+1 (555) 222-3344',
    email: 'alina.s@synergy.io',
  ),
  ContactItem(
    id: 'd3',
    name: 'Benjamin Hayes',
    role: 'Legal Counsel',
    initials: 'BH',
    department: 'Legal & Compliance',
    category: 'Corporate',
    phone: '+1 (555) 333-4455',
    email: 'ben.h@synergy.io',
  ),
  ContactItem(
    id: 'd4',
    name: 'Chloe Lane',
    role: 'UX Researcher',
    initials: 'CL',
    department: 'Product & Engineering',
    category: 'Design',
    phone: '+1 (555) 444-5566',
    email: 'chloe.l@synergy.io',
  ),
];

final mockAppList = <AppItem>[
  AppItem(
    id: 'app1',
    title: 'Task Manager',
    description: 'Coordinate cross-functional projects and track real-time progress across teams.',
    category: 'Productivity',
    badge: 'Active',
  ),
  AppItem(
    id: 'app2',
    title: 'CRM Pro',
    description: 'Unified customer relationship management with integrated lead scoring and pipeline tracking.',
    category: 'CRM',
  ),
  AppItem(
    id: 'app3',
    title: 'BI Analytics',
    description: 'Deep-dive into organizational data with AI-powered predictive insights and visual dashboards.',
    category: 'Analytics',
  ),
  AppItem(
    id: 'app4',
    title: 'Team Calendar',
    description: 'Sync schedules effortlessly with smart availability detection and meeting room booking.',
    category: 'Productivity',
  ),
  AppItem(
    id: 'app5',
    title: 'Wiki Docs',
    description: 'Centralized documentation, company policies, and collaborative training modules.',
    category: 'Productivity',
  ),
  AppItem(
    id: 'app6',
    title: 'Synergy AI Assistant',
    description: 'Automate workflows and generate reports using natural language.',
    category: 'Productivity',
    badge: 'COMING SOON',
    isComingSoon: true,
  ),
];
