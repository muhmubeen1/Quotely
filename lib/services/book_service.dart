import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/book.dart';

class BookService {
  // ✅ Use 'localhost' for Flutter web on same machine
  static const String _baseUrl = 'http://localhost:5000/api/books';

  /// GET /api/books
  static Future<List<Book>> getBooks() async {
    try {
      final response = await http.get(Uri.parse(_baseUrl));

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = jsonDecode(response.body);
        return jsonData.map((json) => Book.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load books: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching books: $e');
    }
  }

  /// POST /api/books
  static Future<void> addBook(Book book) async {
    try {
      final response = await http.post(
        Uri.parse(_baseUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(book.toJson()),
      );

      if (response.statusCode != 201) {
        throw Exception('Failed to add book: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error adding book: $e');
    }
  }
}
