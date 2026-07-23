import { TabId, TabItem } from '../types';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NAV_ITEMS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Ecosystem' },
  { id: 'leadership', label: 'Vision' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#0B0C10]/80 backdrop-blur-md border-b border-neutral-900/50 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between min-w-0">
        {/* Brand Wordmark */}
        <div 
          id="brand-logo"
          className="cursor-pointer flex flex-col justify-center min-w-0 pr-2"
          onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
        >
          <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-wider text-white hover:text-gold-300 transition-colors uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            ANDREW I.
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] font-mono text-gold-400 font-semibold uppercase mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
            Founder & CEO
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-5 py-2.5 text-xs tracking-widest font-mono font-medium transition-all duration-300 ${
                  isActive ? 'text-gold-300' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label.toUpperCase()}
                {isActive && (
                  <span 
                    id={`active-indicator-${item.id}`}
                    className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="header-cta-btn"
            onClick={() => setActiveTab('contact')}
            className="px-5 py-2 text-xs font-mono font-medium tracking-widest text-gold-300 hover:text-black border border-gold-500/30 hover:bg-gold-400 rounded transition-all duration-300 gold-hover-glow"
          >
            INQUIRE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0D0E12] border-b border-neutral-900 px-6 py-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-tab-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-3 text-left text-sm tracking-widest font-mono font-medium transition-all ${
                      isActive ? 'text-gold-300 pl-2 border-l-2 border-gold-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
            <div className="pt-4 border-t border-neutral-900 flex flex-col space-y-3">
              <button
                id="mobile-cta-btn"
                onClick={() => {
                  setActiveTab('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center text-xs font-mono font-medium tracking-widest text-black bg-gold-400 hover:bg-gold-300 rounded transition-colors"
              >
                INQUIRE DIRECTLY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
