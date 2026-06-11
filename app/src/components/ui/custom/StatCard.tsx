import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp = true, 
  color = '#00f0ff',
  className 
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6 relative overflow-hidden group',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          {trend && (
            <span className={cn(
              'text-sm font-medium',
              trendUp ? 'text-green-400' : 'text-red-400'
            )}>
              {trend}
            </span>
          )}
        </div>

        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-white/50">{title}</p>
      </div>
    </motion.div>
  );
}
