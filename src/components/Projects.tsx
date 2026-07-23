import { PROJECTS } from '../data';
import { ExternalLink, CheckCircle2, TrendingUp, Layers, Flame, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Projects() {
  return (
    <section id="projects-section" className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Title */}
      <div className="mb-12 md:mb-16 space-y-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase">
          FOUNDED INITIATIVES
        </span>
        <h2 className="font-display font-light text-3xl sm:text-4xl text-white leading-tight">
          Active Ecosystem <span className="font-bold font-display gold-gradient-text">Portfolio</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl font-light leading-relaxed">
          Pioneering Web3 architecture through intelligence-driven DeFi automation and organic, highly cohesive communities on Solana.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="space-y-12 lg:space-y-16">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#0C0D11]/60 border border-neutral-900 rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 gold-border-glow hover:border-neutral-800 transition-all"
            >
              
              {/* Left Column: Visual Emblem Badge */}
              <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-neutral-800 p-1 bg-neutral-950/80">
                  <img
                    src={project.logoUrl}
                    alt={`${project.name} Logo`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white flex items-center justify-center lg:justify-start gap-2.5">
                    {project.name}
                    {project.id === 'surchi' ? (
                      <span className="text-[9px] font-mono tracking-widest bg-gold-500/10 text-gold-300 border border-gold-500/20 px-2 py-0.5 rounded uppercase">DeFi</span>
                    ) : (
                      <span className="text-[9px] font-mono tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">SOLANA</span>
                    )}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 mt-1">{project.website.replace('https://', '')}</p>
                </div>

                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-gold-300 hover:text-white border-b border-gold-500/20 hover:border-white pb-1 transition-all duration-300"
                >
                  VISIT WEBSITE <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Right Column: Platform Description & Executive Metrics */}
              <div className="flex-grow space-y-6">
                
                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Core Corporate Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-neutral-900 py-6">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1">
                        <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">{metric.label}</span>
                        <p className="text-xs font-medium text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Functional Highlights List */}
                {project.fullDetails && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">ECOSYSTEM ACHIEVEMENTS & FOCUS</h4>
                    <ul className="space-y-2.5">
                      {project.fullDetails.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags list */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-neutral-950 text-[10px] font-mono text-gray-400 border border-neutral-900 rounded"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Brand Vision Quote block */}
      <div className="mt-16 bg-gradient-to-r from-neutral-950 to-[#0A0B0E] border border-neutral-900 p-5 sm:p-8 rounded-2xl text-center max-w-3xl mx-auto space-y-4">
        <Globe className="w-8 h-8 text-gold-400 mx-auto" />
        <h3 className="font-display font-semibold text-lg text-white">Consolidating Utility & Narratives</h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
          "The modern digital economy thrives on two vectors: high-conviction communities and ironclad analytical infrastructure. Through SURCHI and BUSHGUY, we are building both columns on top of decentralized protocols."
        </p>
        <span className="inline-block text-[10px] font-mono tracking-widest text-gold-400 font-semibold uppercase">
          — Andrew Ifeanyichukwu, Founder & CEO
        </span>
      </div>

    </section>
  );
}
