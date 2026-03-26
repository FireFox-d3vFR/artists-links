type LandingHeroProps = {
  children: React.ReactNode;
};

// Ce composant représente l'écran d'accueil du produit.
// Il met en avant la promesse du projet avant l'entrée dans la vue d'exploration.
export function LandingHero({ children }: LandingHeroProps) {
  return (
    <section className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 rounded-[2rem] border border-white/10 bg-white/8 px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur md:px-12 md:py-14">
      <div className="flex max-w-3xl flex-col items-center gap-5">
        <span className="rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-1 text-sm font-medium tracking-[0.2em] uppercase text-blue-100">
          Cartographie musicale
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Explore les featuring d&apos;un artiste comme un graphe vivant
          </h1>

          <p className="max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            Recherche un artiste, découvre ses collaborations, puis ouvre le graphe
            de proche en proche pour faire apparaître les connexions entre styles,
            scènes et univers musicaux.
          </p>
        </div>
      </div>

      {children}

      <div className="grid w-full gap-4 pt-2 md:grid-cols-3">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
            Collaborations
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Identifier rapidement les artistes reliés à une même scène ou à un
            même morceau.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-200">
            Genres
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Donner une lecture visuelle des univers musicaux avec des couleurs et
            des regroupements clairs.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-200">
            Ouvertures
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Suivre les passerelles entre artistes pour révéler des proximités parfois
            inattendues.
          </p>
        </article>
      </div>
    </section>
  );
}
