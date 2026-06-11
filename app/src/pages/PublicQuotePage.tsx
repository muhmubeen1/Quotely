import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Quote, Heart, Share2, BookOpen, ArrowLeft } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { quotes } from '@/data/dummyData';

export function PublicQuotePage() {
  const { id } = useParams<{ id: string }>();
  const quote = quotes.find((q) => q.id === id) || quotes[0];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Back Button */}
        <NavLink
          to="/quotes"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quotes
        </NavLink>

        <GlassCard className="relative overflow-hidden text-center py-16 px-8">
          {/* Background decoration */}
          <div 
            className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: quote.color }}
          />
          <div 
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: quote.color }}
          />

          {/* Quote icon */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: `${quote.color}20` }}
          >
            <Quote className="w-8 h-8" style={{ color: quote.color }} />
          </div>

          {/* Quote text */}
          <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-relaxed mb-8">
            "{quote.text}"
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="w-4 h-4 text-white/50" />
            <span className="text-white/70">{quote.bookTitle}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50">{quote.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quote.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </GlassCard>

        {/* Powered by */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-sm">
            Shared with{' '}
            <NavLink to="/" className="text-neon-blue hover:underline">
              Quotely
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
