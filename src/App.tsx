/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X,
  Send,
} from 'lucide-react';
import { CV_DATA } from './constants';

const ProfessionalCard = ({ children, className = "", dark = false, accent = false }: { children: React.ReactNode, className?: string, dark?: boolean, accent?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-6 rounded-xl shadow-sm border transition-all duration-300 ${
      dark ? 'bg-slate-900 text-white border-slate-800 shadow-lg' : 
      accent ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 
      'bg-white text-slate-800 border-slate-200'
    } ${className}`}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, light = false }: { children: React.ReactNode, light?: boolean }) => (
  <h2 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${light ? 'text-blue-400' : 'text-slate-400'}`}>
    {!light && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
    {children}
  </h2>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Profil", href: "#profile" },
    { name: "Expériences", href: "#experience" },
    { name: "Réalisations", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const initials = CV_DATA.profile.fullName.split(' ').map(n => n[0]).join('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm' : 'bg-white py-4 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {initials}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight uppercase text-slate-900">{CV_DATA.profile.fullName}</h1>
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">{CV_DATA.profile.title}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 py-1">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href="mailto:bastienx2606@gmail.com"
                className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded shadow-sm hover:bg-slate-800 transition-all uppercase tracking-tight"
              >
                CONTACT EMAIL
              </a>
            </div>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-900">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-slate-600"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (4/12) */}
        <div id="profile" className="lg:col-span-4 flex flex-col gap-6">
          <ProfessionalCard className="flex-1">
            <div className="w-40 h-40 bg-slate-100 rounded-2xl mb-6 mx-auto border-4 border-white shadow-md overflow-hidden">
              <img 
                src={CV_DATA.profile.profilePic} 
                alt={CV_DATA.profile.fullName} 
                className="w-full h-full object-cover grayscale brightness-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3 uppercase tracking-tight italic">À propos</h2>
            <p className="text-sm leading-relaxed text-slate-600 mb-6">
              {CV_DATA.profile.about}
            </p>
            <div className="space-y-4">
              {[
                { icon: <Mail size={14} />, text: CV_DATA.profile.email, href: `mailto:${CV_DATA.profile.email}` },
                { icon: <Phone size={14} />, text: CV_DATA.profile.phone, href: `tel:${CV_DATA.profile.phone.replace(/\s/g, '')}` },
                { icon: <Linkedin size={14} />, text: "Profil LinkedIn", href: CV_DATA.profile.linkedin },
                { icon: <MapPin size={14} />, text: CV_DATA.profile.location, href: undefined },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="hover:text-blue-600 transition-colors">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Permis */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Permis</p>
              <div className="flex flex-wrap gap-1.5">
                {CV_DATA.permits.map((p) => (
                  <span key={p} className="px-2 py-1 bg-slate-50 border border-slate-100 text-[9px] font-bold rounded text-slate-600 uppercase tracking-tighter">{p}</span>
                ))}
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Centres d'intérêt</p>
              <div className="flex flex-wrap gap-1.5">
                {CV_DATA.interests.map((i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 border border-blue-100 text-[9px] font-bold rounded text-blue-600 uppercase tracking-tighter">{i}</span>
                ))}
              </div>
            </div>
          </ProfessionalCard>

          <ProfessionalCard dark>
            <SectionTitle light>Langues</SectionTitle>
            <div className="space-y-5">
              {CV_DATA.languages.map((lang) => (
                <div key={lang.name} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{lang.name}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${lang.name === 'Français' ? 'bg-blue-600 border-blue-500' : 'border-slate-700'}`}>
                    {lang.level.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </ProfessionalCard>
        </div>

        {/* Center Column (5/12) */}
        <div id="experience" className="lg:col-span-5 flex flex-col gap-6">
          <ProfessionalCard className="flex-1">
            <SectionTitle>EXPÉRIENCES PROFESSIONNELLES</SectionTitle>
            <div className="space-y-8 mt-6">
              {CV_DATA.experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-7 border-l-2 border-slate-100">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 rounded-full ${idx === 0 ? 'border-blue-600' : 'border-slate-300'}`}></div>
                  <div className="flex justify-between text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-tighter">
                    <span>{exp.period}</span>
                    <span className="text-slate-400">CÔTE D'AZUR</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{exp.role}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-2 italic">{exp.company}</p>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 list-none">
                    {exp.description.split('.').filter(s => s.trim()).map((sentence, sIdx) => (
                      <li key={sIdx} className="flex gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{sentence.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ProfessionalCard>

          <ProfessionalCard accent id="projects">
            <SectionTitle light>Réalisations &amp; Projets</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {CV_DATA.projects.map((project, idx) => (
                <div key={idx} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                  <p className="text-[9px] font-bold text-blue-200 mb-1 uppercase tracking-widest">{project.tags[0]}</p>
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                    {project.title}
                    <ExternalLink size={10} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[10px] text-blue-100 leading-tight opacity-80 italic line-clamp-2">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </ProfessionalCard>
        </div>

        {/* Right Column (3/12) */}
        <div id="skills" className="lg:col-span-3 flex flex-col gap-6">
          <ProfessionalCard>
            <SectionTitle>Compétences</SectionTitle>
            <div className="space-y-6">
              {CV_DATA.skillGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="text-[10px] font-bold text-slate-900 mb-3 uppercase tracking-tighter border-b border-slate-100 pb-1">{group.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-50 border border-slate-100 text-[9px] font-bold rounded text-slate-600 uppercase tracking-tighter">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ProfessionalCard>

          <ProfessionalCard className="flex-1">
            <SectionTitle>Formation</SectionTitle>
            <div className="space-y-6 mt-4">
              {CV_DATA.education.map((edu, idx) => (
                <div key={idx} className={`pl-3 border-l-2 ${idx === 0 ? 'border-blue-600' : 'border-slate-200'}`}>
                  <p className={`text-[10px] font-bold ${idx === 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                    {edu.period}
                  </p>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">{edu.degree}</h4>
                  <p className="text-[10px] text-slate-500 italic mt-0.5">{edu.school}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{edu.info}</p>
                </div>
              ))}
            </div>
          </ProfessionalCard>

          {/* Contact Trigger */}
          <a href="#contact" className="bg-slate-200 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-300 transition-all">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight italic">Prêt pour un échange ?</span>
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ChevronRight size={18} />
            </div>
          </a>
        </div>
      </main>

      {/* Contact Section (Full Width below grid) */}
      <section id="contact" className="bg-white border-t border-slate-200 py-20 px-6">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
              <SectionTitle>TRAVAILLONS ENSEMBLE</SectionTitle>
              <h3 className="text-3xl font-bold text-slate-900 mt-4 italic tracking-tight">Démarrez une conversation aujourd'hui</h3>
              <p className="text-slate-500 text-sm mt-3">
                Contactez-moi par email à{' '}
                <a href="mailto:bastienx2606@gmail.com" className="text-blue-600 font-semibold hover:underline">
                  bastienx2606@gmail.com
                </a>{' '}
                ou au <a href="tel:0699722074" className="text-blue-600 font-semibold hover:underline">06 99 72 20 74</a>
              </p>
           </div>
           
           <ProfessionalCard className="max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom complet</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder="Jean Dupont" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder="votre@email.com" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                   <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none" placeholder="Votre message..." />
                </div>
                <a
                  href="mailto:bastienx2606@gmail.com"
                  className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black hover:shadow-xl transition-all group"
                >
                  Envoyer un email <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
             </form>
           </ProfessionalCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 px-8 py-6 text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200">
        <p className="uppercase font-bold tracking-tight">© 2026 {CV_DATA.profile.fullName} — CV DIGITAL</p>
        <p className="uppercase font-bold text-blue-600 tracking-widest">OUVERT AUX OPPORTUNITÉS EN ALTERNANCE &amp; STAGE</p>
      </footer>
    </div>
  );
}

