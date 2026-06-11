import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Quote, Tag, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { TagChip } from '@/components/ui/custom/TagChip';
import { quotes, books, tags } from '@/data/dummyData';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const allResults = [
    ...quotes.map((q) => ({ type: 'quote' as const, ...q })),
    ...books.map((b) => ({ type: 'book' as const, ...b })),
  ];

  const filteredResults = allResults.filter((item) => {
    const matchesSearch =
      searchQuery.length === 0 ||
      ('text' in item && item.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ('title' in item && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ('author' in item && item.author.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters =
      selectedFilters.length === 0 ||
      ('tags' in item && selectedFilters.some((f) => item.tags?.includes(f)));

    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (tag: string) => {
    setSelectedFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Search Your Collection</h1>
        <p className="text-white/60">Find quotes, books, and more</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <NeonInput
          placeholder="Search quotes, books, authors..."
          icon={<Search className="w-5 h-5" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-lg py-4"
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-white/50" />
          <span className="text-sm text-white/50">Filter by tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleFilter(tag.name)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedFilters.includes(tag.name)
                  ? 'bg-neon-blue text-dark-bg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        {selectedFilters.length > 0 && (
          <button
            onClick={() => setSelectedFilters([])}
            className="mt-3 text-sm text-neon-blue hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        {searchQuery.length > 0 || selectedFilters.length > 0 ? (
          <>
            <p className="text-white/50 mb-4">
              {filteredResults.length} results found
            </p>
            <div className="space-y-3">
              {filteredResults.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {item.type === 'quote' ? (
                    <GlassCard className="group cursor-pointer hover:border-neon-blue/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                          <Quote className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white/80 mb-2 line-clamp-2">
                            "{(item as typeof quotes[0]).text}"
                          </p>
                          <div className="flex items-center gap-2 text-sm text-white/50">
                            <span>{(item as typeof quotes[0]).bookTitle}</span>
                            <span>•</span>
                            <span>{(item as typeof quotes[0]).author}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(item as typeof quotes[0]).tags.map((tag) => (
                              <TagChip key={tag} name={tag} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ) : (
                    <GlassCard className="group cursor-pointer hover:border-neon-blue/30">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${(item as typeof books[0]).color}20` }}
                        >
                          <BookOpen className="w-5 h-5" style={{ color: (item as typeof books[0]).color }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white group-hover:text-neon-blue transition-colors">
                            {(item as typeof books[0]).title}
                          </p>
                          <p className="text-sm text-white/50">{(item as typeof books[0]).author}</p>
                        </div>
                        <span className="text-sm text-white/40">
                          {(item as typeof books[0]).totalQuotes} quotes
                        </span>
                      </div>
                    </GlassCard>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <GlassCard className="text-center py-12">
            <Search className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Start searching</h3>
            <p className="text-white/50">Type a keyword or select filters to find quotes and books</p>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
