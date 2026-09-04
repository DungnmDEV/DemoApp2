import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'mock_data.dart';
import 'api_service.dart';
import 'login_screen.dart';
import 'package:android_intent_plus/android_intent.dart';
import 'dart:io' show Platform;

void main() {
  runApp(const SynergyApp());
}

class SynergyApp extends StatefulWidget {
  const SynergyApp({super.key});

  @override
  State<SynergyApp> createState() => _SynergyAppState();
}

class _SynergyAppState extends State<SynergyApp> {
  bool _isAuthenticated = false;
  bool _isChecking = true;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final token = await ApiService().getToken();
    setState(() {
      _isAuthenticated = token != null;
      _isChecking = false;
    });
  }

  void _onLoginSuccess() {
    setState(() => _isAuthenticated = true);
  }

  void _onLogout() async {
    await ApiService().logout();
    setState(() => _isAuthenticated = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_isChecking) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: Center(
            child: CircularProgressIndicator(color: const Color(0xFF1D4ED8)),
          ),
        ),
      );
    }

    return MaterialApp(
      title: 'Synergy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        primaryColor: const Color(0xFF1D4ED8), // Deep Blue
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1D4ED8),
          primary: const Color(0xFF1D4ED8),
          surface: Colors.white,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 0.5,
          iconTheme: IconThemeData(color: Color(0xFF1E293B)),
        ),
      ),
      home: _isAuthenticated
          ? MainNavigationScreen(onLogout: _onLogout)
          : LoginScreen(onLoginSuccess: _onLoginSuccess),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  final VoidCallback onLogout;
  const MainNavigationScreen({super.key, required this.onLogout});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  late final List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _screens = [
      const FeedTabScreen(),
      const MessagesTabScreen(),
      const AppsTabScreen(),
      const ContactsTabScreen(),
      ProfileTabScreen(onLogout: widget.onLogout),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border(
            top: BorderSide(color: Colors.grey.shade200, width: 1),
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, CupertinoIcons.news, CupertinoIcons.news_solid, 'Feed'),
                _buildNavItem(1, CupertinoIcons.chat_bubble_2, CupertinoIcons.chat_bubble_2_fill, 'Messages'),
                _buildNavItem(2, CupertinoIcons.grid_circle, CupertinoIcons.grid_circle_fill, 'Apps'),
                _buildNavItem(3, CupertinoIcons.person_crop_square, CupertinoIcons.person_crop_square_fill, 'Contacts'),
                _buildNavItem(4, CupertinoIcons.person, CupertinoIcons.person_fill, 'Profile'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData outlineIcon, IconData filledIcon, String label) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? const Color(0xFF1D4ED8) : const Color(0xFF64748B);
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(isSelected ? filledIcon : outlineIcon, color: color, size: 24),
            const SizedBox(height: 3),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- 1. FEED TAB SCREEN ----------------
class FeedTabScreen extends StatefulWidget {
  const FeedTabScreen({super.key});

  @override
  State<FeedTabScreen> createState() => _FeedTabScreenState();
}

class _FeedTabScreenState extends State<FeedTabScreen> {
  final posts = List<PostItem>.from(mockFeedPosts);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        leadingWidth: 54,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CircleAvatar(
            backgroundImage: NetworkImage(currentUserProfile.avatar),
            radius: 18,
          ),
        ),
        title: const Text(
          'Synergy',
          style: TextStyle(
            color: Color(0xFF1D4ED8),
            fontWeight: FontWeight.w800,
            fontSize: 22,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.search, size: 22),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF1D4ED8),
        shape: const CircleBorder(),
        child: const Icon(CupertinoIcons.pencil, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: [
          // Story list
          SizedBox(
            height: 96,
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: mockStories.length,
              itemBuilder: (context, index) {
                final story = mockStories[index];
                return Padding(
                  padding: const EdgeInsets.only(right: 12),
                  child: Column(
                    children: [
                      Container(
                        width: 62,
                        height: 62,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: story.isSelf
                                ? const Color(0xFF93C5FD)
                                : (story.hasUnseen ? const Color(0xFF1D4ED8) : Colors.grey.shade300),
                            width: 2,
                          ),
                          image: DecorationImage(
                            image: NetworkImage(story.previewImage),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: story.isSelf
                            ? Container(
                                color: Colors.black.withOpacity(0.2),
                                child: const Center(
                                  child: Icon(CupertinoIcons.add, color: Colors.white, size: 22),
                                ),
                              )
                            : null,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        story.name,
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 8),

          // Composer box
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.02),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 18,
                      backgroundImage: NetworkImage(currentUserProfile.avatar),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: const Text(
                          'Share an update or breakthrough...',
                          style: TextStyle(color: Color(0xFF64748B), fontSize: 13),
                        ),
                      ),
                    ),
                  ],
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 10),
                  child: Divider(height: 1, color: Color(0xFFF1F5F9)),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildComposerAction(CupertinoIcons.photo, 'Media', const Color(0xFF2563EB)),
                    _buildComposerAction(CupertinoIcons.calendar, 'Event', const Color(0xFF7C3AED)),
                    _buildComposerAction(CupertinoIcons.doc_text, 'Write', const Color(0xFF059669)),
                  ],
                ),
              ],
            ),
          ),

          // Posts Feed
          ...posts.map((post) => _buildPostCard(post)),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildComposerAction(IconData icon, String label, Color color) {
    return Row(
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: 6),
        Text(
          label,
          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF475569)),
        ),
      ],
    );
  }

  Widget _buildPostCard(PostItem post) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Author Header
          Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundImage: NetworkImage(post.authorAvatar),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      post.authorName,
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                    ),
                    Text(
                      post.authorRole,
                      style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.more_horiz, color: Color(0xFF94A3B8)),
            ],
          ),
          const SizedBox(height: 12),

          // Quote or text content
          if (post.isQuote)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              decoration: BoxDecoration(
                color: const Color(0xFFF8FAFC),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Text(
                post.quoteText ?? '',
                style: const TextStyle(
                  fontSize: 15,
                  fontStyle: FontStyle.italic,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF1E293B),
                  height: 1.4,
                ),
              ),
            )
          else ...[
            Text(
              post.content,
              style: const TextStyle(fontSize: 13, height: 1.45, color: Color(0xFF1E293B)),
            ),
          ],

          // Single image
          if (post.image != null) ...[
            const SizedBox(height: 12),
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(
                post.image!,
                width: double.infinity,
                height: 200,
                fit: BoxFit.cover,
              ),
            ),
          ],

          // Multiple images
          if (post.images != null && post.images!.isNotEmpty) ...[
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.network(
                      post.images![0],
                      height: 180,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.network(
                      post.images![1],
                      height: 180,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ],
            ),
          ],

          const SizedBox(height: 14),
          const Divider(height: 1, color: Color(0xFFF1F5F9)),
          const SizedBox(height: 10),

          // Interactions
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  InkWell(
                    onTap: () {
                      setState(() {
                        post.isLiked = !post.isLiked;
                      });
                    },
                    child: Row(
                      children: [
                        Icon(
                          post.isLiked ? CupertinoIcons.heart_fill : CupertinoIcons.heart,
                          size: 18,
                          color: post.isLiked ? Colors.red : const Color(0xFF64748B),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          '${post.likes + (post.isLiked ? 1 : 0)}',
                          style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 20),
                  Row(
                    children: [
                      const Icon(CupertinoIcons.chat_bubble, size: 18, color: Color(0xFF64748B)),
                      const SizedBox(width: 6),
                      Text(
                        '${post.commentsCount}',
                        style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                      ),
                    ],
                  ),
                  const SizedBox(width: 20),
                  Row(
                    children: [
                      const Icon(CupertinoIcons.arrow_turn_up_right, size: 18, color: Color(0xFF64748B)),
                      const SizedBox(width: 6),
                      Text(
                        '${post.sharesCount}',
                        style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                      ),
                    ],
                  ),
                ],
              ),
              IconButton(
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
                icon: Icon(
                  post.isBookmarked ? CupertinoIcons.bookmark_fill : CupertinoIcons.bookmark,
                  size: 18,
                  color: post.isBookmarked ? const Color(0xFF1D4ED8) : const Color(0xFF64748B),
                ),
                onPressed: () {
                  setState(() {
                    post.isBookmarked = !post.isBookmarked;
                  });
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ---------------- 2. MESSAGES TAB SCREEN ----------------
class MessagesTabScreen extends StatelessWidget {
  const MessagesTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        leadingWidth: 54,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CircleAvatar(
            backgroundImage: NetworkImage(currentUserProfile.avatar),
            radius: 18,
          ),
        ),
        title: const Text(
          'Synergy',
          style: TextStyle(
            color: Color(0xFF1D4ED8),
            fontWeight: FontWeight.w800,
            fontSize: 22,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.search, size: 22),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF1D4ED8),
        shape: const CircleBorder(),
        child: const Icon(CupertinoIcons.pencil, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: [
          // Search box
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: const Row(
                children: [
                  Icon(CupertinoIcons.search, color: Color(0xFF94A3B8), size: 18),
                  SizedBox(width: 8),
                  Text(
                    'Search messages or contacts...',
                    style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 14),

          // ACTIVE NOW header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'ACTIVE NOW',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.8,
                    color: Color(0xFF64748B),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    'SEE ALL',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1D4ED8),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Active users horizontal list
          SizedBox(
            height: 80,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: mockActiveUsersList.length,
              itemBuilder: (context, index) {
                final user = mockActiveUsersList[index];
                return Padding(
                  padding: const EdgeInsets.only(right: 16),
                  child: Column(
                    children: [
                      Stack(
                        children: [
                          CircleAvatar(
                            radius: 25,
                            backgroundImage: NetworkImage(user.avatar),
                          ),
                          Positioned(
                            right: 0,
                            bottom: 0,
                            child: Container(
                              width: 12,
                              height: 12,
                              decoration: BoxDecoration(
                                color: const Color(0xFF22C55E),
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.white, width: 2),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        user.name,
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),

          // Recent Chats header
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Recent Chats',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF0F172A),
                  ),
                ),
                Icon(Icons.tune, size: 20, color: Color(0xFF64748B)),
              ],
            ),
          ),

          // Conversation list
          ...mockConversationsList.map((conv) => _buildConversationTile(context, conv)),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildConversationTile(BuildContext context, Conversation conv) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ChatDetailScreen(conversation: conv),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(color: Color(0xFFF1F5F9), width: 1),
          ),
        ),
        child: Row(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundImage: NetworkImage(conv.avatar),
                ),
                if (conv.unreadCount > 0)
                  Positioned(
                    top: 0,
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: const BoxDecoration(
                        color: Color(0xFF1D4ED8),
                        shape: BoxShape.circle,
                      ),
                      child: Text(
                        '${conv.unreadCount}',
                        style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        conv.userName,
                        style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
                      ),
                      Text(
                        conv.time,
                        style: TextStyle(
                          fontSize: 11,
                          color: conv.unreadCount > 0 ? const Color(0xFF1D4ED8) : const Color(0xFF94A3B8),
                          fontWeight: conv.unreadCount > 0 ? FontWeight.w700 : FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    conv.lastMessage,
                    style: TextStyle(
                      fontSize: 13,
                      color: conv.unreadCount > 0 ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                      fontWeight: conv.unreadCount > 0 ? FontWeight.w600 : FontWeight.normal,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- CHAT DETAIL SCREEN ----------------
class ChatDetailScreen extends StatefulWidget {
  final Conversation conversation;

  const ChatDetailScreen({super.key, required this.conversation});

  @override
  State<ChatDetailScreen> createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends State<ChatDetailScreen> {
  final TextEditingController _controller = TextEditingController();
  late List<ChatMessage> _messages;

  @override
  void initState() {
    super.initState();
    _messages = List<ChatMessage>.from(widget.conversation.messages);
  }

  void _sendMessage() {
    if (_controller.text.trim().isEmpty) return;
    setState(() {
      _messages.add(
        ChatMessage(
          id: DateTime.now().toString(),
          text: _controller.text.trim(),
          timestamp: 'Just now',
          isMe: true,
        ),
      );
      _controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundImage: NetworkImage(widget.conversation.avatar),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.conversation.userName,
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                ),
                const Row(
                  children: [
                    CircleAvatar(radius: 3, backgroundColor: Color(0xFF22C55E)),
                    SizedBox(width: 4),
                    Text(
                      'Online',
                      style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(CupertinoIcons.video_camera), onPressed: () {}),
          IconButton(icon: const Icon(CupertinoIcons.phone), onPressed: () {}),
          const SizedBox(width: 6),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment: msg.isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: msg.isMe ? const Color(0xFF1D4ED8) : Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: Radius.circular(msg.isMe ? 16 : 4),
                        bottomRight: Radius.circular(msg.isMe ? 4 : 16),
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.04),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (msg.image != null) ...[
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(msg.image!),
                          ),
                          const SizedBox(height: 8),
                        ],
                        if (msg.fileName != null) ...[
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF1F5F9),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Row(
                              children: [
                                const Icon(CupertinoIcons.doc_fill, color: Colors.red, size: 24),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(msg.fileName!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                                      Text(msg.fileSize ?? '', style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                        ],
                        Text(
                          msg.text,
                          style: TextStyle(
                            color: msg.isMe ? Colors.white : const Color(0xFF0F172A),
                            fontSize: 14,
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Text(
                            msg.timestamp,
                            style: TextStyle(
                              color: msg.isMe ? Colors.white70 : const Color(0xFF94A3B8),
                              fontSize: 10,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          // Input row
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(CupertinoIcons.plus_circle, color: Color(0xFF64748B)),
                    onPressed: () {},
                  ),
                  IconButton(
                    icon: const Icon(CupertinoIcons.smiley, color: Color(0xFF64748B)),
                    onPressed: () {},
                  ),
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: const InputDecoration(
                        hintText: 'Type a message...',
                        border: InputBorder.none,
                        hintStyle: TextStyle(color: Color(0xFF94A3B8), fontSize: 14),
                      ),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(CupertinoIcons.paperplane_fill, color: Color(0xFF1D4ED8)),
                    onPressed: _sendMessage,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ---------------- 3. APPS TAB SCREEN ----------------
class AppsTabScreen extends StatelessWidget {
  const AppsTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        leadingWidth: 54,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CircleAvatar(
            backgroundImage: NetworkImage(currentUserProfile.avatar),
            radius: 18,
          ),
        ),
        title: const Text(
          'Synergy',
          style: TextStyle(
            color: Color(0xFF1D4ED8),
            fontWeight: FontWeight.w800,
            fontSize: 22,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.search, size: 22),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        children: [
          const Text(
            'App Directory',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: Color(0xFF0F172A),
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            'Centralized hub for all your integrated business tools and enterprise solutions.',
            style: TextStyle(fontSize: 13, color: Color(0xFF64748B), height: 1.4),
          ),
          const SizedBox(height: 16),

          // Categories Filter Row
          SizedBox(
            height: 38,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildFilterChip('All Apps', true),
                _buildFilterChip('Productivity', false),
                _buildFilterChip('Analytics', false),
                _buildFilterChip('CRM', false),
                _buildFilterChip('Security', false),
              ],
            ),
          ),
          const SizedBox(height: 18),

          // Task Manager card
          _buildAppCard(
            title: 'Task Manager',
            description: 'Coordinate cross-functional projects and track real-time progress across teams.',
            icon: CupertinoIcons.checkmark_square_fill,
            iconBg: const Color(0xFFDBEAFE),
            iconColor: const Color(0xFF2563EB),
            badge: 'Active',
            badgeColor: const Color(0xFFE0F2FE),
            badgeTextColor: const Color(0xFF0284C7),
          ),

          // CRM Pro
          _buildAppCard(
            title: 'CRM Pro',
            description: 'Unified customer relationship management with integrated lead scoring and pipeline tracking.',
            icon: CupertinoIcons.share,
            iconBg: const Color(0xFFF3E8FF),
            iconColor: const Color(0xFF9333EA),
            showArrow: true,
          ),

          // BI Analytics
          _buildAppCard(
            title: 'BI Analytics',
            description: 'Deep-dive into organizational data with AI-powered predictive insights and visual dashboards.',
            icon: CupertinoIcons.graph_circle_fill,
            iconBg: const Color(0xFFCCFBF1),
            iconColor: const Color(0xFF0D9488),
            showArrow: true,
          ),

          // Team Calendar
          _buildAppCard(
            title: 'Team Calendar',
            description: 'Sync schedules effortlessly with smart availability detection and meeting room booking.',
            icon: CupertinoIcons.calendar,
            iconBg: const Color(0xFFE0E7FF),
            iconColor: const Color(0xFF4F46E5),
            showArrow: true,
          ),

          // Wiki Docs
          _buildAppCard(
            title: 'Wiki Docs',
            description: 'Centralized documentation, company policies, and collaborative training modules.',
            icon: CupertinoIcons.book_fill,
            iconBg: const Color(0xFFEDE9FE),
            iconColor: const Color(0xFF7C3AED),
            showArrow: true,
          ),

          // QL Kho (DemoApp1)
          _buildAppCard(
            title: 'QL Kho (DemoApp1)',
            description: 'Hệ thống quản lý kho thông minh, tích hợp đồng bộ dữ liệu thời gian thực.',
            icon: CupertinoIcons.archivebox_fill,
            iconBg: const Color(0xFFFEF3C7),
            iconColor: const Color(0xFFD97706),
            badge: 'LINKED',
            badgeColor: const Color(0xFFFFFBEB),
            badgeTextColor: const Color(0xFFB45309),
            onTap: () async {
              if (Platform.isAndroid) {
                final token = await ApiService().getToken();
                final username = await ApiService().getUsername();
                final intent = AndroidIntent(
                  action: 'android.intent.action.MAIN',
                  package: 'com.pro.qlkho',
                  componentName: 'com.pro.qlkho.MainActivity',
                  arguments: {
                    'auth_token': token ?? '',
                    'username': username ?? '',
                    'source_app': 'Synergy'
                  },
                );
                await intent.launch();
              } else {
                // Mock for other platforms
                debugPrint('Launching DemoApp1 with token passing...');
              }
            },
          ),

          // Coming Soon AI Assistant Banner
          Container(
            margin: const EdgeInsets.only(bottom: 24),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E1B4B), Color(0xFF1E3A8A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF1D4ED8).withOpacity(0.3),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFF818CF8).withOpacity(0.3),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: const Text(
                    'COMING SOON',
                    style: TextStyle(
                      color: Color(0xFFC7D2FE),
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Synergy AI Assistant',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Automate workflows and generate reports using natural language.',
                  style: TextStyle(
                    color: Color(0xFFCBD5E1),
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, bool isSelected) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isSelected ? const Color(0xFF1D4ED8) : const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Center(
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isSelected ? Colors.white : const Color(0xFF475569),
          ),
        ),
      ),
    );
  }

  Widget _buildAppCard({
    required String title,
    required String description,
    required IconData icon,
    required Color iconBg,
    required Color iconColor,
    String? badge,
    Color? badgeColor,
    Color? badgeTextColor,
    bool showArrow = false,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFF1F5F9)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: iconBg,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(icon, color: iconColor, size: 22),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
                  ),
                ),
                if (badge != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: badgeColor,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      badge,
                      style: TextStyle(color: badgeTextColor, fontSize: 11, fontWeight: FontWeight.w700),
                    ),
                  ),
                if (showArrow)
                  const Icon(CupertinoIcons.chevron_right, size: 16, color: Color(0xFF94A3B8)),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              description,
              style: const TextStyle(fontSize: 13, color: Color(0xFF64748B), height: 1.4),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- 4. CONTACTS TAB SCREEN ----------------
class ContactsTabScreen extends StatelessWidget {
  const ContactsTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        leadingWidth: 54,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CircleAvatar(
            backgroundImage: NetworkImage(currentUserProfile.avatar),
            radius: 18,
          ),
        ),
        title: const Text(
          'Synergy',
          style: TextStyle(
            color: Color(0xFF1D4ED8),
            fontWeight: FontWeight.w800,
            fontSize: 22,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.search, size: 22),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF1D4ED8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: const Icon(CupertinoIcons.person_badge_plus, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          // Search box
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: const Row(
              children: [
                Icon(CupertinoIcons.search, color: Color(0xFF94A3B8), size: 18),
                SizedBox(width: 8),
                Text(
                  'Search professionals...',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Filter pills
          SizedBox(
            height: 38,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildPill('All', true),
                _buildPill('Favorites', false),
                _buildPill('Corporate', false),
                _buildPill('Internal', false),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // FREQUENT CONTACTS
          const Text(
            'FREQUENT CONTACTS',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.8,
              color: Color(0xFF64748B),
            ),
          ),
          const SizedBox(height: 10),

          ...mockFrequentContacts.map((contact) => _buildFrequentContactCard(contact)),

          const SizedBox(height: 20),

          // ALL DIRECTORY
          const Text(
            'ALL DIRECTORY',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.8,
              color: Color(0xFF64748B),
            ),
          ),
          const SizedBox(height: 10),

          // Section A
          const Text(
            'A',
            style: TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF1D4ED8), fontSize: 14),
          ),
          const SizedBox(height: 6),
          _buildDirectoryItem(mockDirectoryContacts[0]),
          _buildDirectoryItem(mockDirectoryContacts[1]),

          const SizedBox(height: 14),
          // Section B
          const Text(
            'B',
            style: TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF1D4ED8), fontSize: 14),
          ),
          const SizedBox(height: 6),
          _buildDirectoryItem(mockDirectoryContacts[2]),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildPill(String text, bool active) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
      decoration: BoxDecoration(
        color: active ? const Color(0xFF1D4ED8) : const Color(0xFFEFF6FF),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: active ? Colors.white : const Color(0xFF2563EB),
          ),
        ),
      ),
    );
  }

  Widget _buildFrequentContactCard(ContactItem contact) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF1F5F9)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 24,
            backgroundImage: NetworkImage(contact.avatar!),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  contact.name,
                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                ),
                Text(
                  contact.role,
                  style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                ),
              ],
            ),
          ),
          // Call & Chat buttons
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(10),
            ),
            child: IconButton(
              icon: const Icon(CupertinoIcons.phone, color: Color(0xFF1D4ED8), size: 18),
              onPressed: () {},
            ),
          ),
          const SizedBox(width: 8),
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(10),
            ),
            child: IconButton(
              icon: const Icon(CupertinoIcons.chat_bubble_2, color: Color(0xFF1D4ED8), size: 18),
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDirectoryItem(ContactItem contact) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0xFFF1F5F9))),
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            decoration: const BoxDecoration(
              color: Color(0xFFDBEAFE),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                contact.initials ?? '?',
                style: const TextStyle(
                  color: Color(0xFF1D4ED8),
                  fontWeight: FontWeight.w700,
                  fontSize: 14,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(contact.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                Text(contact.role, style: const TextStyle(color: Color(0xFF64748B), fontSize: 11)),
              ],
            ),
          ),
          const Icon(CupertinoIcons.chevron_right, size: 16, color: Color(0xFF94A3B8)),
        ],
      ),
    );
  }
}

