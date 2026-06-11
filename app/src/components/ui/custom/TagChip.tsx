import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagChipProps {
  name: string;
  count?: number;
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export function TagChip({
  name,
  count,
  color = '#00f0ff',
  removable = false,
  onRemove,
  onClick,
  className,
}: TagChipProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm',
        'backdrop-blur-sm bg-white/5 border border-white/10',
        'transition-all duration-300',
        onClick && 'cursor-pointer hover:bg-white/10',
        className
      )}
      style={{
        borderColor: `${color}30`,
        color: color,
      }}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <span className="font-medium">{name}</span>
      {count !== undefined && (
        <span className="text-xs opacity-60">({count})</span>
      )}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.span>
  );
}
