import { ArtistExplorer } from "@/features/artist-search/components/artist-explorer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#1f3b73_0%,_#0b1220_38%,_#050816_100%)] px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(59,130,246,0.18),_transparent_42%,_rgba(245,158,11,0.14)_100%)]" />

      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-[120%] rounded-full bg-blue-500/18 blur-3xl" />
      <div className="absolute bottom-16 left-1/2 h-80 w-80 translate-x-[12%] rounded-full bg-amber-400/14 blur-3xl" />

      <section className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-10 rounded-[2rem] border border-white/10 bg-white/8 px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur md:px-12 md:py-14">
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

        <ArtistExplorer />

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
    </main>
  );
}
