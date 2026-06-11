// src/pages/BooksPage.tsx
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { useBooks } from '@/hooks/useBooks';
import { motion } from 'framer-motion';
import { BookOpen, Grid3X3, List, Plus, Quote, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function BooksPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const { books = [], isLoading, error, fetchBooks } = useBooks();

  // ⭐ FETCH BOOKS WHEN PAGE LOADS
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Safety check - ensure books is always an array
  const safeBooks = Array.isArray(books) ? books : [];

  const filteredBooks = safeBooks.filter((book: any) =>
    book?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book?.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">My Books</h1>
          <p className="text-white/60">
            {safeBooks.length} books • {safeBooks.reduce((acc: number, b: any) => acc + (b.quotes_count || b.totalQuotes || 0), 0)} quotes
          </p>
        </div>

        <NeonButton
          variant="primary"
          onClick={() => navigate('/books/new')}
        >
          <Plus className="w-4 h-4" />
          Add Book
        </NeonButton>
      </motion.div>

      {/* Search and View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <NeonInput
            placeholder="Search books by title or author..."
            icon={<Search className="w-5 h-5" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {isLoading && (
        <GlassCard className="text-center py-16">
          <p className="text-white/60">Loading your books...</p>
        </GlassCard>
      )}

      {error && (
        <GlassCard className="text-red-400 text-center py-12">
          Error loading books: {error}
        </GlassCard>
      )}

      {!isLoading && !error && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book: any, index: number) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => navigate(`/books/${book.id}`)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <GlassCard className="!p-6 h-full">
                    <div className="w-full h-48 rounded-lg bg-gradient-to-br from-neon-blue/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <BookOpen className="w-12 h-12 text-white/40" />
                    </div>
                    <h3 className="font-semibold text-white mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-1">{book.author}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
                      <Quote className="w-3 h-3" />
                      <span>{book.quotes_count || 0} quotes</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBooks.map((book: any, index: number) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <NavLink to={`/books/${book.id}`}>
                    <GlassCard className="flex items-center gap-4 group">
                      <div className="w-16 h-20 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-white/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-neon-blue transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-white/50">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {book.quotes_count || book.totalQuotes || 0}
                        </p>
                        <p className="text-xs text-white/50">quotes</p>
                      </div>
                    </GlassCard>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          )}

          {safeBooks.length === 0 && (
            <GlassCard className="text-center py-20">
              <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-white mb-3">Your library is empty</h3>
              <p className="text-white/60 mb-6">Start by adding your first book</p>
              <NeonButton onClick={() => navigate('/books/new')}>
                + Add Your First Book
              </NeonButton>
            </GlassCard>
          )}
        </>
      )}
    </div>
  );
}