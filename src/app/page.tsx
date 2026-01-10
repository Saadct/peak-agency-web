"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";

function TextRotator() {
  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const messages = [
    [
      { text: "+10", color: "text-[#D4AF37]" },
      { text: "entreprises", color: "text-[#D4AF37]" },
      { text: "nous" }, { text: "ont" }, { text: "fait" }, { text: "confiance" },
      { text: "pour" }, { text: "leurs" }, { text: "projets" }
    ],
    [
      { text: "4", color: "text-[#D4AF37]" },
      { text: "ans", color: "text-[#D4AF37]" },
      { text: "d'expertise", color: "text-[#D4AF37]" },
      { text: "au" }, { text: "service" }, { text: "de" }, { text: "vos" }, { text: "idées" }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setIsSliding(false);
      }, 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMsg = messages[index];
  const nextMsg = messages[(index + 1) % messages.length];
  const maxLength = Math.max(currentMsg.length, nextMsg.length);

  return (
    <div className="flex items-center justify-center overflow-hidden h-6 gap-1.5">
      {Array.from({ length: maxLength }).map((_, i) => {
        const topWord = currentMsg[i];
        const bottomWord = nextMsg[i];
        return (
          <div
            key={i}
            className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSliding ? '-translate-y-6' : 'translate-y-0'}`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <span className={`h-6 flex items-center leading-none text-sm text-gray-600 font-semibold whitespace-nowrap ${topWord?.color || ''}`}>
              {topWord?.text || '\u00A0'}
            </span>
            <span className={`h-6 flex items-center leading-none text-sm text-gray-600 font-semibold whitespace-nowrap ${bottomWord?.color || ''}`}>
              {bottomWord?.text || '\u00A0'}
            </span>
          </div>
        )
      })}
    </div>
  );
}

function SimpleTextRotator() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    <span key="1"><span className="text-[#D4AF37] font-medium">+10 entreprises</span> nous ont fait confiance pour leurs projets</span>,
    <span key="2">4 ans d'expertise au service de <span className="text-[#D4AF37] font-medium">vos idées</span></span>,
    <span key="3">Des solutions <span className="text-[#D4AF37] font-medium">scalables</span>, pensées pour <span className="text-[#D4AF37] font-medium">durer</span></span>
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} text-gray-600 font-medium text-sm h-6 flex items-center`}>
      {messages[index]}
    </div>
  );
}

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'mvp' | 'site'>('mvp');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Affiche le bouton si on a scrollé plus de 400px (environ après le hero)
      if (window.scrollY > 400) {
        setShowWhatsApp(true);
      } else {
        setShowWhatsApp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      title: "Votre SaaS en 30 jours. Pas en 6 mois.",
      description: "Ne perdez plus des mois en développement. Nous livrons votre MVP ou SaaS complet en 4 semaines top chrono. Une exécution militaire pour un Go-to-Market immédiat, prêt à onboarder vos premiers clients payants.",
      tags: ["Vélocité", "Go-to-market", "Sprint"],
      imageColor: "bg-transparent",
      imageText: "Rapidité",
      borderColor: "border-transparent",
      image: "/assets/peakfast-mockup-v4.png",
      icon: <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      title: "Jamais bloqué techniquement.",
      description: "Fini la solitude du fondateur face aux bugs. Une équipe dédiée vous accompagne au quotidien via un canal privé (Slack/WhatsApp). Une question technique ? Une réponse dans l'heure. Vous n'êtes plus jamais bloqué.",
      tags: ["Accompagnement", "Slack dédié", "Réactivité"],
      imageColor: "bg-transparent",
      imageText: "Support",
      borderColor: "border-transparent",
      image: "/assets/kalyps-mockup-v3.png",
      icon: <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    },
    {
      title: "Vos données. Vos serveurs. Vos règles.",
      description: "Vos données, vos règles. Choisissez l'emplacement physique de vos serveurs (France, Suisse, US...). Conformité RGPD native, sécurité bancaire et souveraineté totale sur votre infrastructure.",
      tags: ["Souveraineté", "RGPD", "Sécurité"],
      imageColor: "bg-transparent",
      imageText: "Souveraineté",
      borderColor: "border-transparent",
      image: "/assets/mirakle-mockup.png",
      icon: <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Un design pour convertir, pas pour décorer.",
      description: "L'apparence n'est pas une option, c'est votre premier argument de vente. Nous créons des interfaces 'Pixel Perfect' qui inspirent une confiance immédiate et maximisent vos taux de conversion dès la première visite.",
      tags: ["UI/UX Premium", "Conversion", "Image de marque"],
      imageColor: "bg-transparent",
      imageText: "Design",
      borderColor: "border-transparent",
      image: "/assets/nextera-mockup-v2.png",
      icon: <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    },
    {
      title: "Zéro dépendance. Le code est à vous.",
      description: "Aucun 'Vendor Lock-in'. Vous êtes propriétaire de 100% du code source dès le premier jour. Vous êtes libre d'internaliser l'équipe, de changer de prestataire ou de revendre votre tech sans aucune friction.",
      tags: ["Code Source", "Liberté", "No Lock-in"],
      imageColor: "bg-transparent",
      imageText: "Liberté",
      borderColor: "border-transparent",
      image: "/assets/flowbase-mockup.png",
      icon: <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
    }
  ];

  const nextProject = () => {
    if (currentProject >= projects.length - 1) return;
    if (isAnimating) return;
    setAnimationDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProject((prev) => prev + 1);
      setIsAnimating(false);
    }, 700);
  };

  const prevProject = () => {
    if (currentProject <= 0) return;
    if (isAnimating) return;
    setAnimationDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProject((prev) => prev - 1);
      setIsAnimating(false);
    }, 700);
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header className="absolute w-full z-50 top-4">
        <div className="container mx-auto px-6 md:px-32 lg:px-48 h-16 flex items-center justify-between md:grid md:grid-cols-3">
          {/* Logo - Left */}
          <div className="flex items-center gap-2 font-bold font-heading text-xl md:justify-self-start">
            <div className="w-9 h-9 bg-black rounded-lg text-white flex items-center justify-center shadow-[-4px_4px_8px_rgba(0,0,0,0.3)]">P</div>
            <span>Peak</span>
          </div>

          {/* Nav - Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 justify-self-center">
            <a href="#problem" className="hover:text-black transition-colors">Problème</a>
            <div className="w-px h-3 bg-gray-300" />
            <a href="#features" className="hover:text-black transition-colors">Solutions</a>
            <div className="w-px h-3 bg-gray-300" />
            <a href="#offer" className="hover:text-black transition-colors">Offre</a>
          </nav>

          {/* CTA - Right (Desktop) */}
          <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-xl bg-white text-black text-sm font-medium border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-md justify-self-end">
            <div className="flex items-start justify-center overflow-hidden h-8 gap-1">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-8" style={{ transitionDelay: '0ms' }}>
                <div className="h-8 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </div>
                <div className="h-8 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </div>
              </div>
              {["Réserver", "un", "appel"].map((word, i) => (
                <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-8" style={{ transitionDelay: `${(i + 1) * 50}ms` }}>
                  <span className="h-8 flex items-center leading-none">{word}</span>
                  <span className="h-8 flex items-center leading-none">{word}</span>
                </div>
              ))}
            </div>
          </a>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white border border-gray-200 shadow-md transition-all hover:bg-gray-50"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
          <nav className="flex flex-col gap-6">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-slate-900 hover:text-gray-500 transition-colors"
            >
              Problème
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-slate-900 hover:text-gray-500 transition-colors"
            >
              Solutions
            </a>
            <a
              href="#offer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-slate-900 hover:text-gray-500 transition-colors"
            >
              Offre
            </a>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <a
              href="https://calendly.com/peak-dev-agency/30min"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-colors shadow-lg text-center"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-24 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">

            {/* Background Designs (Sides Only - Smaller & Distributed) */}

            {/* --- Left Column --- */}
            {/* Top Left */}
            <div className="absolute -top-16 left-12 hidden xl:block opacity-100 hover:opacity-90 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(25deg) rotateX(-8deg)' }}>
              <Image src="/assets/hero-design-1.png" alt="Design 1" width={0} height={0} sizes="100vw" style={{ width: '90px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Upper Mid Left */}
            <div className="absolute top-[70%] left-56 hidden xl:block opacity-100 hover:opacity-50 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(30deg) rotateX(5deg)' }}>
              <Image src="/assets/hero-design-6.png" alt="Design 6" width={0} height={0} sizes="100vw" style={{ width: '70px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Lower Mid Left */}
            <div className="absolute bottom-72 left-28 hidden xl:block opacity-100 hover:opacity-80 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(22deg) rotateX(-12deg)' }}>
              <Image src="/assets/hero-design-4.jpg" alt="Design 4" width={0} height={0} sizes="100vw" style={{ width: '80px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>

            {/* --- Right Column --- */}
            {/* Top Right */}
            <div className="absolute -top-16 right-20 hidden xl:block opacity-100 hover:opacity-75 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(-25deg) rotateX(-8deg)' }}>
              <Image src="/assets/hero-design-3.png" alt="Design 3" width={0} height={0} sizes="100vw" style={{ width: '100px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Mid Right */}
            <div className="absolute -bottom-16 right-56 hidden xl:block opacity-100 hover:opacity-80 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(-30deg) rotateX(5deg)' }}>
              <Image src="/assets/hero-design-5.png" alt="Design 5" width={0} height={0} sizes="100vw" style={{ width: '70px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Lower Mid Right */}
            <div className="absolute top-[50%] -translate-y-1/2 right-36 hidden xl:block opacity-100 hover:opacity-70 transition-opacity duration-700 pointer-events-none select-none z-0" style={{ transform: 'perspective(600px) rotateY(-22deg) rotateX(-12deg) translateY(-50%)' }}>
              <Image src="/assets/hero-design-2.png" alt="Design 2" width={0} height={0} sizes="100vw" style={{ width: '100px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>

            {/* Main Hero Content */}
            <div className="relative z-10">


              <h1 className="text-5xl md:text-7xl font-semibold mb-8 max-w-5xl mx-auto leading-[1.15] font-heading text-slate-900" style={{ letterSpacing: '-2px' }}>
                <span className={`block transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  Lancez votre solution <span className="text-slate-900">SaaS</span>
                </span>
                <span className={`block transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  & <span className="text-slate-900">MVP</span> en jours, pas en mois
                </span>
              </h1>

              <p className={`text-base text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Design, développement et hébergement sécurisé en Europe, prêt à l’usage et à tester vos premiers utilisateurs
              </p>

              <div className={`flex flex-col gap-8 justify-center items-center mt-14 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-5 py-2 rounded-full bg-slate-900 text-white font-semibold text-[15px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                  <div className="flex items-start justify-center overflow-hidden h-[34px] gap-1">
                    {["Lancez", "mon", "projet"].map((word, i) => (
                      <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[34px]" style={{ transitionDelay: `${i * 50}ms` }}>
                        <span className="h-[34px] flex items-center leading-none">{word}</span>
                        <span className="h-[34px] flex items-center leading-none">{word}</span>
                      </div>
                    ))}
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[34px] ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                      <div className="h-[34px] flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                      <div className="h-[34px] flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="mt-8 flex flex-col items-center gap-10">
                  <SimpleTextRotator />
                  <div className="flex items-center gap-2">
                    <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
                      <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      <span className="font-medium text-slate-900 text-sm drop-shadow-sm">4.9</span>
                    </div>
                    <span className="text-gray-500 font-normal text-sm drop-shadow-sm">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-20" />

        {/* SECTION 2: PROJECTS CAROUSEL */}
        <section id="problem" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">
            {/* Header */}
            <div className="mb-20">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">VITESSE ABSOLUE</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 leading-tight mb-3 text-left" style={{ letterSpacing: '-1.5px' }}>
                Un SaaS qui prend des <span className="text-gray-400 font-mono">"</span>mois<span className="text-gray-400 font-mono">"</span> à lancer ?<br />
                Ce n'est plus possible.
              </h2>
              <p className="text-lg text-gray-500 font-medium mb-12 text-left">
                Vos concurrents sont déjà passés à l'action.
              </p>
              <div className="flex justify-start">
                <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-5 py-2 rounded-full bg-slate-900 text-white font-semibold text-[15px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                  <div className="flex items-start justify-center overflow-hidden h-[34px] gap-1">
                    {["Lancez", "mon", "projet"].map((word, i) => (
                      <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[34px]" style={{ transitionDelay: `${i * 50}ms` }}>
                        <span className="h-[34px] flex items-center leading-none">{word}</span>
                        <span className="h-[34px] flex items-center leading-none">{word}</span>
                      </div>
                    ))}
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[34px] ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                      <div className="h-[34px] flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                      <div className="h-[34px] flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Content Grid */}
            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Image + Controls Wrapper */}
              <div className="relative flex flex-col items-center">

                {/* Image Block with Animation (Overflow Hidden) */}
                <div className="relative h-[420px] w-full overflow-hidden flex items-center justify-center">

                  {/* Container that slides */}
                  <div
                    className={`flex flex-row lg:flex-col gap-6 w-full ${isAnimating ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
                    style={{
                      transform: isAnimating
                        ? (isMobile
                          ? (animationDirection === 'next' ? 'translateX(calc(-200% - 48px))' : 'translateX(0)')
                          : (animationDirection === 'next' ? 'translateY(-364px)' : 'translateY(364px)')
                        )
                        : (isMobile ? 'translateX(calc(-100% - 24px))' : 'translate3d(0,0,0)'),
                      willChange: 'transform'
                    }}
                  >

                    {/* Previous Block (n-1) */}
                    <div className={`h-[340px] w-full min-w-full lg:min-w-0 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border relative
                      ${currentProject > 0 ? `${projects[currentProject - 1].imageColor} ${projects[currentProject - 1].borderColor || ''}` : 'bg-transparent border-transparent shadow-none'}`}>
                      {currentProject > 0 && projects[currentProject - 1].image ? (
                        <Image src={projects[currentProject - 1].image} alt={projects[currentProject - 1].title} fill className="object-cover" />
                      ) : (
                        <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">
                          {currentProject > 0 ? projects[currentProject - 1].imageText : ''}
                        </span>
                      )}
                    </div>

                    {/* Main Image Block (current) */}
                    <div className={`h-[340px] w-full min-w-full lg:min-w-0 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border ${projects[currentProject].imageColor} ${projects[currentProject].borderColor || ''} relative`}>
                      {projects[currentProject].image ? (
                        <Image src={projects[currentProject].image} alt={projects[currentProject].title} fill className="object-cover" />
                      ) : (
                        <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">{projects[currentProject].imageText}</span>
                      )}
                    </div>

                    {/* Next Block (n+1) */}
                    <div className={`h-[340px] w-full min-w-full lg:min-w-0 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border relative
                      ${currentProject < projects.length - 1 ? `${projects[currentProject + 1].imageColor} ${projects[currentProject + 1].borderColor || ''}` : 'bg-transparent border-transparent shadow-none'}`}>
                      {currentProject < projects.length - 1 && projects[currentProject + 1].image ? (
                        <Image src={projects[currentProject + 1].image} alt={projects[currentProject + 1].title} fill className="object-cover" />
                      ) : (
                        <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">
                          {currentProject < projects.length - 1 ? projects[currentProject + 1].imageText : ''}
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Swipe Control (Below Image on Mobile, Right Side on Desktop) */}
                <div className="flex gap-2 p-1.5 bg-white shadow-md rounded-full border border-gray-100 mt-6
                  lg:absolute lg:mt-0 lg:bg-white/80 lg:backdrop-blur-sm lg:shadow-xl lg:border-white/50 lg:z-20
                  lg:top-1/2 lg:right-[-12px] lg:translate-x-full lg:left-auto lg:-translate-y-1/2 lg:flex-col
                ">
                  <button
                    onClick={prevProject}
                    disabled={currentProject <= 0}
                    className={`w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all
                      ${currentProject <= 0
                        ? 'text-gray-200 cursor-not-allowed opacity-50'
                        : 'text-gray-400 hover:text-black hover:scale-110 active:scale-95'
                      }
                    `}
                  >
                    {/* Chevron Right rotated: 180deg (Left) on mobile, -90deg (Up) on desktop */}
                    <svg
                      className="w-5 h-5 lg:w-4 lg:h-4 transform rotate-180 lg:-rotate-90 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextProject}
                    disabled={currentProject >= projects.length - 1}
                    className={`w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all
                      ${currentProject >= projects.length - 1
                        ? 'text-gray-200 cursor-not-allowed opacity-50'
                        : 'text-gray-400 hover:text-black hover:scale-110 active:scale-95'
                      }
                    `}
                  >
                    {/* Chevron Right rotated: 0deg (Right) on mobile, 90deg (Down) on desktop */}
                    <svg
                      className="w-5 h-5 lg:w-4 lg:h-4 transform rotate-0 lg:rotate-90 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right: Text Block */}
              <div>
                {/* Title with logo */}
                <div className={`flex items-center gap-4 mb-6 transition-all duration-400 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  style={{ transitionDelay: isAnimating ? '0ms' : '200ms', transitionDuration: '400ms' }}>
                  <div className={`w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center`}>
                    {projects[currentProject].icon}
                  </div>
                  <h3 className="text-3xl font-medium text-slate-900 font-heading">{projects[currentProject].title}</h3>
                </div>

                {/* Description */}
                <p className={`text-gray-600 leading-relaxed mb-6 h-32 overflow-hidden transition-all ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  style={{ transitionDelay: isAnimating ? '80ms' : '120ms', transitionDuration: '400ms' }}>
                  {projects[currentProject].description}
                </p>

                {/* Link */}
                <a href="#" className={`inline-flex items-center text-slate-900 font-semibold mb-8 hover:underline group transition-all ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  style={{ transitionDelay: isAnimating ? '160ms' : '60ms', transitionDuration: '400ms' }}>
                  Voir la version live
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 transition-all ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  style={{ transitionDelay: isAnimating ? '240ms' : '0ms', transitionDuration: '400ms' }}>
                  {projects[currentProject].tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-20" />

        {/* SECTION 3: BENTO GRID */}
        <section className="pt-10 pb-16 md:pb-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">

            {/* Header Centered */}
            <div className="text-center mb-16">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">NOS RÉALISATIONS PHARES</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-[-0.08em] mb-[60px] md:mb-[100px]">
                <span className="text-gray-400">Conçu pour performer.</span><br />
                <span className="text-slate-900">Taillé pour durer.</span>
              </h2>

              {/* Apple Style Toggle - Stacked Mobile / Horizontal Desktop */}
              <div className="flex flex-col md:inline-grid md:grid-cols-2 bg-gray-100 p-1.5 rounded-2xl relative mx-auto w-full md:w-auto md:min-w-[700px]">
                {/* Sliding Background Pill */}
                {/* Sliding Background Pill */}
                <div
                  className={`absolute bg-slate-900 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl
                    ${isMobile
                      ? (activeTab === 'mvp' ? 'top-1.5 inset-x-1.5 h-[calc(50%-6px)]' : 'bottom-1.5 inset-x-1.5 h-[calc(50%-6px)]')
                      : (activeTab === 'mvp' ? 'left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)]' : 'right-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)]')
                    }
                  `}
                />

                <button
                  onClick={() => setActiveTab('mvp')}
                  className={`relative z-10 px-4 md:px-12 py-4 md:py-3 rounded-xl text-sm font-semibold text-center transition-colors duration-300 ${activeTab === 'mvp' ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  MVP & APP
                </button>
                <button
                  onClick={() => setActiveTab('site')}
                  className={`relative z-10 px-4 md:px-12 py-4 md:py-3 rounded-xl text-sm font-semibold text-center transition-colors duration-300 ${activeTab === 'site' ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Landing page & Site
                </button>
              </div>
            </div>

            {/* Bento Grid Content */}
            <div className="relative min-h-[900px] md:min-h-[500px]">

              {/* MVP & APP LAYOUT */}
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-500 ${activeTab === 'mvp' ? 'opacity-100 scale-100 relative md:absolute md:inset-0 z-10' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none z-0'}`}>
                {/* Big Card Left - SaaS/MVP */}
                <div className="lg:col-span-2 group relative bg-gray-100 rounded-3xl h-[300px] lg:h-full w-full overflow-hidden border border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 p-6 md:p-8 z-10 flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">MVP</span>
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">Automation</span>
                  </div>

                  <div className="relative w-[75%] aspect-video mb-12">
                    <Image src="/assets/bento-saas-dashboard-v5.png" alt="SaaS Dashboard" fill className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">MVP : Plateforme d'Automatisation</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span>Connexion CRM / API</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>Pilote Automatique</span>
                    </div>
                  </div>
                </div>

                {/* Right Column Stack */}
                <div className="flex flex-col gap-6 h-auto lg:h-full">
                  {/* Top Right - Mobile App 1 */}
                  <div className="group relative bg-gray-50 rounded-3xl h-[200px] lg:flex-1 lg:min-h-[200px] w-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-center">
                    <div className="absolute top-0 left-0 p-4 z-10 flex flex-wrap gap-2">
                      <span className="inline-block px-2 py-0.5 bg-white/60 backdrop-blur-md border border-gray-200 text-slate-900 text-[10px] font-bold rounded-full shadow-sm">Mobile App</span>
                      <span className="inline-block px-2 py-0.5 bg-white/60 backdrop-blur-md border border-gray-200 text-slate-900 text-[10px] font-bold rounded-full shadow-sm">Marketplace</span>
                    </div>
                    <div className="relative w-[55%] h-auto aspect-square mb-8">
                      <Image src="/assets/bento-mobile-car-rental.png" alt="Car Rental App" fill className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full text-slate-900">
                      <h3 className="text-lg font-medium mb-1">App de Location</h3>
                      <p className="text-gray-500 text-sm">Réservation & Paiement</p>
                    </div>
                  </div>

                  {/* Bottom Right - Mobile App 2 or SaaS */}
                  {/* Bottom Right - Restaurant Site */}
                  <div className="group relative bg-gray-50 rounded-3xl h-[200px] lg:flex-1 lg:min-h-[200px] w-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-center">
                    <div className="absolute top-0 left-0 p-4 z-10 flex flex-wrap gap-2">
                      <span className="inline-block px-2 py-0.5 bg-white/60 backdrop-blur-md border border-gray-200 text-slate-900 text-[10px] font-bold rounded-full shadow-sm">Web App</span>
                      <span className="inline-block px-2 py-0.5 bg-white/60 backdrop-blur-md border border-gray-200 text-slate-900 text-[10px] font-bold rounded-full shadow-sm">Booking</span>
                    </div>
                    <div className="relative w-[85%] h-auto aspect-video mb-8">
                      <Image src="/assets/bento-restaurant-booking.jpg" alt="Restaurant Booking Site" fill className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full text-slate-900">
                      <h3 className="text-lg font-medium mb-1">Site & Réservation</h3>
                      <p className="text-gray-500 text-sm">Pour Restaurants & Hôtels</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LANDING PAGE & SITE LAYOUT */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 ${activeTab === 'site' ? 'opacity-100 scale-100 relative md:absolute md:inset-0 z-10' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none z-0'}`}>
                {/* Architecture Site Card */}
                <div className="group relative bg-gray-100 rounded-3xl h-[350px] lg:h-full w-full overflow-hidden border border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 p-6 md:p-8 z-10 flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">Site Vitrine</span>
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">SEO</span>
                  </div>

                  <div className="relative w-[95%] aspect-video mb-12">
                    <Image src="/assets/bento-architecture-site.png" alt="Architecture Portfolio Site" fill className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">Cabinet d'Architecture</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span>Design Unique</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>Portfolio Interactif</span>
                    </div>
                  </div>
                </div>

                {/* Cosmetic Landing Card */}
                <div className="group relative bg-gray-100 rounded-3xl h-[350px] lg:h-full w-full overflow-hidden border border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 p-6 md:p-8 z-10 flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">E-commerce</span>
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">Landing Page</span>
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-xs font-bold rounded-full shadow-sm">Mono-produit</span>
                  </div>

                  <div className="relative w-[38%] h-[80%] shadow-2xl rounded-lg overflow-hidden mb-8 border border-gray-100">
                    <Image src="/assets/bento-cosmetic-landing.png" alt="Cosmetic Landing Page" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">Aura Skincare</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span>Shopify Headless</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>Mono-produit</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SECTION CTA - Après les cartes */}
            <div className="flex justify-center mt-12 md:mt-20">
              <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm md:text-base hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/30 hover:shadow-slate-900/40 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-start justify-center overflow-hidden h-9 gap-1">
                  {["Lancez", "mon", "projet"].map((word, i) => (
                    <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9" style={{ transitionDelay: `${i * 50}ms` }}>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                    </div>
                  ))}
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9 ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 mt-2 mb-16 md:my-24" />

        {/* SECTION 4: COMPLEXITY / GUARANTEES */}
        <section className="pt-10 pb-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">
            <div className="text-center mb-24">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">VOS GARANTIES DE SÉRÉNITÉ</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-[-0.08em]">
                <span className="text-slate-900">Nous gérons la </span><span className="text-gray-400">complexité.</span><br />
                <span className="text-slate-900">Concentrez-vous sur </span><span className="text-gray-400">l'essentiel.</span>
              </h2>
            </div>

            {/* Premium Bento Grid 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">

              {/* 1. SECURITY - Dark Card (Solid & Secure) */}
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-6 md:p-12 text-white shadow-2xl transition-all duration-500 hover:shadow-slate-900/40 hover:-translate-y-1 h-auto min-h-[350px]">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h3 className="text-3xl font-medium font-heading mb-4 tracking-tight">RGPD & Sécurité.</h3>
                    <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                      Conformité totale dès le jour 1. Vos données sont blindées, vos mentions légales sont prêtes. Dormez tranquille.
                    </p>
                  </div>
                </div>
                {/* Background Glow */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-all duration-700 pointer-events-none" />
              </div>

              {/* 2. DESIGN - Light Card with Gradient (Creative) */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-6 md:p-12 shadow-xl shadow-gray-200/40 transition-all duration-500 hover:shadow-gray-200/60 hover:-translate-y-1 h-auto min-h-[400px]">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-500">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                    </div>
                    <h3 className="text-3xl font-medium font-heading text-slate-900 mb-4 tracking-tight">Direction Artistique.</h3>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                      Pas de templates génériques. Une identité visuelle unique, pensée pour convertir et marquer les esprits durablement.
                    </p>
                  </div>
                </div>
                {/* Soft Gradient Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-50/0 via-purple-50/0 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* 3. SUPPORT - Clean Card (Reactive) */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-50 p-6 md:p-12 transition-all duration-500 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 h-auto min-h-[300px]">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Toujours disponible</span>
                  </div>
                  <h3 className="text-2xl font-medium font-heading text-slate-900 mb-4 tracking-tight">Support Prioritaire.</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Nous ne disparaissons pas après la livraison. Une question ? Une modif ? On gère en express.
                  </p>
                </div>
              </div>

              {/* 4. SCALABILITY - Tech Grid Styling (Future-proof) */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-6 md:p-12 shadow-xl shadow-gray-200/40 transition-all duration-500 hover:shadow-gray-200/60 hover:-translate-y-1 h-auto min-h-[400px]">
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                    <svg className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="text-2xl font-medium font-heading text-slate-900 mb-4 tracking-tight">Scalabilité Native.</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Construit sur Next.js pour encaisser la charge. Votre MVP d'aujourd'hui est prêt pour vos millions d'utilisateurs de demain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-24" />

        {/* SECTION 5: PROCESS */}
        <section className="pt-10 pb-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">

            {/* Header Centered */}
            <div className="text-center mb-24">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">NOTRE PROCESSUS</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 leading-tight tracking-[-0.08em] mb-4">
                Comment on transforme votre idée en succès.
              </h2>
              <p className="text-gray-400 font-medium text-lg">
                Déployez. Testez. Vendez
              </p>
            </div>

            {/* 3 Columns Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-20 md:mb-32">

              {/* Step 1: Encadrement */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">Encadrement</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  — On analyse votre vision, définit le périmètre technique et planifie chaque étape. Aucune surprise, que de la clarté.
                </p>
              </div>

              {/* Step 2: Développement */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">Développement</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  — Sprints agiles, livrables réguliers. Vous suivez l'avancement en temps réel et validez chaque feature.
                </p>
              </div>

              {/* Step 3: Livraison */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">Livraison</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  — Déploiement sur vos serveurs, documentation complète, formation de vos équipes. Vous êtes autonomes.
                </p>
              </div>
            </div>

            {/* Bento Grid: 2 cards top, 1 full-width bottom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1: Cadrage */}
              <div className="group relative bg-gray-100 rounded-[2rem] p-8 md:p-10 h-[280px] md:h-[320px] transition-all duration-500 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full mb-4">01</span>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 mb-3 tracking-tight">
                    On cadre techniquement la vision
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                    Audit de faisabilité, choix de stack, architecture technique et roadmap détaillée.
                  </p>
                </div>
                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-200/80 to-transparent rounded-tl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card 2: Design & Dev */}
              <div className="group relative bg-gray-100 rounded-[2rem] p-8 md:p-10 h-[280px] md:h-[320px] transition-all duration-500 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full mb-4">02</span>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 mb-3 tracking-tight">
                    Design et optimisation<br className="hidden md:block" />
                    Conception / Développement<br className="hidden md:block" />
                    Intégrations
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                    UI/UX premium, code robuste, APIs et services tiers connectés.
                  </p>
                </div>
                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-200/80 to-transparent rounded-tl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card 3: Déploiement (Full Width) */}
              <div className="md:col-span-2 group relative bg-gray-100 rounded-[2rem] p-8 md:p-10 h-[220px] md:h-[260px] transition-all duration-500 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full mb-4">03</span>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 mb-3 tracking-tight">
                    Déploiement & Intégrations
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Mise en production, tests de charge, monitoring, et support post-lancement. Votre produit est live et performant.
                  </p>
                </div>
                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-48 h-32 bg-gradient-to-tl from-gray-200/80 to-transparent rounded-tl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

            </div>

            {/* SECTION CTA */}
            <div className="flex justify-center mt-16 md:mt-24">
              <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/25 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-start justify-center overflow-hidden h-9 gap-1">
                  {["Lancez", "mon", "projet"].map((word, i) => (
                    <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9" style={{ transitionDelay: `${i * 50}ms` }}>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                    </div>
                  ))}
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9 ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-24" />

        {/* SECTION 6: NOTRE OFFRE */}
        <section className="pt-10 pb-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">

            {/* Header Centered */}
            <div className="text-center mb-20 md:mb-28">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">CE QUE NOUS PROPOSONS</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 leading-tight tracking-[-0.08em]">
                Notre offre
              </h2>
            </div>

            {/* 3 Columns Offer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Column 1: Accompagnement - Light Card with Blue Accent */}
              <div className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1">
                {/* Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-b-full" />

                <div className="pt-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2 tracking-tight">Vision & Stratégie</h3>
                  <p className="text-gray-400 font-medium text-sm mb-8">Transformez votre concept en produit viable.</p>

                  {/* Features List */}
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">Analyse de faisabilité et business model</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">Définition du périmètre MVP (Scope)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">Roadmap technique détaillée</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">Gestion de projet agile et transparente</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Développement - Dark Card for Premium Contrast */}
              <div className="group relative bg-slate-900 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading text-white mb-2 tracking-tight">Réalisation Technique</h3>
                  <p className="text-gray-400 font-medium text-sm mb-8">L'excellence opérationnelle au service du produit.</p>

                  {/* Features List */}
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">UI/UX Design centré utilisateur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">Développement Full-stack (Web & Mobile)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">Architecture scalable dès le départ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">Intégrations outils tiers & APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">Livrables testés et validés</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3: Déploiement - Light Card with Subtle Gradient */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1">
                {/* Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-b-full" />

                <div className="pt-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2 tracking-tight">Lancement & Suivi</h3>
                  <p className="text-gray-400 font-medium text-sm mb-8">Pilotez votre croissance sans soucis techniques.</p>

                  {/* Features List - With Subtext */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-slate-900 font-semibold text-sm">Infrastructure Cloud</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed pl-[18px]">AWS, Vercel, ou OVH : on gère la mise en ligne et l'hébergement.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-slate-900 font-semibold text-sm">Sécurité & Conformité</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed pl-[18px]">Protection des données, HTTPS, et respect natif des normes RGPD.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-slate-900 font-semibold text-sm">Évolution & Maintenance</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed pl-[18px]">Nous restons disponibles pour les mises à jour et les nouvelles features.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SECTION CTA */}
            <div className="flex justify-center mt-16 md:mt-24">
              <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/25 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-start justify-center overflow-hidden h-9 gap-1">
                  {["Lancez", "mon", "projet"].map((word, i) => (
                    <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9" style={{ transitionDelay: `${i * 50}ms` }}>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                      <span className="h-9 flex items-center leading-none">{word}</span>
                    </div>
                  ))}
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9 ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                    <div className="h-9 flex items-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[750px] w-[90%] md:w-full mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-12 md:my-24" />

        {/* SECTION 7: FAQ */}
        <section className="pt-10 pb-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">

            {/* Header Centered */}
            <div className="text-center mb-16 md:mb-20">
              <span className="block text-slate-900 font-normal uppercase tracking-wider text-sm mb-4">QUESTIONS FRÉQUENTES</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 leading-tight tracking-[-0.08em]">
                On répond à vos questions
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "Combien de temps avant d'avoir mon produit en main ?",
                  answer: "Vitesse et qualité ne sont pas incompatibles. Pour un MVP, comptez généralement <strong>4 à 8 semaines</strong>. On découpe le projet en étapes claires pour vous livrer une première version fonctionnelle le plus vite possible."
                },
                {
                  question: "Comment garantissez-vous la fiabilité du code ?",
                  answer: "On ne bricole pas. Architecture propre, <strong>Clean Code</strong>, tests automatisés et revues de code systématiques font partie de notre ADN. On suit les standards les plus stricts de l'industrie pour vous livrer une solution stable, sécurisée et facile à faire évoluer par n'importe quel développeur."
                },
                {
                  question: "Comment définissez-vous le budget ?",
                  answer: "Tout dépend de l'envergure de votre ambition. Suite à notre premier échange (gratuit), on vous fournit une <strong>estimation précise et détaillée</strong>. Pas de coûts cachés, on s'engage sur un forfait ou un TJM clair dès le départ."
                },
                {
                  question: "Et si je veux changer d'avis en cours de route ?",
                  answer: "C'est tout l'intérêt de notre approche Agile. On fonctionne par <strong>sprints de 2 semaines</strong>. À chaque étape, vous validez le travail, et on peut ajuster la direction si vos besoins évoluent. Vous gardez le contrôle total sur le produit final."
                },
                {
                  question: "Sur quelles technologies allez-vous construire mon projet ?",
                  answer: "On mise sur la robustesse et la performance : <strong>Next.js, React ou Angular</strong> pour des interfaces fluides, <strong>Node.js, Nest.js, Python ou .NET</strong> pour un backend solide. Si votre projet s'y prête mieux, on maîtrise aussi les meilleurs CMS (WordPress, Shopify, Webflow)."
                },
                {
                  question: "L'application m'appartient-elle vraiment ?",
                  answer: "<strong>À 100%.</strong> À la livraison, on vous transfère la propriété intellectuelle complète du code et des données. Pour l'hébergement, on configure tout sur votre propre cloud (AWS, Vercel, OVH...) ou on s'en occupe pour vous, c'est vous qui décidez."
                },
                {
                  question: "Une fois le site en ligne, suis-je livré à moi-même ?",
                  answer: "Jamais. On propose des <strong>contrats de maintenance</strong> sur-mesure pour garantir la sécurité, la rapidité et les mises à jour de votre plateforme. On reste votre partenaire technique sur la durée pour faire grandir le projet."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full py-8 px-4 -mx-4 flex items-center justify-between text-left group rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <span className="text-lg font-semibold text-slate-900 pr-8 group-hover:text-gray-700 transition-colors">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'rotate-180 bg-slate-900' : 'bg-transparent'}`}>
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${openFaq === index ? 'text-white' : 'text-slate-900'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${openFaq === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
                  >
                    <p
                      className="text-gray-500 leading-relaxed pr-12"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: FINAL CTA */}
        <section className="py-24 md:py-32 bg-slate-900 overflow-hidden relative">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              Une idée en tête ?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              On transforme vos concepts en produits d'exception. <br className="hidden md:block" />Discutons de votre vision dès aujourd'hui.
            </p>

            <div className="flex justify-center">
              <a href="https://calendly.com/peak-dev-agency/30min" target="_blank" className="group px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-base hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <div className="flex items-start justify-center overflow-hidden h-6 gap-1.5">
                  {["Lancez", "mon", "projet"].map((word, i) => (
                    <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-6" style={{ transitionDelay: `${i * 50}ms` }}>
                      <span className="h-6 flex items-center leading-none">{word}</span>
                      <span className="h-6 flex items-center leading-none">{word}</span>
                    </div>
                  ))}
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-6 ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                    <div className="h-6 flex items-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                    <div className="h-6 flex items-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">Peak</div>
              <p className="text-gray-500 max-w-xs">Le partenaire de confiance pour lancer votre produit digital rapidement et sereinement.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black">Accueil</a></li>
                <li><a href="#" className="hover:text-black">Services</a></li>
                <li><a href="#" className="hover:text-black">Projets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black">Mentions légales</a></li>
                <li><a href="#" className="hover:text-black">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-50">
            © {new Date().getFullYear()} Peak Agency. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Sticky Button */}
      <a
        href="https://wa.me/33783379419?text=Bonjour%2C%20je%20souhaite%20vous%20contacter%20au%20sujet%20d%27une%20landing%20page%2C%20d%27un%20MVP%2C%20d%27un%20SaaS%20ou%20d%27un%20site%20vitrine."
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${showWhatsApp ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
