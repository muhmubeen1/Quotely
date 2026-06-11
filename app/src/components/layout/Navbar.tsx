import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Quote, Menu, X } from 'lucide-react';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/pricing', label: 'Pricing' },
];

export function Navbar({ isMenuOpen, onMenuToggle }: NavbarProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-4 mt-4 px-6 py-4 glass-card-strong rounded-2xl border border-white/10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Quote className="w-5 h-5 text-neon-blue" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">Quotely</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-neon-blue' : 'text-white/70 hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <NavLink to="/login" className="hidden sm:block">
              <NeonButton variant="ghost" size="sm">
                Login
              </NeonButton>
            </NavLink>
            <NavLink to="/register" className="hidden sm:block">
              <NeonButton variant="primary" size="sm">
                Get Started
              </NeonButton>
            </NavLink>

            {/* Mobile menu toggle */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onMenuToggle}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-neon-blue bg-neon-blue/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-white/10">
                <NavLink to="/login" className="flex-1" onClick={onMenuToggle}>
                  <NeonButton variant="outline" size="sm" className="w-full">
                    Login
                  </NeonButton>
                </NavLink>
                <NavLink to="/register" className="flex-1" onClick={onMenuToggle}>
                  <NeonButton variant="primary" size="sm" className="w-full">
                    Get Started
                  </NeonButton>
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
