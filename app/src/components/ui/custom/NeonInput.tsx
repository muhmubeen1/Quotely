import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/70 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10',
              'text-white placeholder:text-white/30',
              'transition-all duration-300',
              'focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
              icon && 'pl-12',
              error && 'border-red-500/50 focus:border-red-500/50',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

NeonInput.displayName = 'NeonInput';
