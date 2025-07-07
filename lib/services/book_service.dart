import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/book.dart';

class BookService {
  static const String baseUrl = 'http://<your-local-ip>:5000/api/books';

  static Future<List<Book>> getBooks() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final List<dynamic> body = json.decode(response.body);
      return body.map((json) => Book.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load books');
    }
  }

  static Future<void> addBook(Book book) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(book.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to add book');
    }
  }
}
