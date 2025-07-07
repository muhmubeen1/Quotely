class Book {
  final int id;
  final String title;
  final String author;
  final String genre;
  final int totalPages;

  Book({
    required this.id,
    required this.title,
    required this.author,
    required this.genre,
    required this.totalPages,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      id: json['id'],
      title: json['title'],
      author: json['author'],
      genre: json['genre'] ?? '',
      totalPages: json['total_pages'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'author': author,
      'genre': genre,
      'total_pages': totalPages,
    };
  }
}
