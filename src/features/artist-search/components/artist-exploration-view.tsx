import { ArtistGraph } from "@/features/artist-graph/components/artist-graph";
import { buildArtistGraphData } from "@/features/artist-graph/lib/build-artist-graph-data";
import { ArtistOverviewPanel } from "@/features/artist-search/components/artist-overview-panel";
import type { ArtistDetails, ArtistListItem } from "@/types/artists/artist.types";

type ArtistExplorationViewProps = {
  artist: ArtistDetails | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onArtistSelect?: (artist: ArtistListItem) => void;
};

// Cette vue devient l'écran principal une fois qu'un artiste a été sélectionné.
// Le graphe occupe la zone centrale et la fiche reste accessible dans un panneau latéral.
export function ArtistExplorationView({
  artist,
  isLoading = false,
  errorMessage = null,
  onArtistSelect,
}: ArtistExplorationViewProps) {
  if (!artist && !isLoading && !errorMessage) {
    return null;
  }

  const graphData = artist ? buildArtistGraphData(artist) : null;

  return (
    <section className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
      <div className="min-w-0">
        {artist && graphData ? (
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
        ) : (
          <div className="flex h-[620px] items-center justify-center rounded-[2rem] border border-white/10 bg-black/20 px-6 text-center shadow-xl shadow-black/20">
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Sélectionne un artiste pour afficher son graphe de collaborations.
            </p>
          </div>
        )}
      </div>

      <ArtistOverviewPanel
        artist={artist}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onArtistSelect={onArtistSelect}
      />
    </section>
  );
}
