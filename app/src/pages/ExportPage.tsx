import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileType, Lock, Sparkles, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { currentUser } from '@/data/dummyData';

const exportFormats = [
  {
    id: 'txt',
    name: 'Plain Text',
    description: 'Export all quotes as a simple text file',
    icon: FileText,
    available: true,
    color: '#00f0ff',
  },
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'Beautifully formatted PDF with all your quotes',
    icon: FileType,
    available: currentUser.plan !== 'free',
    color: '#8b5cf6',
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Export as Markdown for note-taking apps',
    icon: FileText,
    available: currentUser.plan !== 'free',
    color: '#00f0ff',
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'Machine-readable format for developers',
    icon: FileType,
    available: currentUser.plan === 'premium',
    color: '#8b5cf6',
  },
];

export function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!selectedFormat) return;
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsExporting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Export Quotes</h1>
        <p className="text-white/60">Download your quote collection in various formats</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <p className="text-white/50 text-sm">Current Plan</p>
              <p className="font-semibold text-white capitalize">{currentUser.plan}</p>
            </div>
          </div>
          {currentUser.plan !== 'premium' && (
            <NeonButton variant="outline" size="sm">
              <Sparkles className="w-4 h-4" />
              Upgrade
            </NeonButton>
          )}
        </GlassCard>
      </motion.div>

      {/* Export Formats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {exportFormats.map((format, index) => (
          <motion.div
            key={format.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
          >
            <GlassCard
              className={`relative h-full ${!format.available ? 'opacity-60' : 'cursor-pointer'}`}
              onClick={() => format.available && setSelectedFormat(format.id)}
              glow={selectedFormat === format.id}
            >
              {!format.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/50 backdrop-blur-sm rounded-2xl z-10">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-sm text-white/60">Upgrade to unlock</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${format.color}20` }}
                >
                  <format.icon className="w-6 h-6" style={{ color: format.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{format.name}</h3>
                    {selectedFormat === format.id && (
                      <div className="w-5 h-5 rounded-full bg-neon-blue flex items-center justify-center">
                        <Check className="w-3 h-3 text-dark-bg" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white/50 mt-1">{format.description}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <NeonButton
          variant="primary"
          className="w-full"
          disabled={!selectedFormat}
          loading={isExporting}
          onClick={handleExport}
        >
          <Download className="w-5 h-5" />
          {isExporting ? 'Exporting...' : 'Export Quotes'}
        </NeonButton>
      </motion.div>
    </div>
  );
}
