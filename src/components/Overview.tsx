import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FOUNDER_INFO } from '../data';
import { ArrowRight, Clock, MapPin, Award, ShieldCheck, Zap } from 'lucide-react';
import { TabId } from '../types';

interface OverviewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function Overview({ setActiveTab }: OverviewProps) {
  const [lagosTime, setLagosTime] = useState<string>('');

  // Update Lagos, Nigeria Clock (WAT - UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const lagosOffset = 1; // UTC+1
      const lagosDate = new Date(utc + (3600000 * lagosOffset));
      
      const hours = String(lagosDate.getHours()).padStart(2, '0');
      const minutes = String(lagosDate.getMinutes()).padStart(2, '0');
      const seconds = String(lagosDate.getSeconds()).padStart(2, '0');
      
      setLagosTime(`${hours}:${minutes}:${seconds} WAT`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview-section" className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Professional Profile Content */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Tag and Local Time */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="w-fit px-3.5 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-full text-[11px] font-mono font-medium tracking-widest text-gold-300 uppercase flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              EXECUTIVE PORTFOLIO
            </span>
            <span className="w-fit px-3.5 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-full text-[11px] font-mono text-gray-400 flex items-center gap-2 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-gold-500" />
              LAGOS OFFICE: <span className="font-semibold text-white font-mono">{lagosTime || '12:00:00 WAT'}</span>
            </span>
          </div>

          {/* Heading & Executive Subtitle */}
          <div className="space-y-3 sm:space-y-4 pt-1">
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] tracking-tight">
              Building Intelligent <br className="hidden sm:inline" />
              <span className="font-bold gold-gradient-text block sm:inline mt-1 sm:mt-0">
                Blockchain Infrastructure
              </span>
            </h1>
            <p className="font-mono text-xs sm:text-sm font-semibold text-gold-400/90 tracking-[0.2em] uppercase pt-0.5">
              Founder & CEO, SURCHI
            </p>
          </div>

          {/* Core Biography paragraph */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            {FOUNDER_INFO.bio}
          </p>

          {/* Signature Quote */}
          <div className="border-l-2 border-gold-500/40 pl-6 py-2 bg-gradient-to-r from-gold-500/5 to-transparent rounded-r-lg">
            <p className="italic text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              "{FOUNDER_INFO.signatureQuote}"
            </p>
            <span className="block mt-2 text-[11px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
              — FOUNDER'S ETHOS
            </span>
          </div>

          {/* Quick Metrics / Action */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              id="cta-projects"
              onClick={() => setActiveTab('projects')}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gold-100 text-black text-xs font-mono font-semibold tracking-widest rounded flex items-center justify-center gap-2 transition-all duration-300 gold-hover-glow cursor-pointer"
            >
              EXPLORE ECOSYSTEM <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="cta-contact"
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto px-6 py-3 border border-neutral-800 hover:border-gold-500/50 text-white text-xs font-mono font-medium tracking-widest rounded flex items-center justify-center transition-colors cursor-pointer"
            >
              CONTACT INQUIRY
            </button>
          </div>

        </div>

        {/* Right Side: High-End Avatar Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-[380px]">
            {/* Background luxury gold-glow elements */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-600 via-gold-300 to-amber-700 rounded-2xl opacity-10 blur group-hover:opacity-20 transition duration-1000" />
            
            <div className="relative bg-[#0D0E12] border border-neutral-800 p-3 rounded-2xl gold-border-glow">
              {/* Profile Image with absolute referrer policy */}
              <div className="overflow-hidden rounded-xl aspect-[3/4] bg-neutral-900 relative">
                <img
                  src={FOUNDER_INFO.avatarUrl}
                  alt={FOUNDER_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.03]"
                />
                
                {/* Overlay Location tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-800 py-2 px-4 rounded-lg flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-medium">Headquarters</span>
                  <span className="text-xs font-medium text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    Lagos, NG
                  </span>
                </div>
              </div>

              {/* CEO metadata footer below image */}
              <div className="mt-4 pt-3 border-t border-neutral-900/80 flex justify-between items-center px-2">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">Andrew Ifeanyichukwu</h4>
                  <p className="text-[10px] font-mono text-gold-400">FOUNDER & CEO, SURCHI</p>
                </div>
                <div className="bg-gold-500/10 border border-gold-500/20 text-gold-300 p-1.5 rounded-lg">
                  <Award className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Featured Under-Banner Metrics Bar */}
      <div className="mt-20 pt-10 border-t border-neutral-900/60 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0C0D11]/40 border border-neutral-900 p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-neutral-950 border border-neutral-800 text-gold-400 rounded-lg shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base">SURCHI DeFi Intelligence</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Consolidating multi-chain analytics, threat levels, and wallet forensics with advanced AI models.
            </p>
          </div>
        </div>
        <div className="bg-[#0C0D11]/40 border border-neutral-900 p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-neutral-950 border border-neutral-800 text-gold-400 rounded-lg shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base">Community Cohesion</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              BUSHGUY coin leading organic Solana narratives with wilderness-inspired community building.
            </p>
          </div>
        </div>
        <div className="bg-[#0C0D11]/40 border border-neutral-900 p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-neutral-950 border border-neutral-800 text-gold-400 rounded-lg shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base">Global Innovation</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Nigeria's tech landscape bridging the decentralized future with raw strategic project execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
