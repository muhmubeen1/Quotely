import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Camera, 
  Tags, 
  Search, 
  Share2, 
  Volume2, 
  Cloud,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import { Scene3D } from '@/components/3d/Scene3D';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { features, testimonials } from '@/data/dummyData';

const iconMap: Record<string, typeof Camera> = {
  Camera,
  Tags,
  Search,
  Share2,
  Volume2,
  Cloud,
};

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D className="w-full h-full" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                <span className="text-sm text-white/70">Now with AI-powered OCR</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Capture Quotes{' '}
                <span className="gradient-text">That Matter</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-white/60 mb-8 max-w-lg"
              >
                Save, organize, and revisit your favorite quotes from books, articles, 
                and anywhere else. Your personal knowledge library, beautifully organized.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <NavLink to="/register">
                  <NeonButton variant="primary" size="lg">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </NavLink>
                <NavLink to="/pricing">
                  <NeonButton variant="outline" size="lg">
                    View Pricing
                  </NeonButton>
                </NavLink>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-8 mt-12"
              >
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-sm text-white/50">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">500K+</p>
                  <p className="text-sm text-white/50">Quotes Saved</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-sm text-white/50">Books Tracked</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right content - 3D scene placeholder for mobile */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Capture Wisdom</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Powerful features designed for readers who want to preserve and organize 
              the knowledge they discover.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Quote;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full" glow>
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by <span className="gradient-text">Readers</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              See what our community has to say about their experience with Quotely.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="text-center py-16 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Start Your{' '}
                  <span className="gradient-text">Quote Collection</span>?
                </h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  Join thousands of readers who are already capturing and organizing 
                  their favorite quotes with Quotely.
                </p>
                <NavLink to="/register">
                  <NeonButton variant="primary" size="lg">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </NavLink>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                <Quote className="w-4 h-4 text-neon-blue" />
              </div>
              <span className="text-lg font-bold text-white">Quotely</span>
            </div>
            <p className="text-white/40 text-sm">
              © 2024 Quotely. All rights reserved.
            </p>
            <div className="flex gap-6">
              <NavLink to="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">
                Pricing
              </NavLink>
              <NavLink to="/login" className="text-sm text-white/40 hover:text-white transition-colors">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
