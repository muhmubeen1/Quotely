import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Quote } from 'lucide-react';
import type { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  className?: string;
}

export function BookCard({ book, onClick, className }: BookCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-5 cursor-pointer group relative overflow-hidden',
        className
      )}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${book.color}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Cover image placeholder */}
        <div 
          className="w-full aspect-[2/3] rounded-xl mb-4 overflow-hidden relative"
          style={{ backgroundColor: `${book.color}15` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 opacity-20" style={{ color: book.color }} />
          </div>
          {/* Decorative elements */}
          <div 
            className="absolute top-3 left-3 w-8 h-1 rounded-full opacity-40"
            style={{ backgroundColor: book.color }}
          />
          <div 
            className="absolute top-6 left-3 w-12 h-1 rounded-full opacity-20"
            style={{ backgroundColor: book.color }}
          />
        </div>

        {/* Book info */}
        <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-neon-blue transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-white/50 mb-3">{book.author}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <Quote className="w-3 h-3" />
            <span>{book.totalQuotes} quotes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
