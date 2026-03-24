/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Leaf, 
  Search, 
  Layout, 
  Users, 
  BookOpen, 
  MapPin, 
  Share2, 
  ChevronRight, 
  ExternalLink,
  Target,
  Globe,
  Camera,
  FileText,
  Menu,
  X,
  ArrowRight,
  Mail,
  Instagram,
  Linkedin,
  Microscope,
  Dna,
  Bug,
  Trees
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "O Projeto", href: "#projeto" },
    { name: "Eixos", href: "#eixos" },
    { name: "Área de Estudo", href: "#area" },
    { name: "Equipe", href: "#equipe" },
    { name: "Publicações", href: "#publicacoes" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Trees size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-xl leading-none tracking-tight ${isScrolled ? "text-stone-900" : "text-white"}`}>PELD PRO MATA</span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isScrolled ? "text-emerald-700" : "text-emerald-200"}`}>Rio Grande do Sul</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${isScrolled ? "text-stone-600" : "text-white/80"}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-emerald-200">
            Contato
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={isScrolled ? "text-stone-900" : "text-white"} /> : <Menu className={isScrolled ? "text-stone-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src="https://www.pucrs.br/wp-content/uploads/2017/09/12_1024x768.jpg" 
          alt="Reserva PRO MATA" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Pesquisa Ecológica de Longa Duração
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
            PELD <span className="text-emerald-400 italic">PRO MATA</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Monitorando a biodiversidade e os processos ecológicos na Reserva PRO MATA para um futuro sustentável.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 group">
              Conheça o Projeto <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-white border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Eixos de Pesquisa
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ChevronRight size={32} className="rotate-90" />
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="mb-16">
    <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${light ? "text-white" : "text-stone-900"}`}>{title}</h2>
    <div className="w-20 h-1.5 bg-emerald-600 mb-6" />
    <p className={`text-lg max-w-2xl ${light ? "text-stone-400" : "text-stone-600"}`}>{subtitle}</p>
  </div>
);

const About = () => (
  <section id="projeto" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <img src="https://www.pucrs.br/wp-content/uploads/2017/09/87_1280x1024.jpg" alt="Campo PRO MATA" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-50 rounded-[40px] -z-10 border border-emerald-100" />
          <div className="absolute top-10 -left-10 p-8 bg-white shadow-xl rounded-3xl border border-stone-100 max-w-[200px]">
            <span className="block text-4xl font-serif font-bold text-emerald-700 mb-2">20+</span>
            <span className="text-sm text-stone-500 font-medium">Anos de monitoramento contínuo</span>
          </div>
        </div>
        <div>
          <SectionHeader 
            title="O Projeto" 
            subtitle="Fortalecendo a comunicação científica e a preservação ambiental no Rio Grande do Sul." 
          />
          <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
            <p>
              O PELD PRO MATA integra a rede de Pesquisas Ecológicas de Longa Duração do Brasil, focando na Reserva PRO MATA, uma área de transição vital entre a Mata Atlântica e os Campos Sulinos.
            </p>
            <p>
              Nossa missão é gerar conhecimento científico de alta qualidade para subsidiar políticas de conservação e aproximar a sociedade da biodiversidade local através de uma linguagem clara e acessível.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Território</h4>
                  <p className="text-sm">Foco na Reserva PRO MATA (RS).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Objetivo</h4>
                  <p className="text-sm">Divulgação e transparência científica.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ResearchAxes = () => {
  const axes = [
    { title: "Plantas", icon: Trees, desc: "Monitoramento da sucessão vegetal e dinâmica florestal.", color: "bg-emerald-50 text-emerald-700" },
    { title: "Vertebrados", icon: Microscope, desc: "Estudo da fauna local, de grandes mamíferos a pequenos anfíbios.", color: "bg-stone-50 text-stone-700" },
    { title: "Artrópodes", icon: Bug, desc: "Diversidade de insetos como bioindicadores de saúde ambiental.", color: "bg-emerald-50 text-emerald-700" },
    { title: "DNA Ambiental", icon: Dna, desc: "Uso de tecnologias moleculares para detecção de biodiversidade.", color: "bg-stone-50 text-stone-700" },
  ];

  return (
    <section id="eixos" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Eixos de Pesquisa" 
          subtitle="Nossa pesquisa é dividida em quatro grandes grupos temáticos que se complementam." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {axes.map((axe, idx) => (
            <motion.div 
              key={axe.title}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[40px] border border-stone-200 flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl hover:bg-white`}
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${axe.color} shadow-sm`}>
                <axe.icon size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">{axe.title}</h3>
              <p className="text-stone-500 leading-relaxed">{axe.desc}</p>
              <button className="mt-auto text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Saiba mais <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudyArea = () => (
  <section id="area" className="py-24 bg-stone-900 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeader 
            light 
            title="Área de Estudo" 
            subtitle="A Reserva PRO MATA é o coração de nossas pesquisas, um laboratório vivo no Rio Grande do Sul." 
          />
          <div className="space-y-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-xl font-serif font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <MapPin size={20} /> Localização Estratégica
              </h4>
              <p className="text-stone-400 leading-relaxed">
                Situada em São Francisco de Paula, a reserva abrange ecossistemas de Mata de Araucária e Campos de Cima da Serra, oferecendo um gradiente ambiental único para estudos de longa duração.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src="https://www.pucrs.br/wp-content/uploads/2017/09/96_1024x768.jpg" alt="Expedição" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src="https://www.pucrs.br/wp-content/uploads/2017/09/80_1024x768.jpg" alt="Fauna" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-emerald-900/20 rounded-full absolute inset-0 blur-3xl animate-pulse" />
          <div className="relative bg-stone-800 rounded-[60px] border border-white/10 p-4 shadow-2xl">
            <img 
              src="https://www.pucrs.br/wp-content/uploads/2017/09/68_1024x768.jpg" 
              alt="Mapa PRO MATA" 
              className="w-full h-full object-cover rounded-[50px] opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce">
                <MapPin size={18} /> Pontos de Monitoramento
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => {
  const members = [
    { 
      name: "Augusto Mussi Alvim", 
      role: "Pesquisador", 
      area: "Economia Ambiental", 
      photo: "https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4723712T5" 
    },
    { 
      name: "Júlio César Bicca Marques", 
      role: "Pesquisador", 
      area: "Primatologia", 
      photo: "https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4787541Z6" 
    },
    { 
      name: "Pedro Maria de Abreu", 
      role: "Pesquisador", 
      area: "Ecologia", 
      photo: "https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4753465T7" 
    },
    { 
      name: "Eduardo Eizirik", 
      role: "Pesquisador", 
      area: "Genética e Evolução", 
      photo: "https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4792585D6" 
    },
  ];

  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Equipe" 
          subtitle="Conheça os pesquisadores e especialistas que tornam o PELD PRO MATA realidade." 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[40px] bg-stone-100 mb-6 overflow-hidden relative">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                      <Mail size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                      <Linkedin size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">{member.name}</h3>
              <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-2">{member.role}</p>
              <p className="text-stone-500 text-sm">{member.area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Publications = () => {
  const pubs = [
    { title: "Dinâmica da Mata de Araucária sob Mudanças Climáticas", journal: "Journal of Ecology", year: "2025" },
    { title: "Monitoramento de Mamíferos via Armadilhas Fotográficas", journal: "Biotropica", year: "2024" },
    { title: "DNA Ambiental: Nova Fronteira na Reserva PRO MATA", journal: "Nature Conservation", year: "2024" },
  ];

  return (
    <section id="publicacoes" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <SectionHeader 
              title="Publicações & Divulgação" 
              subtitle="Transparência e rigor científico ao alcance de todos." 
            />
            <p className="text-stone-600 mb-8 leading-relaxed">
              Acesse nossos artigos científicos, boletins informativos e materiais de educação ambiental produzidos pela equipe do PELD.
            </p>
            <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
              Ver Repositório Completo <FileText size={18} />
            </button>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {pubs.map((pub, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-emerald-300 transition-colors group">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 block">{pub.year} • {pub.journal}</span>
                  <h3 className="text-xl font-serif font-bold text-stone-800 group-hover:text-emerald-700 transition-colors">{pub.title}</h3>
                </div>
                <button className="p-4 bg-stone-50 rounded-2xl text-stone-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ExternalLink size={20} />
                </button>
              </div>
            ))}
            
            <div className="mt-12 p-10 bg-emerald-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2">Jornal do PRO MATA</h3>
                <p className="text-emerald-100/70">Nossa pesquisa em uma linguagem que você entende.</p>
              </div>
              <button className="bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full font-bold hover:bg-white transition-all">
                Assinar Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <Trees size={24} />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight">PELD PRO MATA</span>
          </div>
          <p className="text-stone-400 leading-relaxed mb-8">
            Pesquisa Ecológica de Longa Duração na Reserva PRO MATA. Ciência para a conservação da biodiversidade gaúcha.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Navegação</h4>
          <ul className="space-y-4 text-stone-400">
            <li><a href="#projeto" className="hover:text-emerald-400 transition-colors">O Projeto</a></li>
            <li><a href="#eixos" className="hover:text-emerald-400 transition-colors">Eixos de Pesquisa</a></li>
            <li><a href="#area" className="hover:text-emerald-400 transition-colors">Área de Estudo</a></li>
            <li><a href="#equipe" className="hover:text-emerald-400 transition-colors">Equipe</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Parceiros</h4>
          <ul className="space-y-4 text-stone-400">
            <li>CNPq</li>
            <li>CAPES</li>
            <li>FAPERGS</li>
            <li>PUCRS</li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Localização</h4>
          <p className="text-stone-400 leading-relaxed">
            Reserva PRO MATA<br />
            São Francisco de Paula, RS<br />
            Brasil
          </p>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm">
        <p>© 2026 PELD PRO MATA. Todos os direitos reservados.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-stone-900 selection:bg-emerald-200 selection:text-emerald-900 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <ResearchAxes />
      <StudyArea />
      <Team />
      <Publications />
      <Footer />
    </div>
  );
}
