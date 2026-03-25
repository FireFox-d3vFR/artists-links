import { NextResponse } from "next/server";

import { getArtistDetailsBySlug } from "@/server/artists/artist.repository";

// Cette route retourne le détail d'un artiste à partir de son slug.
// Elle servira de base au futur panneau de détail et au graphe interactif.
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  const artist = await getArtistDetailsBySlug(slug);

  if (!artist) {
    return NextResponse.json(
      {
        error: "Artiste introuvable.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    data: artist,
  });
}
