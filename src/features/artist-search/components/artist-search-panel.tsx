"use client";

import { FormEvent, useState } from "react";

import { ArtistGenreBadge } from "@/components/artists/artist-genre-badge";
import type {
  ArtistListItem,
  ArtistSearchResponse,
} from "@/types/artists/artist.types";

type ArtistSearchPanelProps = {
  selectedArtistSlug?: string | null;
  onArtistSelect?: (artist: ArtistListItem) => void;
};

// Ce composant gère la première expérience de recherche côté frontend.
// On reste volontairement simple : saisie, appel API, chargement et rendu des résultats.
export function ArtistSearchPanel({
  selectedArtistSlug = null,
  onArtistSelect,
}: ArtistSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArtistListItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setResults([]);
      setHasSearched(false);
      setErrorMessage(null);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      setHasSearched(true);

      const response = await fetch(
        `/api/artists/search?q=${encodeURIComponent(normalizedQuery)}`,
      );

      if (!response.ok) {
        throw new Error("La recherche a échoué.");
      }

      const payload = (await response.json()) as ArtistSearchResponse;
      setResults(payload.data);
    } catch {
      setResults([]);
      setErrorMessage("Impossible de charger les résultats pour le moment.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="artist-search" className="sr-only">
          Rechercher un artiste
        </label>

        <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/12 bg-slate-950/45 p-3 shadow-lg shadow-black/20 md:flex-row md:items-center">
          <input
            id="artist-search"
            name="artist-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Exemple : SCH, Ninho, Damso..."
            className="h-14 flex-1 rounded-[1.1rem] border border-transparent bg-white/96 px-5 text-base text-slate-950 outline-none transition focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="h-14 rounded-[1.1rem] bg-blue-500 px-6 text-sm font-semibold tracking-wide text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-500/60"
          >
            {isLoading ? "Recherche..." : "Explorer"}
          </button>
        </div>
      </form>

      <p className="text-sm text-slate-300">
        La V1 commence par une recherche simple, avant l&apos;affichage du graphe
        interactif et des liens de collaboration.
      </p>

      {errorMessage ? (
        <div className="rounded-[1.25rem] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {errorMessage}
        </div>
      ) : null}

      {!errorMessage && hasSearched && !isLoading && results.length === 0 ? (
        <div className="rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          Aucun artiste ne correspond à cette recherche pour le moment.
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="grid gap-3">
          {results.map((artist) => {
            const isSelected = selectedArtistSlug === artist.slug;

            return (
              <button
                key={artist.id}
                type="button"
                onClick={() => onArtistSelect?.(artist)}
                className={`rounded-[1.5rem] border p-4 text-left shadow-lg shadow-black/10 transition ${
                  isSelected
                    ? "border-blue-400 bg-blue-500/15"
                    : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{artist.name}</h2>
                    <p className="text-sm text-slate-400">{artist.slug}</p>
                  </div>

                  <ArtistGenreBadge genre={artist.primaryGenre} />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
