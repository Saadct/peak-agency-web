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

  const projects = [
    {
      title: "Peakfast",
      description: "Peakfast est un service logistique qui facilite la vie des e-commerçants en leur permettant de scaler sereinement sans soucis de logistique. Notre mission ? Réaliser un design à la hauteur de leur promesse et créer une valeur perçue si grande qu'elle creuse un fossé incommensurable entre Peakfast et ses concurrents.",
      tags: ["Design", "Landing page", "Full animations", "Offre Pulsor+", "Service de logistique"],
      imageColor: "bg-slate-900",
      logoColor: "bg-slate-900",
      imageText: "Projet Peakfast",
      borderColor: "border-slate-800"
    },
    {
      title: "Kalyps",
      description: "Une plateforme d'analytics nouvelle génération pour les créateurs de contenu. Kalyps agrège toutes vos données en un seul endroit pour une prise de décision éclairée et rapide.",
      tags: ["SaaS", "Dashboard", "Analytics", "React", "Node.js"],
      imageColor: "bg-indigo-600",
      logoColor: "bg-indigo-600",
      imageText: "Projet Kalyps",
      borderColor: "border-indigo-500"
    },
    {
      title: "Mirakle",
      description: "Mirakle révolutionne les créatives avec un style plus dynamique et authentique, conçu spécialement pour capter l'attention. Pour cette V2, notre objectif était clair : mettre en avant l'énergie et la créativité.",
      tags: ["Landing page", "Offre Pulsor", "Agence"],
      imageColor: "bg-blue-600",
      logoColor: "bg-blue-600",
      imageText: "Projet Mirakle",
      borderColor: "border-blue-500"
    },
    {
      title: "Flowbase",
      description: "Un outil de gestion de workflow nouvelle génération. Flowbase permet aux équipes de collaborer efficacement et d'automatiser leurs processus métier.",
      tags: ["SaaS", "Workflow", "Automation", "B2B"],
      imageColor: "bg-emerald-600",
      logoColor: "bg-emerald-600",
      imageText: "Projet Flowbase",
      borderColor: "border-emerald-500"
    },
    {
      title: "Nextera",
      description: "Une solution e-commerce complète pour les marques ambitieuses. Nextera combine design premium et fonctionnalités avancées pour maximiser les conversions.",
      tags: ["E-commerce", "Design", "Conversion", "Shopify"],
      imageColor: "bg-orange-600",
      logoColor: "bg-orange-600",
      imageText: "Projet Nextera",
      borderColor: "border-orange-500"
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
        <div className="container mx-auto px-6 md:px-32 lg:px-48 h-16 flex items-center justify-center md:justify-between relative">
          <div className="flex items-center gap-2 font-bold font-heading text-xl">
            <div className="w-9 h-9 bg-black rounded-lg text-white flex items-center justify-center shadow-[-4px_4px_8px_rgba(0,0,0,0.3)]">P</div>
            <span>Peak</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500 absolute left-1/2 -translate-x-1/2">
            <a href="#problem" className="hover:text-black transition-colors">Problème</a>
            <a href="#features" className="hover:text-black transition-colors">Solutions</a>
            <a href="#offer" className="hover:text-black transition-colors">Offre</a>
          </nav>
          <button className="group hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-xl bg-white text-black text-sm font-medium border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-md">
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
          </button>
        </div>
      </header>

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">

            {/* Background Designs (Sides Only - Smaller & Distributed) */}

            {/* --- Left Column --- */}
            {/* Top Left */}
            <div className="absolute -top-16 left-12 hidden xl:block opacity-100 hover:opacity-90 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-1.png" alt="Design 1" width={0} height={0} sizes="100vw" style={{ width: '90px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Upper Mid Left */}
            <div className="absolute top-[70%] left-56 hidden xl:block opacity-100 hover:opacity-50 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-6.png" alt="Design 6" width={0} height={0} sizes="100vw" style={{ width: '70px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Lower Mid Left */}
            <div className="absolute bottom-72 left-28 hidden xl:block opacity-100 hover:opacity-80 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-4.jpg" alt="Design 4" width={0} height={0} sizes="100vw" style={{ width: '80px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>

            {/* --- Right Column --- */}
            {/* Top Right */}
            <div className="absolute -top-16 right-20 hidden xl:block opacity-100 hover:opacity-75 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-3.png" alt="Design 3" width={0} height={0} sizes="100vw" style={{ width: '100px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Mid Right */}
            <div className="absolute -bottom-16 right-56 hidden xl:block opacity-100 hover:opacity-80 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-5.png" alt="Design 5" width={0} height={0} sizes="100vw" style={{ width: '70px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>
            {/* Lower Mid Right */}
            <div className="absolute top-[50%] -translate-y-1/2 right-36 hidden xl:block opacity-100 hover:opacity-70 transition-opacity duration-700 pointer-events-none select-none z-0">
              <Image src="/assets/hero-design-2.png" alt="Design 2" width={0} height={0} sizes="100vw" style={{ width: '100px', height: 'auto' }} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100/50" />
            </div>

            {/* Main Hero Content */}
            <div className="relative z-10">


              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.15] font-heading text-slate-900">
                Lancez votre solution <span className="text-slate-900">SaaS</span> & <span className="text-slate-900">MVP</span> en jours, pas en mois
              </h1>

              <p className="text-base text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                Design, développement et hébergement sécurisé en Europe, prêt à l’usage et à tester vos premiers utilisateurs
              </p>

              <div className="flex flex-col gap-8 justify-center items-center mt-14">
                <button className="group px-5 py-2 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                  <div className="flex items-start justify-center overflow-hidden h-8 gap-1">
                    {["Lancez", "mon", "projet"].map((word, i) => (
                      <div key={i} className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-8" style={{ transitionDelay: `${i * 50}ms` }}>
                        <span className="h-8 flex items-center leading-none">{word}</span>
                        <span className="h-8 flex items-center leading-none">{word}</span>
                      </div>
                    ))}
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-8 ml-1" style={{ transitionDelay: `${3 * 50}ms` }}>
                      <div className="h-8 flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                      <div className="h-8 flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </div>
                    </div>
                  </div>
                </button>

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
        <div className="w-[750px] mx-auto h-px bg-gradient-to-r from-transparent via-[#0A3A69] to-transparent opacity-30 my-20" />

        {/* SECTION 2: PROJECTS CAROUSEL */}
        <section id="problem" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-32 lg:px-48">
            {/* Header */}
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 leading-tight mb-6 text-left">
                Un SaaS qui prend des <span className="text-gray-400">"mois"</span> à lancer ?<br />
                Ce n'est plus possible.
              </h2>
              <p className="text-xl text-gray-500 font-medium mb-8 text-left">
                Vos concurrents sont déjà passés à l'action.
              </p>
              <div className="flex justify-start">
                <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg">
                  Réservez un appel
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image Block with Animation */}
              <div className="relative h-[360px] w-full overflow-hidden flex items-center justify-center">

                {/* Container that slides - simplified to 3 blocks */}
                <div
                  className={`flex flex-col gap-6 w-full min-w-[450px] ${isAnimating ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
                  style={{
                    transform: isAnimating
                      ? (animationDirection === 'next' ? 'translateY(-304px)' : 'translateY(304px)')
                      : 'translateY(0px)',
                    willChange: 'transform'
                  }}
                >

                  {/* Previous Block (n-1) - For PREV animation */}
                  <div className={`h-[280px] w-full rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border
                    ${currentProject > 0 ? `${projects[currentProject - 1].imageColor} ${projects[currentProject - 1].borderColor || ''}` : 'bg-transparent border-transparent shadow-none'}`}>
                    <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">
                      {currentProject > 0 ? projects[currentProject - 1].imageText : ''}
                    </span>
                  </div>

                  {/* Main Image Block (current) - COLORFUL */}
                  <div className={`h-[280px] w-full rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border ${projects[currentProject].imageColor} ${projects[currentProject].borderColor || ''}`}>
                    <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">{projects[currentProject].imageText}</span>
                  </div>

                  {/* Next Block (n+1) - For NEXT animation */}
                  <div className={`h-[280px] w-full rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border
                    ${currentProject < projects.length - 1 ? `${projects[currentProject + 1].imageColor} ${projects[currentProject + 1].borderColor || ''}` : 'bg-transparent border-transparent shadow-none'}`}>
                    <span className="text-gray-100 font-medium relative z-10 text-xl tracking-wide">
                      {currentProject < projects.length - 1 ? projects[currentProject + 1].imageText : ''}
                    </span>
                  </div>

                </div>
              </div>

              {/* Swipe Control (Apple-style) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 p-1.5 bg-white/80 backdrop-blur-sm shadow-xl rounded-full border border-white/50 z-20">
                <button
                  onClick={prevProject}
                  disabled={currentProject <= 0}
                  className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all
                    ${currentProject <= 0
                      ? 'text-gray-200 cursor-not-allowed opacity-50'
                      : 'text-gray-400 hover:text-black hover:scale-110 active:scale-95'
                    }
                  `}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={nextProject}
                  disabled={currentProject >= projects.length - 1}
                  className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all
                    ${currentProject >= projects.length - 1
                      ? 'text-gray-200 cursor-not-allowed opacity-50'
                      : 'text-gray-400 hover:text-black hover:scale-110 active:scale-95'
                    }
                  `}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Right: Text Block */}
              <div>
                {/* Title with logo */}
                <div className={`flex items-center gap-4 mb-6 transition-all duration-400 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  style={{ transitionDelay: isAnimating ? '0ms' : '200ms', transitionDuration: '400ms' }}>
                  <div className={`w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center`}>
                    <div className={`w-6 h-6 ${projects[currentProject].logoColor} rotate-45 rounded-sm`}></div>
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 font-heading">{projects[currentProject].title}</h3>
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

        {/* SECTION 3: PERFORMANCE / BENTO - "Conçu pour performer" */}
        <section id="features" className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Conçu pour performer.<br />Taillé pour durer.</h2>
              <div className="flex items-center justify-center gap-4 mt-8">
                <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium">Design System</button>
                <button className="px-6 py-2 bg-white text-gray-500 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50">Tech Stack</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Feature Large 1 */}
              <div className="aspect-[4/3] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Vitesse d'exécution</h3>
                  <p className="text-gray-500">Nous utilisons les meilleurs outils pour réduire le temps de développement sans sacrifier la qualité.</p>
                </div>
                <div className="mt-6 bg-gray-50 rounded-xl h-32 w-full"></div>
              </div>

              {/* Feature Large 2 */}
              <div className="aspect-[4/3] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Scalabilité immédiate</h3>
                  <p className="text-gray-500">Architecture pensée pour encaisser la croissance de 0 à 1M d'utilisateurs.</p>
                </div>
                <div className="mt-6 bg-gray-50 rounded-xl h-32 w-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: COMPLEXITY / BENTO GRID */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nous gérons la <span className="text-gray-400 line-through decoration-2">complexité</span>.<br />Concentrez-vous sur l'essentiel.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="md:col-span-2 h-64 bg-gray-100 rounded-3xl p-8 flex items-end">
                <span className="font-bold text-xl">Intégrations API & Paiements</span>
              </div>
              <div className="h-64 bg-gray-100 rounded-3xl p-8 flex items-end">
                <span className="font-bold text-xl">Auth & Sécurité</span>
              </div>
              <div className="h-64 bg-gray-100 rounded-3xl p-8 flex items-end">
                <span className="font-bold text-xl">Analytics</span>
              </div>
              <div className="md:col-span-2 h-64 bg-gray-100 rounded-3xl p-8 flex items-end">
                <span className="font-bold text-xl">Dashboard Admin</span>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button className="px-8 py-3 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Voir toutes les fonctionnalités
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: OFFRE */}
        <section id="offer" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-2">Notre offre</h2>
              <p className="text-gray-500">Simple, transparente et adaptée à votre stade de croissance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Plan {i}</div>
                  <div className="text-3xl font-bold mb-6">{i === 1 ? 'MVP' : i === 2 ? 'Growth' : 'Scale'}</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {[1, 2, 3, 4].map((j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Feature {j} included
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
                    Choisir ce plan
                  </button>
                </div>
              ))}
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
    </div>
  );
}
