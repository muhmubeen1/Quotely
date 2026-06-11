import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Quote, Heart, Share2, Volume2 } from 'lucide-react';
import { TagChip } from './TagChip';
import type { Quote as QuoteType } from '@/types';

interface QuoteCardProps {
  quote: QuoteType;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onAudio?: (id: string) => void;
  className?: string;
}

export function QuoteCard({ quote, onFavorite, onShare, onAudio, className }: QuoteCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6 relative group',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quote icon */}
      <div 
        className="absolute top-4 right-4 opacity-20"
        style={{ color: quote.color }}
      >
        <Quote className="w-8 h-8" />
      </div>

      {/* Quote text */}
      <p className="text-lg text-white/90 leading-relaxed mb-4 pr-10">
        "{quote.text}"
      </p>

      {/* Book info */}
      <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
        <span className="font-medium text-white/70">{quote.bookTitle}</span>
        <span>•</span>
        <span>{quote.author}</span>
        {quote.page && (
          <>
            <span>•</span>
            <span>p. {quote.page}</span>
          </>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quote.tags.map((tag) => (
          <TagChip key={tag} name={tag} color={quote.color} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
        <motion.button
          onClick={() => onFavorite?.(quote.id)}
          className={cn(
            'p-2 rounded-lg transition-all duration-300',
            quote.isFavorite 
              ? 'text-red-400 bg-red-400/10' 
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={cn('w-4 h-4', quote.isFavorite && 'fill-current')} />
        </motion.button>
        
        <motion.button
          onClick={() => onShare?.(quote.id)}
          className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          onClick={() => onAudio?.(quote.id)}
          className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Volume2 className="w-4 h-4" />
        </motion.button>

        <span className="ml-auto text-xs text-white/30">
          {new Date(quote.createdAt).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
