import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Overview from './components/Overview';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TabId } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Smooth scroll back to top when active tab changes (multi-page feel)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex flex-col selection:bg-gold-500/20 selection:text-gold-200 overflow-x-hidden">
      
      {/* Background Decorative Mesh Gradients (Luxury corporate matte black/gold theme) */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-20%] w-[60%] h-[60%] bg-gold-600/2 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-20%] w-[60%] h-[60%] bg-amber-700/2 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Orchestrator Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Active Component Wrapper with Transitions */}
      <main className="flex-grow z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full"
          >
            {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
            {activeTab === 'projects' && <Projects />}
            {activeTab === 'leadership' && <Leadership />}
            {activeTab === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Elegant Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
