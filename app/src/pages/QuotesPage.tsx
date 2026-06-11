import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { QuoteCard } from '@/components/ui/custom/QuoteCard';
import { TagChip } from '@/components/ui/custom/TagChip';
import { quotes, tags } from '@/data/dummyData';

export function QuotesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? quote.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
          <h1 className="text-3xl font-bold text-white mb-1">All Quotes</h1>
          <p className="text-white/60">{quotes.length} quotes from your collection</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all ${
              viewMode === 'grid'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all ${
              viewMode === 'list'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <NeonInput
              placeholder="Search quotes, books, or authors..."
              icon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              selectedTag === null
                ? 'bg-neon-blue text-dark-bg'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {tags.slice(0, 8).map((tag) => (
            <TagChip
              key={tag.id}
              name={tag.name}
              count={tag.count}
              color={tag.color}
              onClick={() => setSelectedTag(tag.name)}
              className={selectedTag === tag.name ? 'ring-2 ring-neon-blue' : ''}
            />
          ))}
        </div>
      </motion.div>

      {/* Quotes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredQuotes.map((quote, index) => (
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
          <div className="space-y-4">
            {filteredQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <QuoteCard quote={quote} />
              </motion.div>
            ))}
          </div>
        )}

        {filteredQuotes.length === 0 && (
          <GlassCard className="text-center py-12">
            <p className="text-white/50">No quotes found matching your criteria</p>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
