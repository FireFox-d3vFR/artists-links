import { ArtistGenreBadge } from "@/components/artists/artist-genre-badge";
import type { ArtistDetails, ArtistListItem } from "@/types/artists/artist.types";

type ArtistOverviewPanelProps = {
  artist: ArtistDetails | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onArtistSelect?: (artist: ArtistListItem) => void;
};

// Ce composant affiche la fiche latérale de l'artiste sélectionné.
// Il est séparé du graphe pour permettre une vraie vue d'exploration en deux zones.
export function ArtistOverviewPanel({
  artist,
  isLoading = false,
  errorMessage = null,
  onArtistSelect,
}: ArtistOverviewPanelProps) {
  if (isLoading) {
    return (
      <aside className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-slate-300">Chargement de la fiche artiste...</p>
      </aside>
    );
  }

  if (errorMessage) {
    return (
      <aside className="rounded-[2rem] border border-red-400/30 bg-red-500/10 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-red-100">{errorMessage}</p>
      </aside>
    );
  }

  if (!artist) {
    return (
      <aside className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-slate-300">
          Sélectionne un artiste pour afficher sa fiche et ses connexions directes.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Artiste sélectionné
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{artist.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{artist.slug}</p>
          </div>

          <ArtistGenreBadge genre={artist.primaryGenre} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-7">
        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
            Collaborations sortantes
          </h3>

          {artist.outgoingCollaborations.length > 0 ? (
            <div className="space-y-3">
              {artist.outgoingCollaborations.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onArtistSelect?.(link.artist)}
                  className="w-full rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-white">
                        {link.artist.name}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">{link.artist.slug}</p>
                    </div>

                    <ArtistGenreBadge genre={link.artist.primaryGenre} />
                  </div>

                  {link.contextLabel ? (
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {link.contextLabel}
                    </p>
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Aucune collaboration sortante disponible.
            </p>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-200">
            Collaborations entrantes
          </h3>

          {artist.incomingCollaborations.length > 0 ? (
            <div className="space-y-3">
              {artist.incomingCollaborations.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onArtistSelect?.(link.artist)}
                  className="w-full rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-white">
                        {link.artist.name}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">{link.artist.slug}</p>
                    </div>

                    <ArtistGenreBadge genre={link.artist.primaryGenre} />
                  </div>

                  {link.contextLabel ? (
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {link.contextLabel}
                    </p>
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Aucune collaboration entrante disponible.
            </p>
          )}
        </section>
      </div>
    </aside>
  );
}
