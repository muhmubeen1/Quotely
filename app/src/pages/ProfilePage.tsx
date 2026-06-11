import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { currentUser } from '@/data/dummyData';

export function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Profile</h1>
        <p className="text-white/60">Manage your account information</p>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-3xl font-bold text-white">
              {currentUser.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center hover:shadow-neon transition-all">
              <Camera className="w-4 h-4 text-dark-bg" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-white mt-4">{currentUser.name}</h2>
          <p className="text-white/50 capitalize">{currentUser.plan} Plan</p>
        </GlassCard>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard>
          <div className="space-y-6">
            <NeonInput
              label="Full Name"
              icon={<User className="w-5 h-5" />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <NeonInput
              label="Email"
              type="email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us a bit about yourself..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)] resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <NeonButton
              variant="primary"
              className="w-full"
              onClick={handleSave}
              loading={isSaving}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassCard>
          <h3 className="font-semibold text-white mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Member since</span>
              <span className="text-white">{new Date(currentUser.joinedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Total books</span>
              <span className="text-white">{currentUser.totalBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Total quotes</span>
              <span className="text-white">{currentUser.totalQuotes}</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
