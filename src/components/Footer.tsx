import { TabId } from '../types';
import { PROJECTS } from '../data';
import { ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-[#07080B] border-t border-neutral-900/50 py-10 sm:py-12 px-4 sm:px-6 mt-16 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 min-w-0">
        
        {/* Brand Block */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span 
            onClick={() => setActiveTab('overview')}
            className="font-display font-bold text-base tracking-wider text-white hover:text-gold-300 transition-colors uppercase cursor-pointer"
          >
            Andrew Ifeanyichukwu
          </span>
          <span className="text-[9px] tracking-[0.25em] font-mono text-gold-500 uppercase mt-1">
            Founder & CEO, SURCHI & BUSHGUY
          </span>
        </div>

        {/* Minimal Portals (Ecosystem Portal Links Only) */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono tracking-widest text-gray-500 hover:text-gold-300 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-gold-500/60" />
              {project.name.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Return to top or Meta */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-600">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </span>
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gold-400 hover:text-gold-300 rounded-lg transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
