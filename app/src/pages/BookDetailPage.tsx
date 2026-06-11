import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { useBooks } from '@/hooks/useBooks';
import { useQuotes } from '@/hooks/useQuotes';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Edit3,
    Heart,
    Plus,
    Quote,
    Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { books, fetchBooks, deleteBook, isLoading: booksLoading } = useBooks();
    const { quotes, fetchQuotes, createQuote, deleteQuote, toggleFavorite, isLoading: quotesLoading } = useQuotes(id);

    const [book, setBook] = useState<any>(null);
    const [showAddQuote, setShowAddQuote] = useState(false);
    const [newQuote, setNewQuote] = useState({ content: '', page: '' });

    // ⭐ Fetch book data
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // ⭐ Find book from fetched data
    useEffect(() => {
        if (books.length > 0 && id) {
            const foundBook = books.find(b => b.id.toString() === id);
            if (foundBook) {
                setBook(foundBook);
            } else {
                navigate('/books');
            }
        }
    }, [books, id, navigate]);

    // ⭐ Fetch quotes for this book
    useEffect(() => {
        if (id) {
            fetchQuotes();
        }
    }, [id, fetchQuotes]);

    const handleDeleteBook = async () => {
        if (!confirm('Delete this book and all its quotes?')) return;
        try {
            await deleteBook(id!);
            navigate('/books');
        } catch (err) {
            console.error('Failed to delete book');
        }
    };

    const handleAddQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createQuote({
                content: newQuote.content,
                page: Number(newQuote.page) || undefined,
                bookId: id,
            });
            setNewQuote({ content: '', page: '' });
            setShowAddQuote(false);
        } catch (err) {
            console.error('Failed to add quote');
        }
    };

    const handleDeleteQuote = async (quoteId: string) => {
        if (!confirm('Delete this quote?')) return;
        try {
            await deleteQuote(quoteId);
        } catch (err) {
            console.error('Failed to delete quote');
        }
    };

    if (booksLoading || !book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-white/60">Loading book...</p>
            </div>
        );
    }

    const progressPercent = book.total_pages > 0
        ? Math.round((book.current_page || 0) / book.total_pages * 100)
        : 0;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/books')}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Library
            </motion.button>

            {/* Book Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GlassCard className="!p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Cover */}
                        <div className="w-32 h-44 md:w-48 md:h-64 rounded-xl bg-gradient-to-br from-neon-blue/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-16 h-16 text-white/50" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
                                    <p className="text-xl text-white/70">{book.author}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleDeleteBook}
                                        className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-3">
                                <span className="px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-sm">
                                    {book.genre || 'No Genre'}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${book.status === 'reading' ? 'bg-green-500/20 text-green-400' :
                                    book.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {book.status?.replace('_', ' ') || 'Want to Read'}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Reading Progress</span>
                                    <span className="text-white font-medium">{progressPercent}%</span>
                                </div>
                                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-neon-blue to-purple-500 transition-all"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <p className="text-sm text-white/50">
                                    {book.current_page || 0} of {book.total_pages} pages
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold text-white">{quotes.length}</p>
                                    <p className="text-sm text-white/50">Quotes</p>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold text-white">
                                        {quotes.filter((q: any) => q.isFavorite).length}
                                    </p>
                                    <p className="text-sm text-white/50">Favorites</p>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold text-white">
                                        {book.target_completion_days || '-'}
                                    </p>
                                    <p className="text-sm text-white/50">Days Target</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Quotes Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Quote className="w-6 h-6 text-neon-blue" />
                        Quotes
                    </h2>
                    <NeonButton variant="primary" onClick={() => setShowAddQuote(!showAddQuote)}>
                        <Plus className="w-4 h-4" />
                        Add Quote
                    </NeonButton>
                </div>

                {/* Add Quote Form */}
                {showAddQuote && (
                    <GlassCard className="!p-6">
                        <form onSubmit={handleAddQuote} className="space-y-4">
                            <textarea
                                value={newQuote.content}
                                onChange={(e) => setNewQuote({ ...newQuote, content: e.target.value })}
                                placeholder="Enter your quote..."
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-blue min-h-[100px]"
                                required
                            />
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={newQuote.page}
                                    onChange={(e) => setNewQuote({ ...newQuote, page: e.target.value })}
                                    placeholder="Page number"
                                    className="w-32 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-blue"
                                />
                                <NeonButton type="submit" variant="primary">
                                    Save Quote
                                </NeonButton>
                            </div>
                        </form>
                    </GlassCard>
                )}

                {/* Quotes List */}
                {quotesLoading ? (
                    <p className="text-white/60">Loading quotes...</p>
                ) : quotes.length === 0 ? (
                    <GlassCard className="text-center py-12">
                        <Quote className="w-12 h-12 text-white/30 mx-auto mb-4" />
                        <p className="text-white/60">No quotes yet. Add your first quote!</p>
                    </GlassCard>
                ) : (
                    <div className="space-y-3">
                        {quotes.map((quote: any, index: number) => (
                            <motion.div
                                key={quote.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <GlassCard className="!p-6 group">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="text-white text-lg leading-relaxed mb-3">
                                                "{quote.content}"
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-white/50">
                                                <span>Page {quote.page}</span>
                                                <span>•</span>
                                                <span>{new Date(quote.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => toggleFavorite(quote.id)}
                                                className={`p-2 rounded-lg transition-colors ${quote.isFavorite
                                                    ? 'text-red-400 bg-red-500/20'
                                                    : 'text-white/40 hover:text-red-400 hover:bg-red-500/20'
                                                    }`}
                                            >
                                                <Heart className={`w-5 h-5 ${quote.isFavorite ? 'fill-current' : ''}`} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuote(quote.id)}
                                                className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

