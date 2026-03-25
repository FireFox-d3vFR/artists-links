"use client";

import { useState } from "react";

import { ArtistDetailsPanel } from "@/features/artist-search/components/artist-details-panel";
import { ArtistSearchPanel } from "@/features/artist-search/components/artist-search-panel";
import type {
  ArtistDetails,
  ArtistDetailsResponse,
  ArtistErrorResponse,
  ArtistListItem,
} from "@/types/artists/artist.types";

// Ce conteneur orchestre la recherche et l'affichage du détail d'un artiste.
// Il sert de point d'entrée frontend avant l'intégration du graphe.
export function ArtistExplorer() {
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string | null>(null);
  const [selectedArtistDetails, setSelectedArtistDetails] =
    useState<ArtistDetails | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsErrorMessage, setDetailsErrorMessage] = useState<string | null>(null);

  async function handleArtistSelect(artist: ArtistListItem) {
    setSelectedArtistSlug(artist.slug);
    setIsDetailsLoading(true);
    setDetailsErrorMessage(null);

    try {
      const response = await fetch(`/api/artists/${artist.slug}`);

      if (!response.ok) {
        const errorPayload = (await response.json()) as ArtistErrorResponse;
        throw new Error(errorPayload.error || "Impossible de charger la fiche artiste.");
      }

      const payload = (await response.json()) as ArtistDetailsResponse;
      setSelectedArtistDetails(payload.data);
    } catch (error) {
      setSelectedArtistDetails(null);
      setDetailsErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de charger la fiche artiste.",
      );
    } finally {
      setIsDetailsLoading(false);
    }
  }

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:items-start">
      <ArtistSearchPanel
        selectedArtistSlug={selectedArtistSlug}
        onArtistSelect={handleArtistSelect}
      />

      <ArtistDetailsPanel
        artist={selectedArtistDetails}
        isLoading={isDetailsLoading}
        errorMessage={detailsErrorMessage}
        onArtistSelect={handleArtistSelect}
      />
    </div>
  );
}
