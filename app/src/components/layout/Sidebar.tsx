import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Quote,
  Search,
  Tags,
  Heart,
  Download,
  Camera,
  Volume2,
  User,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { currentUser } from '@/data/dummyData';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/books', label: 'Books', icon: BookOpen },
  { path: '/quotes', label: 'Quotes', icon: Quote },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/tags', label: 'Tags', icon: Tags },
  { path: '/favorites', label: 'Favorites', icon: Heart },
  { path: '/export', label: 'Export', icon: Download },
  { path: '/scan', label: 'OCR Scan', icon: Camera },
  { path: '/audio', label: 'Audio', icon: Volume2 },
];

const accountItems = [
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/subscription', label: 'Subscription', icon: CreditCard },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-card"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed left-0 top-0 h-full z-40',
          'glass-card-strong border-r border-white/10',
          'flex flex-col',
          'transition-all duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64 lg:w-72'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Quote className="w-5 h-5 text-neon-blue" />
            </div>
            <span className="text-xl font-bold text-white">Quotely</span>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
          <div className="mb-6">
            <p className="px-4 text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
              Main
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path ||
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onToggle()}
                    className={cn(
                      'sidebar-item',
                      isActive && 'active'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-4 text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
              Account
            </p>
            <nav className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onToggle()}
                    className={cn(
                      'sidebar-item',
                      isActive && 'active'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-semibold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-white/50 capitalize">{currentUser.plan} Plan</p>
            </div>
          </div>
          <button className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-400/10">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
