import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CreditCard, Calendar, Check, Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { currentUser, pricingPlans } from '@/data/dummyData';

export function SubscriptionPage() {
  const currentPlan = pricingPlans.find((p) => p.id === currentUser.plan);
  const nextPlan = pricingPlans.find((p) => {
    if (currentUser.plan === 'free') return p.id === 'pro';
    if (currentUser.plan === 'pro') return p.id === 'premium';
    return null;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Subscription</h1>
        <p className="text-white/60">Manage your plan and billing</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Current Plan</p>
                <h2 className="text-2xl font-bold text-white capitalize">{currentUser.plan}</h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Billing period</span>
                </div>
                <p className="text-white font-medium">Monthly</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Next billing date</span>
                </div>
                <p className="text-white font-medium">April 15, 2024</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <NeonButton variant="outline" size="sm">
                Manage Payment
              </NeonButton>
              <NeonButton variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                Cancel Subscription
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Plan Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard>
          <h3 className="font-semibold text-white mb-4">Your Plan Includes</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {currentPlan?.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-neon-blue" />
                </div>
                <span className="text-white/70 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Upgrade CTA */}
      {nextPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="relative overflow-hidden border-neon-purple/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Upgrade to {nextPlan.name}</h3>
                  <p className="text-white/50 text-sm">Unlock more features</p>
                </div>
              </div>
              <NavLink to="/pricing">
                <NeonButton variant="primary">
                  Upgrade Now
                  <ArrowRight className="w-4 h-4" />
                </NeonButton>
              </NavLink>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
        <div className="space-y-2">
          {[
            { date: 'Mar 15, 2024', amount: '$9.00', status: 'Paid' },
            { date: 'Feb 15, 2024', amount: '$9.00', status: 'Paid' },
            { date: 'Jan 15, 2024', amount: '$9.00', status: 'Paid' },
          ].map((invoice, index) => (
            <GlassCard key={index} className="!p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Pro Plan - Monthly</p>
                  <p className="text-sm text-white/50">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{invoice.amount}</p>
                  <span className="text-xs text-green-400">{invoice.status}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
