import type { ArtistGenre } from "@/types/artists/artist.types";

type ArtistGenreBadgeProps = {
  genre: ArtistGenre | null;
};

// Ce composant mutualise l'affichage du genre principal d'un artiste.
// Il évite de dupliquer le rendu du badge dans plusieurs écrans.
export function ArtistGenreBadge({ genre }: ArtistGenreBadgeProps) {
  if (!genre) {
    return (
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
        Genre inconnu
      </span>
    );
  }

  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-medium text-white"
      style={{ backgroundColor: genre.color }}
    >
      {genre.name}
    </span>
  );
}
