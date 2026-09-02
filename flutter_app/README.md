# Synergy - Flutter Enterprise Social & Collaboration Demo

Ứng dụng demo đa nền tảng Flutter (Android & iOS) tái hiện giao diện mạng xã hội doanh nghiệp phong cách Zalo / Enterprise Social Suite.

## Tone màu & Thiết kế
- **Màu chủ đạo**: Deep Blue (`#1D4ED8`)
- **Nền**: Light Slate (`#F8FAFC`) & Clean White (`#FFFFFF`)
- **Bo góc thẻ**: 16px - 24px bo cong mềm mại, bóng đổ êm dịu
- **Bộ icon**: Apple Cupertino & Material 3

## Cấu trúc thư mục Flutter
```
flutter_app/
├── pubspec.yaml          # Cấu hình dependency (google_fonts, cupertino_icons)
└── lib/
    ├── main.dart         # Toàn bộ Scaffold, BottomNavigationBar (5 tabs) và chi tiết Chat
    └── mock_data.dart    # Dữ liệu ảo chuẩn nghiệp vụ cho Feed, Story, Chat, Apps, Danh bạ & Profile
```

## Hướng dẫn Build & Chạy

### 1. Cài đặt thư viện
```bash
cd flutter_app
flutter pub get
```

### 2. Chạy trên Android Simulator hoặc máy thật
```bash
flutter run -d android
```

### 3. Chạy trên iOS Simulator (yêu cầu macOS & Xcode)
```bash
open -a Simulator
flutter run -d iPhone
```

### 4. Build file cài đặt
- **Android APK**: `flutter build apk --release`
- **iOS Bundle**: `flutter build ios --release`
