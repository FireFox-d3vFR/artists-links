import type { ArtistDetails } from "@/types/artists/artist.types";
import type { ArtistGraphData, GraphEdge, GraphNode } from "@/types/graph/graph.types";

const DEFAULT_NODE_COLOR = "#64748b";

// Cette fonction transforme la fiche artiste en données de graphe simples.
// On part d'un graphe local centré sur l'artiste sélectionné et ses liens directs.
export function buildArtistGraphData(artist: ArtistDetails): ArtistGraphData {
  const nodeMap = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  nodeMap.set(artist.id, {
    id: artist.id,
    label: artist.name,
    color: artist.primaryGenre?.color ?? DEFAULT_NODE_COLOR,
    slug: artist.slug,
    isCentral: true,
  });

  for (const link of artist.outgoingCollaborations) {
    nodeMap.set(link.artist.id, {
      id: link.artist.id,
      label: link.artist.name,
      color: link.artist.primaryGenre?.color ?? DEFAULT_NODE_COLOR,
      slug: link.artist.slug,
    });

    edges.push({
      id: `outgoing-${link.id}`,
      source: artist.id,
      target: link.artist.id,
      label: link.contextLabel,
    });
  }

  for (const link of artist.incomingCollaborations) {
    nodeMap.set(link.artist.id, {
      id: link.artist.id,
      label: link.artist.name,
      color: link.artist.primaryGenre?.color ?? DEFAULT_NODE_COLOR,
      slug: link.artist.slug,
    });

    edges.push({
      id: `incoming-${link.id}`,
      source: link.artist.id,
      target: artist.id,
      label: link.contextLabel,
    });
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges,
  };
}
