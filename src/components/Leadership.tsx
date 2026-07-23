import { FOUNDER_INFO } from '../data';
import { Lightbulb, Users, BarChart3, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Leadership() {
  return (
    <section id="leadership-section" className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 md:mb-16 space-y-3 max-w-2xl">
        <span className="text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase">
          STRATEGIC DIRECTION
        </span>
        <h2 className="font-display font-light text-3xl sm:text-4xl text-white leading-tight">
          Executive Leadership & <span className="font-bold font-display gold-gradient-text">Core Pillars</span>
        </h2>
        <p className="text-gray-400 text-sm font-light leading-relaxed">
          Aligning intelligent automated blockchain analytics with strategic community design to foster transparent and accessible multi-chain protocols.
        </p>
      </div>

      {/* Grid of Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {FOUNDER_INFO.leadershipPillars.map((pillar, index) => {
          return (
            <motion.div
              key={pillar.metric}
              id={`pillar-card-${pillar.metric}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#0C0D11]/60 border border-neutral-900 rounded-2xl p-5 sm:p-8 flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300 gold-border-glow group"
            >
              <div className="space-y-6">
                {/* Large Gold Number Metric */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gold-400 to-amber-700">
                    {pillar.metric}
                  </span>
                  {index === 0 && <Lightbulb className="w-5 h-5 text-gold-400/80 group-hover:text-gold-300 transition-colors" />}
                  {index === 1 && <Users className="w-5 h-5 text-gold-400/80 group-hover:text-gold-300 transition-colors" />}
                  {index === 2 && <BarChart3 className="w-5 h-5 text-gold-400/80 group-hover:text-gold-300 transition-colors" />}
                </div>

                {/* Pillar Title */}
                <h3 className="font-display font-bold text-lg text-white group-hover:text-gold-300 transition-colors">
                  {pillar.title}
                </h3>

                {/* Pillar Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              {/* Read Accent */}
              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-gold-400 transition-colors">
                <span>OPERATIONAL PILLAR</span>
                <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CEO's Extended Vision Statement Card */}
      <div className="mt-16 bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-gold-400">
            <Award className="w-5 h-5" />
            <span className="text-xs font-mono tracking-widest uppercase font-semibold">Founder's Narrative</span>
          </div>
          <h3 className="font-display font-semibold text-xl text-white">Laying foundations for decentralized access.</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
            Andrew Ifeanyichukwu's work is driven by a deep conviction that multi-chain utility shouldn't be gated behind complex command lines or expert trading tools. By integrating intelligent agent models directly with community products, Andrew's initiatives are working to make modern decentralized finance intuitive and accessible to the next wave of global internet citizens.
          </p>
        </div>
        
        {/* Visual Box with Refined Statistics */}
        <div className="border border-neutral-900 bg-neutral-950 p-5 sm:p-6 rounded-xl w-full md:w-[280px] shrink-0 space-y-4">
          <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase block">Founder's Commitment</span>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="text-xs text-gray-400">Target Ecosystems</span>
              <span className="text-xs font-mono font-medium text-white">Solana & EVM</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="text-xs text-gray-400">AI Architecture</span>
              <span className="text-xs font-mono font-medium text-white">DeFi Analytics</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Strategic Philosophy</span>
              <span className="text-xs font-mono font-medium text-white">Raw Execution</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
