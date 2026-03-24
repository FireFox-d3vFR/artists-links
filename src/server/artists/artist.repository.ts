import { prisma } from "@/lib/prisma";

type ArtistListItem = {
  id: string;
  name: string;
  slug: string;
  primaryGenre: {
    id: string;
    name: string;
    color: string;
  } | null;
};

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
