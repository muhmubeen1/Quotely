import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { useAuth } from '@/hooks/useAuth'; // ⭐ ADD THIS
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Quote, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // ⭐ Removed useNavigate (not needed)

export function RegisterPage() {
  const { register, isLoading, error } = useAuth(); // ⭐ USE HOOK
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⭐ REAL API CALL (replaces fake setTimeout)
    try {
      await register(formData.name, formData.email, formData.password);
      // Navigation happens inside hook on success
    } catch (err) {
      // Error is handled in hook, displayed below
      console.log('Registration failed');
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/60">Start capturing quotes that matter</p>
        </div>

        <GlassCard className="!p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ⭐ ADD ERROR DISPLAY */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <NeonInput
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              icon={<User className="w-5 h-5" />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

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
                placeholder="Create a password"
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

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-neon-blue focus:ring-neon-blue/50"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                required
              />
              <span className="text-sm text-white/60">
                I agree to the{' '}
                <NavLink to="/terms" className="text-neon-blue hover:underline">
                  Terms of Service
                </NavLink>{' '}
                and{' '}
                <NavLink to="/privacy" className="text-neon-blue hover:underline">
                  Privacy Policy
                </NavLink>
              </span>
            </label>

            <NeonButton
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading} // ⭐ HOOK PROVIDES THIS
            >
              Create Account
            </NeonButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <NavLink to="/login" className="text-neon-blue hover:underline">
                Sign in
              </NavLink>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}