// ---------------- 5. PROFILE TAB SCREEN ----------------
class ProfileTabScreen extends StatefulWidget {
  final VoidCallback onLogout;
  const ProfileTabScreen({super.key, required this.onLogout});

  @override
  State<ProfileTabScreen> createState() => _ProfileTabScreenState();
}

class _ProfileTabScreenState extends State<ProfileTabScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool isFollowing = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        leadingWidth: 54,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CircleAvatar(
            backgroundImage: NetworkImage(currentUserProfile.avatar),
            radius: 18,
          ),
        ),
        title: const Text(
          'Synergy',
          style: TextStyle(
            color: Color(0xFF1D4ED8),
            fontWeight: FontWeight.w800,
            fontSize: 22,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            onPressed: widget.onLogout,
            icon: const Icon(CupertinoIcons.square_arrow_right, color: Color(0xFF64748B)),
            tooltip: 'Sign Out',
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: ListView(
        children: [
          // Cover & Avatar Stack
          Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                height: 130,
                width: double.infinity,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(currentUserProfile.coverImage),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned(
                bottom: -45,
                left: 20,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: CircleAvatar(
                    radius: 40,
                    backgroundImage: NetworkImage(currentUserProfile.avatar),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 50),

          // User Info & Buttons
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          currentUserProfile.name,
                          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${currentUserProfile.title} • ${currentUserProfile.department}',
                          style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  currentUserProfile.bio,
                  style: const TextStyle(fontSize: 13, color: Color(0xFF334155), height: 1.45),
                ),
                const SizedBox(height: 16),

                // Action buttons: Follow & Message
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          setState(() => isFollowing = !isFollowing);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isFollowing ? const Color(0xFFF1F5F9) : const Color(0xFF1D4ED8),
                          foregroundColor: isFollowing ? const Color(0xFF0F172A) : Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          elevation: 0,
                        ),
                        child: Text(
                          isFollowing ? 'Following' : 'Follow',
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {},
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF1D4ED8),
                          side: const BorderSide(color: Color(0xFFCBD5E1)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text('Message', style: TextStyle(fontWeight: FontWeight.w700)),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Stats Box
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFF1F5F9)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildStatItem(currentUserProfile.followers, 'FOLLOWERS'),
                      Container(height: 30, width: 1, color: const Color(0xFFE2E8F0)),
                      _buildStatItem('${currentUserProfile.projectsCount}', 'PROJECTS'),
                      Container(height: 30, width: 1, color: const Color(0xFFE2E8F0)),
                      _buildStatItem(currentUserProfile.following, 'FOLLOWING'),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Tabs: Timeline, Projects, Resources
          TabBar(
            controller: _tabController,
            labelColor: const Color(0xFF1D4ED8),
            unselectedLabelColor: const Color(0xFF64748B),
            indicatorColor: const Color(0xFF1D4ED8),
            indicatorWeight: 3,
            tabs: const [
              Tab(text: 'Timeline'),
              Tab(text: 'Projects'),
              Tab(text: 'Resources'),
            ],
          ),

          // Tab content
          SizedBox(
            height: 480,
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildTimelineList(),
                _buildProjectsList(),
                _buildResourcesList(),
              ],
            ),
          ),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildStatItem(String count, String label) {
    return Column(
      children: [
        Text(
          count,
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Color(0xFF94A3B8)),
        ),
      ],
    );
  }

  Widget _buildTimelineList() {
    return ListView(
      padding: const EdgeInsets.all(16),
      physics: const NeverScrollableScrollPhysics(),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFF1F5F9)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(radius: 18, backgroundImage: NetworkImage(currentUserProfile.avatar)),
                  const SizedBox(width: 10),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Alex Chen', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                      Text('shared a project update • 2h ago', style: TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 10),
              const Text(
                'Just deployed the new V3 synchronization engine for the Synergy Dashboard. Massive performance gains on high-latency networks! 🚀',
                style: TextStyle(fontSize: 12, height: 1.4),
              ),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
                  height: 120,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildProjectsList() {
    return ListView(
      padding: const EdgeInsets.all(16),
      physics: const NeverScrollableScrollPhysics(),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFF1F5F9)),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Nebula Dashboard System', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
              SizedBox(height: 4),
              Text('Enterprise scalability for data-rich environments with real-time analytics.', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildResourcesList() {
    return ListView(
      padding: const EdgeInsets.all(16),
      physics: const NeverScrollableScrollPhysics(),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFF1F5F9)),
          ),
          child: const Row(
            children: [
              Icon(CupertinoIcons.doc_fill, color: Color(0xFF1D4ED8), size: 28),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Synergy Design Tokens & Specs', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                    Text('Figma Kit • 42.8 MB', style: TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
