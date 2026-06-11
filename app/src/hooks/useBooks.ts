import { api } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

export interface Book {
    id: string;
    title: string;
    author: string;
    cover?: string;
    totalPages: number;
    currentPage: number;
    status: 'reading' | 'completed' | 'want_to_read';
    createdAt: string;
}

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Fetch all books
    const fetchBooks = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await api.getBooks();

            // ⭐ Handle paginated response: { books: [...], pagination: {...} }
            const booksData = response.books || response; // Fallback if no pagination

            setBooks(Array.isArray(booksData) ? booksData : []);
            return response;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch books');
            setBooks([]);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);
    // Fetch single book
    const fetchBook = useCallback(async (id: string) => {
        setIsLoading(true);
        setError('');

        try {
            const data = await api.getBook(id);
            setCurrentBook(data);
            return data;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch book');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Create book
    const createBook = useCallback(async (bookData: Omit<Book, 'id' | 'createdAt'>) => {
        setIsLoading(true);
        setError('');

        try {
            const newBook = await api.createBook(bookData);
            setBooks(prev => [newBook, ...prev]);
            return newBook;
        } catch (err: any) {
            setError(err.message || 'Failed to create book');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update book
    const updateBook = useCallback(async (id: string, updates: Partial<Book>) => {
        setIsLoading(true);
        setError('');

        try {
            const updated = await api.updateBook(id, updates);
            setBooks(prev => prev.map(b => b.id === id ? updated : b));
            if (currentBook?.id === id) setCurrentBook(updated);
            return updated;
        } catch (err: any) {
            setError(err.message || 'Failed to update book');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [currentBook]);

    // Delete book
    const deleteBook = useCallback(async (id: string) => {
        setIsLoading(true);
        setError('');

        try {
            await api.deleteBook(id);
            setBooks(prev => prev.filter(b => b.id !== id));
            if (currentBook?.id === id) setCurrentBook(null);
        } catch (err: any) {
            setError(err.message || 'Failed to delete book');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [currentBook]);

    // Auto-fetch on mount (optional)
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return {
        books,
        currentBook,
        isLoading,
        error,
        fetchBooks,
        fetchBook,
        createBook,
        updateBook,
        deleteBook,
        setCurrentBook,
    };
}