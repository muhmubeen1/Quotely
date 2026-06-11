import { motion } from 'framer-motion';
import { Tag, Hash } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { TagChip } from '@/components/ui/custom/TagChip';
import { tags, quotes } from '@/data/dummyData';

export function TagsPage() {
  const getTagQuotes = (tagName: string) => {
    return quotes.filter((q) => q.tags.includes(tagName));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Tags</h1>
        <p className="text-white/60">Organize and browse quotes by tags</p>
      </motion.div>

      {/* All Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard>
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-5 h-5 text-neon-blue" />
            <h2 className="text-lg font-semibold text-white">All Tags ({tags.length})</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <TagChip
                  name={tag.name}
                  count={tag.count}
                  color={tag.color}
                  onClick={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Popular Tags with Quotes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold text-white">Popular Tags</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tags.slice(0, 4).map((tag, index) => {
            const tagQuotes = getTagQuotes(tag.name).slice(0, 2);
            return (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tag.color}20` }}
                    >
                      <Tag className="w-5 h-5" style={{ color: tag.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">#{tag.name}</h3>
                      <p className="text-sm text-white/50">{tag.count} quotes</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {tagQuotes.map((quote) => (
                      <div
                        key={quote.id}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-white/70 line-clamp-2">"{quote.text}"</p>
                        <p className="text-xs text-white/40 mt-1">{quote.bookTitle}</p>
                      </div>
                    ))}
                    {tagQuotes.length === 0 && (
                      <p className="text-sm text-white/40 italic">No quotes with this tag</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
