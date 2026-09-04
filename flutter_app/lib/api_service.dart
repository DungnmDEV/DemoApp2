import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'https://domain.com';
  static const String tokenKey = 'auth_token';
  static const String userKey = 'auth_user';

  // Singleton
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  bool isMockMode = true; // Default to mock for development

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(tokenKey);
  }

  Future<String?> getUsername() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(userKey);
  }

  Future<void> saveSession(String token, String username) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(tokenKey, token);
    await prefs.setString(userKey, username);
  }

  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(tokenKey);
    await prefs.remove(userKey);
  }

  Future<Map<String, dynamic>> login(String username, String password) async {
    if (isMockMode) {
      await Future.delayed(const Duration(milliseconds: 800));

      // Specifically allow admin/123 as requested
      if (username == 'admin' && password == '123') {
        const token = 'mock_admin_token_2026';
        await saveSession(token, 'admin');
        return {'status': true, 'id': 'admin_001', 'token': token, 'username': 'Administrator'};
      }

      if (username == 'error') {
        return {'status': false, 'message': 'Invalid credentials'};
      }

      // Default for other inputs
      final token = 'mock_token_${DateTime.now().millisecondsSinceEpoch}';
      await saveSession(token, username);
      return {'status': true, 'id': 'user_123', 'token': token};
    }

    final response = await http.post(
      Uri.parse('$baseUrl/api/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    final data = jsonDecode(response.body);
    if (data['status'] == true && data['token'] != null) {
      await saveSession(data['token'], username);
    }
    return data;
  }

  Future<void> logout() async {
    if (!isMockMode) {
      final token = await getToken();
      await http.post(
        Uri.parse('$baseUrl/api/logout'),
        headers: {'Authorization': 'Bearer $token'},
      );
    }
    await clearToken();
  }

  Future<Map<String, dynamic>> getRecord(String id) async {
    if (isMockMode) {
      await Future.delayed(const Duration(milliseconds: 300));
      return {
        'status': true,
        'data': 'Mock data for record $id',
        'permission': 'RWEDO'
      };
    }

    final token = await getToken();
    final response = await http.get(
      Uri.parse('$baseUrl/api/v2/record/$id'),
      headers: {'Authorization': 'Bearer $token'},
    );

    return jsonDecode(response.body);
  }
}
