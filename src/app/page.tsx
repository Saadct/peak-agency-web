import Image from "next/image";

export default function Home() {
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

              <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                Design, développement et hébergement sécurisé en Europe, prêt à l’usage et à tester vos premiers utilisateurs
              </p>

              <div className="flex flex-col gap-8 justify-center items-center mt-4">
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

                <div className="flex flex-col items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {i === 5 ? '99+' : `U${i}`}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500 text-sm">★★★★★</div>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-slate-900">4.9/5</span> par plus de 50 entreprises
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* SECTION 2: PROBLEM */}
        <section id="problem" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-gray-50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
                {/* Visual placeholder for "Long Development Cycles" */}
                <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 group-hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
                    <div className="h-8 w-8 bg-red-50 text-red-500 rounded flex items-center justify-center text-xs">⚠️</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-50 rounded"></div>
                    <div className="h-2 w-full bg-gray-50 rounded"></div>
                    <div className="h-2 w-2/3 bg-gray-50 rounded"></div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <span className="text-xs text-gray-400">Délai dépassé de 3 mois...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-semibold text-sm mb-6">
                  Le problème
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Un SaaS qui prend des "mois" à lancer ? <br />
                  <span className="text-gray-400">Ce n'est plus possible.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Le marché n'attend pas. Chaque semaine perdue en développement est une opportunité manquée. Nous avons optimisé notre stack pour livrer de la valeur dès la première semaine.
                </p>
                <button className="text-black font-semibold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                  Découvrir notre méthode
                </button>
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
