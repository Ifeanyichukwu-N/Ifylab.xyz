import { useState, FormEvent } from 'react';
import { PROJECTS } from '../data';
import { ExternalLink, Mail, Send, Globe, MapPin, Building, ShieldCheck, X } from 'lucide-react';
import { ContactFormData } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data: any = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { error: text || `Server returned status code ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch your inquiry.');
      }

      setShowToast(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeToast = () => {
    setShowToast(false);
    setError(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact-section" className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 md:mb-16 space-y-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase">
          EXECUTIVE INQUIRIES
        </span>
        <h2 className="font-display font-light text-3xl sm:text-4xl text-white leading-tight">
          Connect With Our <span className="font-bold font-display gold-gradient-text">Office</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl font-light leading-relaxed">
          For strategic partnerships, corporate queries, or ecosystem collaboration, please visit the official channels or initiate an executive draft below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Ecosystem Links Only (No emails or socials) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-[#0C0D11]/60 border border-neutral-900 rounded-2xl p-5 sm:p-8 space-y-6 gold-border-glow">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                OFFICIAL ECOSYSTEM CHANNELS
              </span>
              <h3 className="font-display font-bold text-lg text-white">Ecosystem Portals</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                To guarantee secure, real-time responses and prevent impersonation, direct all core project-related queries and partnerships to our official web products:
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {PROJECTS.map((project) => (
                <a
                  key={project.id}
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block group bg-neutral-950 border border-neutral-900 p-4 rounded-xl hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-800 shrink-0">
                        <img
                          src={project.logoUrl}
                          alt={project.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-gold-300 transition-colors">
                          {project.name} Official Portal
                        </h4>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">{project.website.replace('https://', '')}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gold-400 transition-colors shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Headquarters Meta Box */}
          <div className="bg-neutral-950/40 border border-neutral-900/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-gold-400">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono tracking-widest uppercase font-semibold">Location & Presence</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-300 font-medium">Lagos, Nigeria</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Operating at the intersection of Sub-Saharan Africa's premier technology core and global blockchain networks.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Clean Executive-Style Presentation Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0C0D11]/60 border border-neutral-900 rounded-2xl p-5 sm:p-8 lg:p-10 space-y-6 gold-border-glow">
            
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-white text-lg">Inquiry Draft</h3>
              <p className="text-xs text-gray-400 font-light">Prepare a secure presentation message for the CEO's office review.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Your Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Executive Director"
                    className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 text-white rounded p-3 text-xs focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="form-company" className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Company / Protocol</label>
                  <input
                    id="form-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Decentralized Labs"
                    className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 text-white rounded p-3 text-xs focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="form-email" className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Email Address *</label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. lead@protocol.io"
                  className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 text-white rounded p-3 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="form-subject" className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Subject *</label>
                <input
                  id="form-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Strategic Multi-Chain Analytics Integration"
                  className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 text-white rounded p-3 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="form-message" className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Message Body *</label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Draft your proposal, security request, or strategic integration outline..."
                  className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 text-white rounded p-3 text-xs focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div id="contact-form-error" className="p-3 bg-red-950/20 border border-red-500/30 text-red-200 text-xs rounded font-light flex items-start gap-2.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                  <div>
                    <span className="font-semibold font-mono text-[10px] text-red-400 uppercase tracking-wider block mb-0.5">DISPATCH ERROR</span>
                    {error}
                  </div>
                </div>
              )}

              <button
                id="form-submit-btn"
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 text-xs font-mono font-semibold tracking-widest rounded flex items-center justify-center gap-2 transition-all duration-300 mt-4 cursor-pointer ${
                  isLoading 
                    ? 'bg-neutral-900 text-gray-500 border border-neutral-950 cursor-not-allowed' 
                    : 'bg-white hover:bg-gold-400 hover:text-black text-black gold-hover-glow'
                }`}
              >
                {isLoading ? (
                  <>
                    DISPATCHING... <span className="w-3.5 h-3.5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    DISPATCH INQUIRY <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* Confirmation Modal (Presentation Feedback) */}
      {showToast && (
        <div id="contact-presentation-modal" className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0C0D11] border border-gold-500/30 p-5 sm:p-8 rounded-2xl max-w-md w-full relative space-y-6 shadow-2xl">
            
            <button
              id="close-modal-btn"
              onClick={closeToast}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white bg-neutral-950 rounded-full border border-neutral-900"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-full flex items-center justify-center mx-auto shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-display font-semibold text-lg text-white">Inquiry Dispatched</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Your inquiry has been routed to the CEO's office.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-light pt-2">
                A secure transmission copy was dispatched via Resend. For immediate assistance or official ecosystem products, explore our channels:
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://www.surchi.xyz"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-gold-400 text-xs font-mono font-medium tracking-wider text-white rounded transition-all"
              >
                SURCHI (www.surchi.xyz)
              </a>
              <a
                href="https://bushguy.xyz"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-gold-400 text-xs font-mono font-medium tracking-wider text-white rounded transition-all"
              >
                BUSHGUY (bushguy.xyz)
              </a>
            </div>

            <button
              id="close-modal-footer-btn"
              onClick={closeToast}
              className="w-full py-2.5 text-center text-xs font-mono font-medium tracking-wider text-gray-400 hover:text-white border-t border-neutral-900 transition-colors pt-4 mt-2"
            >
              DISMISS NOTICE
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
