import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Globe, Shield, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { Switch } from '@/components/ui/switch';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    emailUpdates: false,
    publicProfile: false,
    autoSave: true,
    compactView: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingGroups = [
    {
      title: 'Appearance',
      icon: settings.darkMode ? Moon : Sun,
      settings: [
        {
          key: 'darkMode' as const,
          label: 'Dark Mode',
          description: 'Use dark theme throughout the app',
        },
        {
          key: 'compactView' as const,
          label: 'Compact View',
          description: 'Show more content with less spacing',
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications' as const,
          label: 'Push Notifications',
          description: 'Receive notifications about your quotes',
        },
        {
          key: 'emailUpdates' as const,
          label: 'Email Updates',
          description: 'Get weekly summary emails',
        },
      ],
    },
    {
      title: 'Privacy',
      icon: Shield,
      settings: [
        {
          key: 'publicProfile' as const,
          label: 'Public Profile',
          description: 'Allow others to see your public quotes',
        },
        {
          key: 'autoSave' as const,
          label: 'Auto-save',
          description: 'Automatically save changes',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/60">Customize your experience</p>
      </motion.div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + groupIndex * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-neon-blue" />
                </div>
                <h2 className="text-lg font-semibold text-white">{group.title}</h2>
              </div>

              <div className="space-y-6">
                {group.settings.map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{setting.label}</p>
                      <p className="text-sm text-white/50">{setting.description}</p>
                    </div>
                    <Switch
                      checked={settings[setting.key]}
                      onCheckedChange={() => toggleSetting(setting.key)}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-neon-purple" />
            </div>
            <h2 className="text-lg font-semibold text-white">Language</h2>
          </div>
          <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-neon-blue/50">
            <option value="en" className="bg-dark-card">English</option>
            <option value="es" className="bg-dark-card">Spanish</option>
            <option value="fr" className="bg-dark-card">French</option>
            <option value="de" className="bg-dark-card">German</option>
          </select>
        </GlassCard>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GlassCard className="border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Export All Data</p>
                <p className="text-sm text-white/50">Download a copy of all your data</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
                Export
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="font-medium text-red-400">Delete Account</p>
                <p className="text-sm text-white/50">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
