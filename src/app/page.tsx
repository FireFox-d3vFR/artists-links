import { ArtistExplorer } from "@/features/artist-search/components/artist-explorer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#1f3b73_0%,_#0b1220_38%,_#050816_100%)] px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(59,130,246,0.18),_transparent_42%,_rgba(245,158,11,0.14)_100%)]" />

      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-[120%] rounded-full bg-blue-500/18 blur-3xl" />
      <div className="absolute bottom-16 left-1/2 h-80 w-80 translate-x-[12%] rounded-full bg-amber-400/14 blur-3xl" />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl justify-center">
        <ArtistExplorer />
      </section>
    </main>
  );
}
