"use client";

import { useState } from "react";

import { ArtistExplorationView } from "@/features/artist-search/components/artist-exploration-view";
import { ArtistSearchPanel } from "@/features/artist-search/components/artist-search-panel";
import { ExplorationHeader } from "@/features/artist-search/components/exploration-header";
import { LandingHero } from "@/features/artist-search/components/landing-hero";
import type {
  ArtistDetails,
  ArtistDetailsResponse,
  ArtistErrorResponse,
  ArtistListItem,
} from "@/types/artists/artist.types";

// Ce conteneur orchestre les deux états principaux de l'expérience :
// l'accueil centré sur la recherche, puis la vue d'exploration orientée graphe.
export function ArtistExplorer() {
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string | null>(null);
  const [selectedArtistDetails, setSelectedArtistDetails] =
    useState<ArtistDetails | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsErrorMessage, setDetailsErrorMessage] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const hasSelectedArtist = selectedArtistSlug !== null;

  async function handleArtistSelect(artist: ArtistListItem) {
    setSelectedArtistSlug(artist.slug);
    setIsPanelOpen(true);
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

  function handleResetExploration() {
    setSelectedArtistSlug(null);
    setSelectedArtistDetails(null);
    setDetailsErrorMessage(null);
    setIsDetailsLoading(false);
    setIsPanelOpen(true);
  }

  function handleClosePanel() {
    setIsPanelOpen(false);
  }

  function handleOpenPanel() {
    setIsPanelOpen(true);
  }

  if (!hasSelectedArtist) {
    return (
      <div className="flex w-full justify-center">
        <LandingHero>
          <ArtistSearchPanel onArtistSelect={handleArtistSelect} />
        </LandingHero>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8">
      <ExplorationHeader onResetExploration={handleResetExploration}>
        <ArtistSearchPanel
          variant="compact"
          selectedArtistSlug={selectedArtistSlug}
          onArtistSelect={handleArtistSelect}
        />
      </ExplorationHeader>

      <ArtistExplorationView
        artist={selectedArtistDetails}
        isLoading={isDetailsLoading}
        errorMessage={detailsErrorMessage}
        isPanelOpen={isPanelOpen}
        onClosePanel={handleClosePanel}
        onOpenPanel={handleOpenPanel}
        onArtistSelect={handleArtistSelect}
      />
    </div>
  );
}
