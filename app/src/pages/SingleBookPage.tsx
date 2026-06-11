import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Quote, Plus, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { QuoteCard } from '@/components/ui/custom/QuoteCard';
import { books, quotes } from '@/data/dummyData';

export function SingleBookPage() {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === id);
  const bookQuotes = quotes.filter((q) => q.bookId === id);

  if (!book) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-2">Book not found</h1>
        <NavLink to="/books" className="text-neon-blue hover:underline">
          Back to books
        </NavLink>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavLink
          to="/books"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </NavLink>
      </motion.div>

      {/* Book Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: book.color }}
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div
              className="w-32 h-44 md:w-40 md:h-56 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${book.color}20` }}
            >
              <BookOpen className="w-16 h-16 md:w-20 md:h-20" style={{ color: book.color, opacity: 0.5 }} />
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{book.title}</h1>
              <p className="text-lg text-white/60 mb-4">{book.author}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
                  <Quote className="w-4 h-4 text-neon-blue" />
                  <span className="text-white/70">{book.totalQuotes} quotes</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
                  <Calendar className="w-4 h-4 text-neon-purple" />
                  <span className="text-white/70">
                    Last added {new Date(book.lastAdded).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <NeonButton variant="primary">
                <Plus className="w-4 h-4" />
                Add Quote
              </NeonButton>
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
          <h2 className="text-xl font-semibold text-white">Quotes from this book</h2>
          <span className="text-white/50">{bookQuotes.length} quotes</span>
        </div>

        <div className="grid gap-4">
          {bookQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <QuoteCard quote={quote} />
            </motion.div>
          ))}
        </div>

        {bookQuotes.length === 0 && (
          <GlassCard className="text-center py-12">
            <Quote className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No quotes yet</h3>
            <p className="text-white/50 mb-4">Start adding quotes from this book</p>
            <NeonButton variant="primary">
              <Plus className="w-4 h-4" />
              Add First Quote
            </NeonButton>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
