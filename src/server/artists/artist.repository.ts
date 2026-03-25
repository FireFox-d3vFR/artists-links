import { prisma } from "@/lib/prisma";
import type {
  ArtistDetails,
  ArtistListItem,
} from "@/types/artists/artist.types";

// Ce module regroupe les accès aux données liés aux artistes.
// On garde ici des requêtes simples et lisibles pour poser une base saine.
export async function listArtists(): Promise<ArtistListItem[]> {
  return prisma.artist.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryGenre: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });
}

// Cette recherche couvre les cas les plus simples pour la future barre de recherche.
// On interroge à la fois le nom et le slug pour rester souple côté UX.
export async function searchArtists(query: string): Promise<ArtistListItem[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  return prisma.artist.findMany({
    where: {
      OR: [
        {
          name: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryGenre: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
    take: 10,
  });
}

// Cette requête prépare le futur panneau de détail d'un artiste.
// Elle récupère l'artiste demandé ainsi que ses liens directs entrants et sortants.
export async function getArtistDetailsBySlug(
  slug: string,
): Promise<ArtistDetails | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const artist = await prisma.artist.findUnique({
    where: {
      slug: normalizedSlug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryGenre: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
      outgoingLinks: {
        orderBy: {
          targetArtist: {
            name: "asc",
          },
        },
        select: {
          id: true,
          contextLabel: true,
          targetArtist: {
            select: {
              id: true,
              name: true,
              slug: true,
              primaryGenre: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
              },
            },
          },
        },
      },
      incomingLinks: {
        orderBy: {
          sourceArtist: {
            name: "asc",
          },
        },
        select: {
          id: true,
          contextLabel: true,
          sourceArtist: {
            select: {
              id: true,
              name: true,
              slug: true,
              primaryGenre: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!artist) {
    return null;
  }

  return {
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    primaryGenre: artist.primaryGenre,
    outgoingCollaborations: artist.outgoingLinks.map((link) => ({
      id: link.id,
      contextLabel: link.contextLabel,
      artist: link.targetArtist,
    })),
    incomingCollaborations: artist.incomingLinks.map((link) => ({
      id: link.id,
      contextLabel: link.contextLabel,
      artist: link.sourceArtist,
    })),
  };
}
