import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { QuoteCard } from '@/components/ui/custom/QuoteCard';
import { quotes } from '@/data/dummyData';

export function FavoritesPage() {
  const favoriteQuotes = quotes.filter((q) => q.isFavorite);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Favorites</h1>
          <p className="text-white/60">{favoriteQuotes.length} saved quotes</p>
        </div>
      </motion.div>

      {/* Quotes Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {favoriteQuotes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {favoriteQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <QuoteCard quote={quote} />
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="text-center py-16">
            <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
            <p className="text-white/50 max-w-md mx-auto">
              Start adding quotes to your favorites by clicking the heart icon on any quote card.
            </p>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
