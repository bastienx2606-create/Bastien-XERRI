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
  Globe,
  Award,
  BookOpen,
  GraduationCap,
  Instagram
} from 'lucide-react';
import { CV_DATA } from './constants';

const ProfessionalCard = ({ children, className = "", dark = false, accent = false, id = "" }: { children: React.ReactNode, className?: string, dark?: boolean, accent?: boolean, id?: string }) => (
  <motion.div 
    id={id}
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
    { name: "Réalisations", href: "#realisations" },
  ];

  const initials = CV_DATA.profile.fullName.split(' ').map(n => n[0]).join('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-600 scroll-smooth">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm' : 'bg-white py-4 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {initials}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight uppercase text-slate-900">{CV_DATA.profile.fullName}</h1>
              {CV_DATA.profile.title && (
                <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">{CV_DATA.profile.title}</p>
              )}
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

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-8 pt-32 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (4/12) */}
        <div id="profile" className="lg:col-span-4 flex flex-col gap-6">
          <ProfessionalCard className="flex-1">
            <div className="w-40 h-40 bg-slate-100 rounded-2xl mb-6 mx-auto border-4 border-white shadow-md overflow-hidden">
              <img 
                src={CV_DATA.profile.profilePic} 
                alt={CV_DATA.profile.fullName} 
                className="w-full h-full object-cover brightness-105"
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
            <div className="mt-4 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Centres d'intérêt</p>
              <div className="flex flex-wrap gap-1.5">
                {CV_DATA.interests.map((i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 border border-blue-100 text-[9px] font-bold rounded text-blue-600 uppercase tracking-tighter">{i}</span>
                ))}
              </div>
            </div>

            {/* Langues */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Langues</p>
              <div className="space-y-3">
                {CV_DATA.languages.map((lang) => (
                  <div key={lang.name} className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-700">{lang.name}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 text-slate-500 uppercase tracking-tighter">
                      {lang.level.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
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
                  {exp.link && (
                    <div className="mt-3">
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group"
                      >
                        <Globe size={12} className="group-hover:rotate-12 transition-transform" />
                        VOIR LE SITE
                      </a>
                    </div>
                  )}
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
                <div key={idx} className={`pl-3 border-l-2 relative ${idx === 0 ? 'border-blue-600' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-[10px] font-bold ${idx === 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                        {edu.period}
                      </p>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">{edu.degree}</h4>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-tighter ${edu.status === 'Diplôme obtenu' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {edu.status === 'Diplôme obtenu' ? <Award size={10} /> : <BookOpen size={10} />}
                      {edu.status}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-0.5">{edu.school}</p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{edu.info}</p>
                </div>
              ))}
            </div>
          </ProfessionalCard>
        </div>
      </main>

      {/* New Full Width Realisations Section */}
      <section id="realisations" className="max-w-7xl mx-auto w-full px-6 md:px-8 pb-24 scroll-mt-24">
        <div className="text-center mb-12">
          <SectionTitle>Réalisations</SectionTitle>
          <h3 className="text-3xl font-bold text-slate-900 mt-4 italic tracking-tight uppercase">Projets digitaux &amp; réalisations web</h3>
        </div>

        <div className="space-y-12">
          {CV_DATA.realisations.map((category, catIdx) => (
            <div key={catIdx}>
              <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 border-b border-blue-100 pb-2 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-600"></span>
                {category.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project, pIdx) => (
                  <ProfessionalCard key={pIdx} className="hover:border-blue-600/30 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{project.title}</h5>
                        {project.period && <span className="text-[9px] font-bold text-slate-400 italic">{project.period}</span>}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-6 flex-1 italic">
                        {project.description}
                      </p>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg transition-all group/btn"
                      >
                        {project.buttonText === 'Voir Instagram' ? <Instagram size={14} /> : <Globe size={14} />}
                        {project.buttonText}
                        <ExternalLink size={10} className="opacity-50 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </ProfessionalCard>
                ))}
              </div>
            </div>
          ))}
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
