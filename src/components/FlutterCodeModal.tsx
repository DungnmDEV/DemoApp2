import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Terminal, Download, Smartphone } from 'lucide-react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'mockData' | 'pubspec' | 'runGuide'>('main');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeFiles = {
    main: `// Flutter Source: lib/main.dart
// Synergy - Enterprise Social & Collaboration Suite
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'mock_data.dart';

void main() {
  runApp(const SynergyApp());
}

class SynergyApp extends StatelessWidget {
  const SynergyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Synergy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        primaryColor: const Color(0xFF1D4ED8), // Deep Blue (#1D4ED8)
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1D4ED8),
          primary: const Color(0xFF1D4ED8),
          surface: Colors.white,
        ),
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const FeedTabScreen(),
    const MessagesTabScreen(),
    const AppsTabScreen(),
    const ContactsTabScreen(),
    const ProfileTabScreen(),
  ];

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
          border: Border(top: BorderSide(color: Colors.grey.shade200)),
        ),
        child: SafeArea(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, CupertinoIcons.news, CupertinoIcons.news_solid, 'Feed'),
              _buildNavItem(1, CupertinoIcons.chat_bubble_2, CupertinoIcons.chat_bubble_2_fill, 'Messages'),
              _buildNavItem(2, CupertinoIcons.square_grid_3x3, CupertinoIcons.square_grid_3x3_fill, 'Apps'),
              _buildNavItem(3, CupertinoIcons.person_crop_square, CupertinoIcons.person_crop_square_fill, 'Contacts'),
              _buildNavItem(4, CupertinoIcons.person, CupertinoIcons.person_fill, 'Profile'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData outline, IconData filled, String label) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? const Color(0xFF1D4ED8) : const Color(0xFF64748B);
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(isSelected ? filled : outline, color: color, size: 24),
            const SizedBox(height: 3),
            Text(label, style: TextStyle(fontSize: 11, color: color, fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500)),
          ],
        ),
      ),
    );
  }
}
// (Full screen implementations in flutter_app/lib/main.dart)`,
    mockData: `// Flutter Source: lib/mock_data.dart
class StoryItem {
  final String id;
  final String name;
  final String avatar;
  final String previewImage;
  final bool hasUnseen;
  final bool isSelf;

  StoryItem({
    required this.id,
    required this.name,
    required this.avatar,
    required this.previewImage,
    this.hasUnseen = true,
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
  final bool isQuote;
  final String? quoteText;
  final String? tag;
  int likes;
  int commentsCount;
  int sharesCount;
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
    this.isQuote = false,
    this.quoteText,
    this.tag,
    this.likes = 0,
    this.commentsCount = 0,
    this.sharesCount = 0,
    this.isLiked = false,
    this.isBookmarked = false,
  });
}

// Complete mock dataset for Feed, Active Users, Conversations, Directory, and Profile
// (Stored in flutter_app/lib/mock_data.dart)`,
    pubspec: `name: synergy_app
description: "Synergy Enterprise Collaboration Mobile App in Flutter"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`,
    runGuide: `# How to run on Android & iOS

1. Ensure Flutter is installed:
   $ flutter --version

2. Navigate to the flutter directory:
   $ cd flutter_app

3. Install packages:
   $ flutter pub get

4. Run in Android Simulator or connected physical phone:
   $ flutter run -d android

5. Run on iOS Simulator (macOS):
   $ open -a Simulator
   $ flutter run -d iPhone

6. Build APK or iOS release:
   $ flutter build apk --release
   $ flutter build ios --release`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeFiles[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Flutter Source Code
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                  Dart 3.0+
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ready for Android & iOS deployment with custom Deep Blue (#1D4ED8) theme
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4">
          <button
            onClick={() => setActiveTab('main')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'main'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>lib/main.dart</span>
          </button>
          <button
            onClick={() => setActiveTab('mockData')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'mockData'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="h-4 w-4" />
            <span>lib/mock_data.dart</span>
          </button>
          <button
            onClick={() => setActiveTab('pubspec')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'pubspec'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="h-4 w-4" />
            <span>pubspec.yaml</span>
          </button>
          <button
            onClick={() => setActiveTab('runGuide')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'runGuide'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Setup & Run Instructions</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar">
          <pre>{codeFiles[activeTab]}</pre>
        </div>

        {/* Bottom Status bar */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-400">
          <span>All 5 Bottom Navigation tabs + Chat Detail included in project</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" /> Ready to build for Android & iOS
          </span>
        </div>
      </div>
    </div>
  );
};
