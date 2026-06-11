import { api } from '@/lib/api';
import { useCallback, useState } from 'react';

export interface Quote {
    id: string;
    content: string;
    page?: number;
    bookId: string;
    bookTitle?: string;
    tags: string[];
    isFavorite: boolean;
    createdAt: string;
}

export function useQuotes(bookId?: string) {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [favorites, setFavorites] = useState<Quote[]>([]);
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Fetch quotes (all or by book)
    const fetchQuotes = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const data = bookId
                ? await api.getQuotesByBook(bookId)
                : await api.getQuotes();

            // ⭐ Ensure data is array
            setQuotes(Array.isArray(data) ? data : []);
            return data;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch quotes');
            setQuotes([]); // Reset on error
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [bookId]);

    // Fetch favorites
    const fetchFavorites = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.getFavorites();
            setFavorites(Array.isArray(data) ? data : []);
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Create quote
    const createQuote = useCallback(async (quoteData: any) => {
        setIsLoading(true);
        setError('');

        try {
            const newQuote = await api.createQuote(quoteData);
            setQuotes(prev => [newQuote, ...prev]);
            return newQuote;
        } catch (err: any) {
            setError(err.message || 'Failed to create quote');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Delete quote
    const deleteQuote = useCallback(async (id: string) => {
        setIsLoading(true);
        setError('');

        try {
            await api.deleteQuote(id);
            setQuotes(prev => prev.filter(q => q.id !== id));
            setFavorites(prev => prev.filter(q => q.id !== id));
            if (currentQuote?.id === id) setCurrentQuote(null);
        } catch (err: any) {
            setError(err.message || 'Failed to delete quote');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [currentQuote]);

    // Toggle favorite
    const toggleFavorite = useCallback(async (id: string) => {
        try {
            const updated = await api.favoriteQuote(id);
            setQuotes(prev => prev.map(q => q.id === id ? { ...q, isFavorite: updated.isFavorite } : q));

            if (updated.isFavorite) {
                setFavorites(prev => [...prev, updated]);
            } else {
                setFavorites(prev => prev.filter(q => q.id !== id));
            }

            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    }, []);

    // ⭐ Manual fetch only - no auto-fetch to avoid conflicts
    // Call fetchQuotes() manually when needed

    return {
        quotes,
        favorites,
        currentQuote,
        tags,
        isLoading,
        error,
        fetchQuotes,
        fetchFavorites,
        createQuote,
        deleteQuote,
        toggleFavorite,
        setCurrentQuote,
    };
}