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
  Youtube,
  Play,
  Microscope,
  Dna,
  Bug,
  Trees,
  HelpCircle,
  FlaskConical
} from "lucide-react";

// --- Components ---

const Navbar = ({ onPageChange, currentPage }: { onPageChange: (page: string) => void, currentPage: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = currentPage === 'home';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "O Projeto", href: "#projeto", internal: true },
    { name: "Grupos de Trabalho", href: "#eixos", internal: true },
    { name: "Área de Estudo", href: "#area", internal: true },
    { name: "Publicações", href: "#publicacoes", internal: true },
    { name: "Galeria", href: "galeria", internal: false },
  ];

  const handleNavClick = (link: { name: string, href: string, internal: boolean }) => {
    if (link.internal) {
      onPageChange('home');
      // Small timeout to allow Home to render if we were on another page
      setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      onPageChange(link.href);
    }
    setIsMenuOpen(false);
  };

  const navBgClass = (isScrolled || !isHome) ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6";
  const brandTextClass = (isScrolled || !isHome) ? "text-stone-900" : "text-white";
  const linkTextClass = (isScrolled || !isHome) ? "text-stone-600" : "text-white/80";
  const toggleColorClass = (isScrolled || !isHome) ? "text-stone-900" : "text-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onPageChange('home')}
        >
          <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
            <img 
              src="https://lh3.googleusercontent.com/d/1UMLUAQxifw2ryXmLfVFSZjd8LPKqM81O" 
              alt="PELD PROM Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-xl leading-none tracking-tight ${brandTextClass}`}>PELD PROM</span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isScrolled || !isHome ? "text-emerald-700" : "text-emerald-200"}`}>Rio Grande do Sul</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link)}
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${linkTextClass}`}
            >
              {link.name}
            </button>
          ))}
          <a href="mailto:eduardo.eizirik@pucrs.br" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-emerald-200">
            Contato
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={toggleColorClass} /> : <Menu className={toggleColorClass} />}
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
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link)}
                  className="text-left text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-2"
                >
                  {link.name}
                </button>
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
  
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://lh3.googleusercontent.com/d/1wn6wKwdW_eJGHFhxGkBkS4zAbJeU8L8e",
    "https://lh3.googleusercontent.com/d/12-bSR9mvxwFTKxGni7HHL3s1pIRIfzJZ",
    "https://lh3.googleusercontent.com/d/1_Vuk0wrRCYizb4FBu45L6YcML8sd6fAd",
    "https://lh3.googleusercontent.com/d/1ghpkayMuHVmxH6-QjDrGwFFewC1IECEI",
    "https://lh3.googleusercontent.com/d/1LH3RHucjOOmoQ5D25fP6Bh8E25un5LSd"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            src={images[currentImage]} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            alt="RPPN PRÓ-MATA" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
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
            PELD <span className="text-emerald-400 italic">PROM</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Monitorando a biodiversidade e os processos ecológicos na RPPN PRÓ-MATA para um futuro sustentável.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 group">
              Conheça o Projeto <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('eixos');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Grupos de Trabalho
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
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white rounded-[40px] -z-10 border border-emerald-100" />
        </div>
        <div>
          <SectionHeader 
            title="O Projeto" 
            subtitle="Fortalecendo a comunicação científica e a conservação ambiental no Rio Grande do Sul." 
          />
          <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
            <p>
              O PELD PROM integra a rede de Pesquisas Ecológicas de Longa Duração do Brasil, focando na RPPN PRÓ-MATA, uma área de transição vital entre a Mata Atlântica e os Campos Sulinos.
            </p>
            <p>
              Nossa missão é gerar conhecimento científico de alta qualidade para subsidiar políticas de conservação e aproximar a sociedade da biodiversidade local através de uma linguagem clara e acessível.
            </p>
              <div className="grid grid-cols-1 gap-8 pt-6">
                <div className="flex gap-4 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-700 shrink-0 shadow-sm border border-emerald-100">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg mb-1">Território</h4>
                    <p className="text-stone-600">RPPN Pró-Mata - São Francisco de Paula (RS)</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0">
                    <Search size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg mb-1">Objetivo</h4>
                    <p className="text-stone-600 leading-relaxed">Monitoramento a longo prazo da biodiversidade na área e a dinâmica dos processos ecológicos nos ambientes florestais e campestres, convertendo os resultados em produção científica e disseminação do conhecimento.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ResearchAxes = ({ onAxeClick }: { onAxeClick: (axe: string) => void }) => {
  const axes = [
    { id: "artropodes", title: "Artrópodes", icon: Bug, desc: "Amostragem taxonômica e monitoramento da dinâmica de espécies sob diferentes regimes de manejo.", color: "bg-emerald-50 text-emerald-700" },
    { id: "dna", title: "DNA Ambiental", icon: Dna, desc: "Uso de tecnologias moleculares para detecção da biodiversidade a partir de material ambiental como solo e água.", color: "bg-stone-50 text-stone-700" },
    { id: "plantas", title: "Plantas", icon: Trees, desc: "Monitoramento da dinâmica das comunidades florestais e campestres em relação ao acúmulo de carbono.", color: "bg-emerald-50 text-emerald-700" },
    { id: "vertebrados", title: "Vertebrados", icon: Microscope, desc: "Amostragem taxonômica para avaliação da diversidade de mamíferos, aves, anfíbios e répteis.", color: "bg-stone-50 text-stone-700" },
  ];

  return (
    <section id="eixos" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Grupos de Trabalho" 
          subtitle="Nossa pesquisa é dividida em quatro grandes grupos temáticos que se complementam." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {axes.map((axe) => (
            <motion.div 
              key={axe.title}
              whileHover={{ y: -10 }}
              onClick={() => onAxeClick(axe.id)}
              className={`p-10 rounded-[40px] border border-stone-200 flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl hover:bg-white cursor-pointer group`}
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${axe.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <axe.icon size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">{axe.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">{axe.desc}</p>
              <button className="mt-auto text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Ver detalhes <ChevronRight size={16} />
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
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 sticky top-32">
          <SectionHeader 
            light 
            title="Área de Estudo" 
            subtitle="A RPPN PRÓ-MATA é o coração de nossas pesquisas, um laboratório vivo no Rio Grande do Sul." 
          />
          <div className="space-y-6 mt-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-xl font-serif font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <MapPin size={20} /> RPPN Pró-Mata
              </h4>
              <div className="text-stone-400 leading-relaxed space-y-4 text-sm">
                <p>
                  Situada em São Francisco de Paula, na região nordeste do estado, a reserva possui aproximadamente 3,1 mil hectares de extensão, abrangendo áreas de Floresta Ombrófila Densa, Floresta Ombrófila Mista e Campos de Altitude.
                </p>
                <p>
                  A área foi adquirida pela PUCRS em 1993 e vem sendo utilizada há cerca de 30 anos para pesquisa e monitoramento ecológico.
                </p>
              </div>
            </div>
            <div className="p-6 bg-emerald-900/20 rounded-2xl border border-emerald-500/20 text-emerald-100 text-sm italic">
              Explore o mapa ao lado para interagir com os pontos de monitoramento e visualizar a distribuição das áreas de pesquisa.
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/3 w-full h-[700px] relative">
          <div className="absolute inset-0 bg-emerald-900/20 rounded-full blur-3xl animate-pulse -z-10" />
          <div className="relative bg-stone-800 rounded-[50px] border border-white/10 p-2 shadow-2xl overflow-hidden h-full">
            <iframe 
              src="https://www.google.com/maps/d/u/0/embed?mid=1vfo56cwe9O_zMnS2LfwnkuFr62vd0jg&ehbc=2E312F" 
              width="100%" 
              height="100%" 
              className="rounded-[40px] grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 right-6">
              <div className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <MapPin size={16} /> Mapa Interativo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Publications = () => {
  const pubs = [
    { title: "Dinâmica da Mata de Araucária sob Mudanças Climáticas", journal: "Publicações científicas", year: "2025" },
    { title: "Monitoramento de Mamíferos via Armadilhas Fotográficas", journal: "Resultados parciais", year: "2024" },
    { title: "DNA Ambiental: Nova Fronteira na RPPN PRÓ-MATA", journal: "Vídeos e Divulgação", year: "2024" },
  ];

  return (
    <section id="publicacoes" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <SectionHeader 
              title="Publicações & Resultados" 
              subtitle="Transparência, rigor científico e divulgação de impacto." 
            />
            <p className="text-stone-600 mb-8 leading-relaxed">
              Acesse artigos científicos, resultados parciais, gráficos de monitoramento e conteúdos audiovisuais produzidos pela equipe do PELD PROM.
            </p>
            <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
              Ver mais detalhes <FileText size={18} />
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
                <h3 className="text-2xl font-serif font-bold mb-2">Canal PELD PROM</h3>
                <p className="text-emerald-100/70">Acompanhe nossas expedições e resultados no YouTube.</p>
              </div>
              <a 
                href="https://www.youtube.com/@PELDPró-Mata" 
                target="_blank" 
                rel="noopener"
                className="bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center gap-2"
              >
                Acessar Canal <Youtube size={18} />
              </a>
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
            <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1UMLUAQxifw2ryXmLfVFSZjd8LPKqM81O" 
                alt="PELD PROM Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight">PELD PROM</span>
          </div>
          <p className="text-stone-400 leading-relaxed mb-8">
            Pesquisa Ecológica de Longa Duração na RPPN PRÓ-MATA. Ciência para a conservação da biodiversidade gaúcha.
          </p>
          <div className="flex gap-4">
            <a href="https://www.youtube.com/@PELDPró-Mata" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Youtube size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:eduardo.eizirik@pucrs.br" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Navegação</h4>
          <ul className="space-y-4 text-stone-400">
            <li><a href="#projeto" className="hover:text-emerald-400 transition-colors">O Projeto</a></li>
            <li><a href="#eixos" className="hover:text-emerald-400 transition-colors">Grupos de Trabalho</a></li>
            <li><a href="#area" className="hover:text-emerald-400 transition-colors">Área de Estudo</a></li>
            <li><a href="#publicacoes" className="hover:text-emerald-400 transition-colors">Publicações</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Parceiros</h4>
          <ul className="space-y-4 text-stone-400">
            <li>CNPq</li>
            <li>CAPES</li>
            <li>FAPERGS</li>
            <li>PUCRS</li>
            <li>UFRGS</li>
            <li>UNISINOS</li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl mb-8">Localização</h4>
          <p className="text-stone-400 leading-relaxed">
            RPPN PRÓ-MATA<br />
            São Francisco de Paula, RS<br />
            Brasil
          </p>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm">
        <p>© 2026 PELD PROM. Todos os direitos reservados.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
);

const AxisPage = ({ axisId, onBack }: { axisId: string, onBack: () => void }) => {
  const axesData: Record<string, any> = {
    plantas: {
      title: "PLANTAS",
      desc: "Este grupo dedica-se ao monitoramento contínuo da dinâmica das comunidades vegetais na RPPN PRÓ-MATA. Pesquisamos como as florestas de Araucária e as áreas campestres respondem às variações ambientais ao longo das décadas. A importância científica reside na compreensão dos ciclos de carbono e na sucessão ecológica em ecossistemas de transição.",
      questions: [
        "Como a biomassa arbórea e o acúmulo de carbono variam ao longo do tempo na RPPN?",
        "De que forma as mudanças climáticas locais influenciam a sucessão vegetal de Mata Atlântica e Campos?",
      ],
      methods: [
        "Amostragem de campo em parcelas permanentes.",
        "Monitoramento de longo prazo.",
        "Técnicas laboratoriais de análise foliar.",
      ],
      coordination: [
        { 
          subproject: "Parcelas permanentes campestres", 
          name: "Pedro Maria de Abreu", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/6886522530872727"
        },
        { 
          subproject: "Parcelas permanentes florestais", 
          name: "Sandra Cristina Müller", 
          role: "Coordenadora do subprojeto",
          lattes: "http://lattes.cnpq.br/2689581996334355"
        }
      ],
      icon: Trees
    },
    vertebrados: {
      title: "VERTEBRADOS",
      desc: "O grupo de Vertebrados realiza um inventário abrangente e monitoramento da fauna de mamíferos, aves, répteis e anfíbios no mosaico da RPPN. O foco está em entender como a complexidade do habitat sustenta altos níveis de riqueza de espécies.",
      questions: [
        "Quais são os padrões de riqueza e abundância de vertebrados nos diferentes habitats da RPPN?",
        "Como fatores ambientais influenciam a biodiversidade local?",
      ],
      methods: [
        "Amostragem taxonômica direta e indireta.",
        "Monitoramento de longo prazo via campo.",
        "Técnicas laboratoriais e biometria.",
      ],
      coordination: [
        { 
          subproject: "Amfíbios (Dinâmica da assembleia)", 
          name: "Alexandre Marques Tozetti", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/8347588972615049"
        },
        { 
          subproject: "Mamíferos", 
          name: "Eduardo Eizirik", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/3626004211018550"
        },
        { 
          subproject: "Amfíbios (Estudo bioquímico-funcional)", 
          name: "Guendalina Turcato Oliveira", 
          role: "Coordenadora do subprojeto",
          lattes: "http://lattes.cnpq.br/1189036200852586"
        },
        { 
          subproject: "Aves", 
          name: "Ismael Franz", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/5092254193247650"
        },
        { 
          subproject: "Répteis Squamata", 
          name: "Márcio Borges Martins", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/0479990476812992"
        }
      ],
      icon: Microscope
    },
    artropodes: {
      title: "ARTRÓPODES",
      desc: "Investigamos a diversidade de artrópodes, utilizando-os como bioindicadores da integridade ambiental. Analisamos a dinâmica das populações de insetos sob diferentes regimes de manejo e condições climáticas.",
      questions: [
        "Como a diversidade de artrópodes reflete a integridade ecológica das fitofisionomias da RPPN?",
        "Quais as mudanças sazonais e de longo prazo nas comunidades sob diferentes manejos?",
      ],
      methods: [
        "Amostragem taxonômica sistemática.",
        "Monitoramento da dinâmica de espécies.",
        "Identificação laboratorial especializada.",
      ],
      coordination: [
        { 
          subproject: "Estudo de Artrópodes", 
          name: "Renato Augusto Teixeira", 
          role: "Coordenador do subprojeto",
          lattes: "http://lattes.cnpq.br/6025887779119918"
        }
      ],
      icon: Bug
    },
    dna: {
      title: "DNA AMBIENTAL",
      desc: "O grupo de DNA Ambiental (eDNA) utiliza tecnologias da biologia molecular para detectar espécies a partir de traços genéticos deixados no ambiente, permitindo um monitoramento sensível e não invasivo.",
      questions: [
        "Como o perfil genético ambiental varia entre as micro-bacias da RPPN?",
        "Como usar tecnologias moleculares para detecção da biodiversidade a partir de solo e água?",
      ],
      methods: [
        "Extração de DNA a partir de amostras de solo e água.",
        "Sequenciamento molecular em laboratório.",
        "Tecnologias de ponta em bioinformática.",
      ],
      coordination: [
        { 
          subproject: "DNA Ambiental", 
          name: "Laura Pinto Utz", 
          role: "Coordenadora do subprojeto",
          lattes: "http://lattes.cnpq.br/7548654461265795"
        }
      ],
      icon: Dna
    }
  };

  const data = axesData[axisId];
  if (!data) return <div>Grupo não encontrado</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 bg-stone-100 min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-700 font-bold mb-12 hover:text-emerald-900 transition-colors"
        >
          <ArrowRight className="rotate-180" size={20} /> Voltar para o Início
        </button>

        <div className="bg-white rounded-[40px] p-12 shadow-xl border border-stone-200">
           <div className="flex items-center gap-6 mb-8">
             <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
               <data.icon size={32} />
             </div>
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 uppercase">{data.title}</h1>
           </div>

           <div className="space-y-12">
             <section>
               <h2 className="text-xl font-bold text-emerald-800 mb-4 uppercase tracking-wider">Descrição do Grupo</h2>
               <p className="text-stone-600 leading-relaxed text-lg">{data.desc}</p>
             </section>

             <section>
               <h2 className="text-xl font-bold text-emerald-800 mb-4 uppercase tracking-wider">Coordenação dos Subprojetos</h2>
               <div className="grid grid-cols-1 gap-6">
                 {data.coordination.map((m: any, i: number) => (
                   <div key={i} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
                     <div>
                       <p className="text-xs font-bold text-emerald-600 uppercase mb-1">{m.subproject}</p>
                       <p className="font-bold text-stone-900">{m.name}</p>
                       <p className="text-stone-500 text-xs">{m.role}</p>
                     </div>
                     <a href={m.lattes} target="_blank" rel="noopener" className="text-emerald-600 font-bold text-sm bg-white px-4 py-2 rounded-full border border-stone-100 hover:bg-emerald-50 transition-colors">Lattes</a>
                   </div>
                 ))}
               </div>
             </section>

             <section>
               <h2 className="text-xl font-bold text-emerald-800 mb-4 uppercase tracking-wider">Perguntas Científicas</h2>
               <ul className="space-y-4">
                 {data.questions.map((q: string, i: number) => (
                   <li key={i} className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 text-stone-700 italic">
                     <HelpCircle className="text-emerald-500 shrink-0" size={20} />
                     {q}
                   </li>
                 ))}
               </ul>
             </section>

             <section>
               <h2 className="text-xl font-bold text-emerald-800 mb-4 uppercase tracking-wider">Métodos Utilizados</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {data.methods.map((m: string, i: number) => (
                   <div key={i} className="flex items-center gap-3 p-4 border-b border-stone-100 text-stone-600 font-medium text-sm">
                     <FlaskConical size={16} className="text-emerald-600" />
                     {m}
                   </div>
                 ))}
               </div>
             </section>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const GalleryPage = ({ onBack }: { onBack: () => void }) => {
  const [activeVideo, setActiveVideo] = useState("https://www.youtube.com/embed/v7mweWPan_A?si=3wxGGofuVb_p7MCt");

  const videos = [
    { id: "v1", title: "Sobre o PELD", src: "https://www.youtube.com/embed/v7mweWPan_A?si=3wxGGofuVb_p7MCt" },
    { id: "v2", title: "Área de Monitoramento", src: "https://drive.google.com/file/d/1QhPsFZgreLd2YMfkue2o_lo4cvdv3csK/preview" },
    { id: "v3", title: "Monitoramento I", src: "https://drive.google.com/file/d/1ZtBTvGCJt1EXhqvuUN7UcWuaJHTjr8OI/preview" },
    { id: "v4", title: "Monitoramento II", src: "https://drive.google.com/file/d/1LNyhkmS3dF3wfoiPDhUaaRLXFzKBMVuT/preview" },
    { id: "v5", title: "Monitoramento III", src: "https://drive.google.com/file/d/1MwJdI8gesmYewKBQsYsiLVHCbIrp2YVQ/preview" },
  ];

  const images = [
    { src: "https://lh3.googleusercontent.com/d/1wn6wKwdW_eJGHFhxGkBkS4zAbJeU8L8e", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1N7SDUv1CwnjN7ekrWHPmA34HVkU1gQn4", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/12-bSR9mvxwFTKxGni7HHL3s1pIRIfzJZ", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/19dl7rEEk87No6Esa-GfWj2kASoDU2TqX", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/17yVxXHrMHObypFqJmMWMmv8Rvy7UlJio", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1bDyPBGlEQlUvKfQKg1y-PHPA29t1Oi8d", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1T72_nMEFJ-NMkFwX6wg4NS0SxLz8aYew", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1_Vuk0wrRCYizb4FBu45L6YcML8sd6fAd", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1LH3RHucjOOmoQ5D25fP6Bh8E25un5LSd", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1AAwbERNRurdo9MonAa-ZDwxUD_C8Mc7U", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1ghpkayMuHVmxH6-QjDrGwFFewC1IECEI", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1Sdg8dhIrBKyWc_oko_5-tlcDRbwkTvGH", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1_FMGyyPm5TxxwwLg49G1K-VHfZibXvwq", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/19sy-IcGcFZtsERzNOz7lZx4hzOzqTTrb", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1zJeVnT9jQtj8QgyroZb0gjym__XELL7U", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1pi5--6krDKEDVIlq83qEU6BDXX5CLKGR", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/1Gzowi8pJnck4UfzlFOMtKH1Des2GsozC", category: "Imagem do acervo PELD PROM" },
    { src: "https://lh3.googleusercontent.com/d/10poAD14b0Tl9iF546I9BxGsCZxYhEcVp", category: "Imagem do acervo PELD PROM" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-700 font-bold mb-12 hover:text-emerald-900 transition-colors"
        >
          <ArrowRight className="rotate-180" size={20} /> Voltar para o Início
        </button>

        <SectionHeader 
          title="Galeria PELD PROM" 
          subtitle="Registros Visuais da Biodiversidade e Expedições na RPPN PRÓ-MATA." 
        />

        <div className="mb-24">
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 flex items-center gap-3">
            <Share2 className="text-emerald-600" size={24} /> Vídeos e Expedições
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-video rounded-[32px] overflow-hidden bg-stone-900 shadow-xl border border-stone-200">
              <iframe 
                width="100%" 
                height="100%" 
                src={activeVideo}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="no-referrer-when-downgrade" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {videos.map((vid) => (
                <button 
                  key={vid.id} 
                  onClick={() => setActiveVideo(vid.src)}
                  className={`p-4 rounded-2xl flex items-center gap-4 border transition-all ${activeVideo === vid.src ? "bg-emerald-50 border-emerald-500 shadow-sm" : "bg-stone-50 border-stone-200 hover:bg-stone-100"}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activeVideo === vid.src ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-600"}`}>
                    <Play size={18} fill="currentColor" />
                  </div>
                  <span className={`font-bold text-sm ${activeVideo === vid.src ? "text-emerald-900" : "text-stone-700"}`}>{vid.title}</span>
                </button>
              ))}
              <a 
                href="https://www.youtube.com/@PELDPró-Mata" 
                target="_blank" 
                rel="noopener"
                className="mt-4 p-4 rounded-2xl bg-stone-900 text-white flex items-center justify-center gap-3 hover:bg-emerald-700 transition-colors"
              >
                <Youtube size={20} />
                <span className="font-bold text-sm">Mais no YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-[32px] border border-stone-100 shadow-sm transition-all hover:shadow-xl">
              <img 
                src={img.src} 
                alt="Galeria" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white text-xs font-bold uppercase tracking-widest bg-emerald-600/80 px-3 py-1 rounded-full">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeAxeId, setActiveAxeId] = useState('');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAxePage = (id: string) => {
    setActiveAxeId(id);
    setCurrentPage('axis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-stone-900 selection:bg-emerald-200 selection:text-emerald-900 scroll-smooth">
      <Navbar onPageChange={navigateTo} currentPage={currentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            <About />
            <ResearchAxes onAxeClick={openAxePage} />
            <StudyArea />
            <Publications />
          </motion.div>
        )}

        {currentPage === 'axis' && (
          <AxisPage axisId={activeAxeId} onBack={() => navigateTo('home')} />
        )}

        {currentPage === 'galeria' && (
          <GalleryPage onBack={() => navigateTo('home')} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
