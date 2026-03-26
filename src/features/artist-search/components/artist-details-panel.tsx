import { ArtistGenreBadge } from "@/components/artists/artist-genre-badge";
import { ArtistGraph } from "@/features/artist-graph/components/artist-graph";
import { buildArtistGraphData } from "@/features/artist-graph/lib/build-artist-graph-data";
import type { ArtistDetails, ArtistListItem } from "@/types/artists/artist.types";

type ArtistDetailsPanelProps = {
  artist: ArtistDetails | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onArtistSelect?: (artist: ArtistListItem) => void;
};

// Ce composant affiche le détail de l'artiste sélectionné.
// Il prépare le futur panneau d'exploration avant l'arrivée du graphe interactif.
export function ArtistDetailsPanel({
  artist,
  isLoading = false,
  errorMessage = null,
  onArtistSelect,
}: ArtistDetailsPanelProps) {
  if (isLoading) {
    return (
      <section className="w-full rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-slate-300">Chargement de la fiche artiste...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="w-full rounded-[2rem] border border-red-400/30 bg-red-500/10 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-red-100">{errorMessage}</p>
      </section>
    );
  }

  if (!artist) {
    return (
      <section className="w-full rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
        <p className="text-sm text-slate-300">
          Sélectionne un artiste dans les résultats pour afficher sa fiche, ses
          connexions directes et son graphe local.
        </p>
      </section>
    );
  }

  const graphData = buildArtistGraphData(artist);

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-left shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Artiste sélectionné
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{artist.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{artist.slug}</p>
            </div>

            <ArtistGenreBadge genre={artist.primaryGenre} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-white">
                          {link.artist.name}
                        </p>
                        <p className="text-sm text-slate-400">{link.artist.slug}</p>
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
              <p className="text-sm text-slate-400">
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
                    className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-white">
                          {link.artist.name}
                        </p>
                        <p className="text-sm text-slate-400">{link.artist.slug}</p>
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
              <p className="text-sm text-slate-400">
                Aucune collaboration entrante disponible.
              </p>
            )}
          </section>
        </div>
      </div>

      <ArtistGraph
        data={graphData}
        onNodeSelect={(node) => {
          if (!node.slug) {
            return;
          }

          const selectedNodeArtist: ArtistListItem = {
            id: node.id,
            name: node.label,
            slug: node.slug,
            primaryGenre:
              artist.id === node.id
                ? artist.primaryGenre
                : artist.outgoingCollaborations.find((link) => link.artist.id === node.id)
                    ?.artist.primaryGenre ??
                  artist.incomingCollaborations.find((link) => link.artist.id === node.id)
                    ?.artist.primaryGenre ??
                  null,
          };

          onArtistSelect?.(selectedNodeArtist);
        }}
      />
    </section>
  );
}
