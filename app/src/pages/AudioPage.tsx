import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Headphones } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { audioItems } from '@/data/dummyData';

export function AudioPage() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const track = audioItems[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev === 0 ? audioItems.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === audioItems.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Audio Player</h1>
        <p className="text-white/60">Listen to your quotes with text-to-speech</p>
      </motion.div>

      {/* Main Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Now Playing */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-2xl bg-neon-blue/20 flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-12 h-12 text-neon-blue" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 max-w-lg mx-auto">
                "{track.quoteText}"
              </h2>
              <p className="text-white/50">{track.bookTitle}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neon-blue transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>{formatTime(Math.floor((progress / 100) * track.duration))}</span>
                <span>{formatTime(track.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handlePrevious}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipBack className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center hover:shadow-neon transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-dark-bg" />
                ) : (
                  <Play className="w-8 h-8 text-dark-bg ml-1" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipForward className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/50 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/50 transition-all"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Playlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Playlist</h2>
        <div className="space-y-2">
          {audioItems.map((item, index) => (
            <GlassCard
              key={item.id}
              className={`!p-4 cursor-pointer ${
                currentTrack === index ? 'border-neon-blue/50' : ''
              }`}
              onClick={() => {
                setCurrentTrack(index);
                setProgress(0);
              }}
              hover
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentTrack === index ? 'bg-neon-blue/20' : 'bg-white/5'
                  }`}
                >
                  {currentTrack === index && isPlaying ? (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-4 bg-neon-blue animate-pulse" />
                      <div className="w-1 h-4 bg-neon-blue animate-pulse animation-delay-100" />
                      <div className="w-1 h-4 bg-neon-blue animate-pulse animation-delay-200" />
                    </div>
                  ) : (
                    <Play className="w-4 h-4 text-white/50" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate">"{item.quoteText}"</p>
                  <p className="text-sm text-white/50">{item.bookTitle}</p>
                </div>
                <span className="text-sm text-white/40">{formatTime(item.duration)}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
