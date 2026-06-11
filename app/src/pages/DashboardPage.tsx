// src/pages/Dashboard.tsx
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Heart,
  Plus,
  Quote,
  TrendingUp
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { QuoteCard } from '@/components/ui/custom/QuoteCard';
import { StatCard } from '@/components/ui/custom/StatCard';

import { useAuth } from '@/hooks/useAuth';
import { useReading } from '@/hooks/useReading';
import { useEffect } from 'react';

export function DashboardPage() {
  const { user } = useAuth();
  const { dashboard, isLoading, error, fetchDashboard } = useReading();

  // Refresh data when component mounts
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading your wisdom vault...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">Error: {error}</div>;
  }

  const stats = dashboard?.stats || {};
  const recentQuotes = dashboard?.recentQuotes || [];
  const recentBooks = dashboard?.recentBooks || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome back, {user?.name?.split(' ')[0] || 'Reader'}!
          </h1>
          <p className="text-white/60">
            Here's what's happening with your quote collection
          </p>
        </div>
        <NavLink to="/books">
          <NeonButton variant="primary">
            <Plus className="w-4 h-4" />
            Add Book
          </NeonButton>
        </NavLink>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Books"
          value={stats.totalBooks || 0}
          icon={BookOpen}
          trend="+2 this month"
          trendUp={true}
          color="#00f0ff"
        />
        <StatCard
          title="Total Quotes"
          value={stats.totalQuotes || 0}
          icon={Quote}
          trend="+12 this week"
          trendUp={true}
          color="#8b5cf6"
        />
        <StatCard
          title="Favorites"
          value={stats.totalFavorites || 0}
          icon={Heart}
          trend="+5 this month"
          trendUp={true}
          color="#00f0ff"
        />
        <StatCard
          title="Reading Streak"
          value={`${stats.currentStreak || 0} days`}
          icon={TrendingUp}
          trend="Keep it up!"
          trendUp={true}
          color="#8b5cf6"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Quotes</h2>
            <NavLink to="/quotes" className="text-neon-blue text-sm hover:underline flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
          <div className="grid gap-4">
            {recentQuotes.length > 0 ? (
              recentQuotes.slice(0, 3).map((quote: any) => (
                <QuoteCard
                  key={quote.id}
                  quote={{
                    ...quote,
                    book_title: quote.book_title || quote.bookTitle,
                    author: quote.book_author || quote.author
                  }}
                />
              ))
            ) : (
              <GlassCard className="p-8 text-center">
                <p className="text-white/60">No quotes yet. Start adding some!</p>
              </GlassCard>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Books */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Books</h2>
              <NavLink to="/books" className="text-neon-blue text-sm hover:underline flex items-center gap-1">
                View all
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
            <GlassCard className="!p-4">
              <div className="space-y-3">
                {recentBooks.length > 0 ? (
                  recentBooks.map((book: any) => (
                    <NavLink
                      key={book.id}
                      to={`/books/${book.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-10 h-14 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-white/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate group-hover:text-neon-blue transition-colors">
                          {book.title}
                        </p>
                        <p className="text-sm text-white/50">{book.author}</p>
                      </div>
                      <span className="text-xs text-white/40">{book.total_quotes || 0} quotes</span>
                    </NavLink>
                  ))
                ) : (
                  <p className="text-white/50 text-center py-4">No books added yet</p>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Recent Activity - Keeping dummy for now (can improve later) */}
          {/* You can leave this section as is for now if you want */}
        </motion.div>
      </div>
    </div>
  );
}