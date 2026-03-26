type ExplorationHeaderProps = {
  children: React.ReactNode;
  onResetExploration: () => void;
};

// Ce composant correspond au header compact du mode exploration.
// Il remplace le hero d'accueil une fois qu'un artiste est sélectionné.
export function ExplorationHeader({
  children,
  onResetExploration,
}: ExplorationHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 px-5 py-4 shadow-xl shadow-black/20 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0 xl:max-w-xs">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Artists Links
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-white">
          Graphe de collaborations
        </h2>
      </div>

      <div className="flex w-full flex-col gap-3 xl:flex-1 xl:flex-row xl:items-center xl:justify-end">
        <div className="w-full xl:max-w-3xl">{children}</div>

        <button
          type="button"
          onClick={onResetExploration}
          className="self-end rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/8 xl:self-auto"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    </header>
  );
}
