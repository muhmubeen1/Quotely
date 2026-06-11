import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, glow = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:bg-white/10 hover:border-white/20',
        glow && 'hover:shadow-neon hover:border-neon-blue/50',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
