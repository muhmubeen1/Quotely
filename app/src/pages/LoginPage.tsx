import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { useAuth } from '@/hooks/useAuth'; // ⭐ ADD THIS
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Quote } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function LoginPage() {
  const { login, isLoading, error } = useAuth(); // ⭐ USE HOOK
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⭐ REAL API CALL (replaces fake setTimeout)
    try {
      await login(formData.email, formData.password);
      // Navigation happens inside hook on success
    } catch (err) {
      // Error is handled in hook, displayed below
      console.log('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Quote className="w-6 h-6 text-neon-blue" />
            </div>
            <span className="text-2xl font-bold text-white">Quotely</span>
          </NavLink>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to continue your quote collection</p>
        </div>

        <GlassCard className="!p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ⭐ ADD ERROR DISPLAY */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <NeonInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <div className="relative">
              <NeonInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock className="w-5 h-5" />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-blue focus:ring-neon-blue/50" />
                <span className="text-sm text-white/60">Remember me</span>
              </label>
              <NavLink to="/forgot-password" className="text-sm text-neon-blue hover:underline">
                Forgot password?
              </NavLink>
            </div>

            <NeonButton
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading} // ⭐ HOOK PROVIDES THIS
            >
              Sign In
            </NeonButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <NavLink to="/register" className="text-neon-blue hover:underline">
                Sign up
              </NavLink>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}