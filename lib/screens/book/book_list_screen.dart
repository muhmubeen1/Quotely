import 'package:flutter/material.dart';

import '../../models/book.dart';
import '../../services/book_services.dart';

class BookListScreen extends StatefulWidget {
  @override
  State<BookListScreen> createState() => _BookListScreenState();
}

class _BookListScreenState extends State<BookListScreen> {
  late Future<List<Book>> _books;

  @override
  void initState() {
    super.initState();
    _books = BookService.getBooks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Your Books')),
      body: FutureBuilder<List<Book>>(
        future: _books,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final books = snapshot.data!;
            return ListView.builder(
              itemCount: books.length,
              itemBuilder: (context, index) => ListTile(
                title: Text(books[index].title),
                subtitle: Text(
                  '${books[index].author} — ${books[index].genre}',
                ),
              ),
            );
          } else if (snapshot.hasError) {
            return Center(child: Text('Failed to load books'));
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
