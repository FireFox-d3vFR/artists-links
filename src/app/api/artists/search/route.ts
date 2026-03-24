import { NextResponse } from "next/server";

import { searchArtists } from "@/server/artists/artist.repository";

// Cette route expose une recherche simple d'artistes pour la future barre centrale.
// On garde volontairement une validation minimale pour avancer par petites étapes.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({
      data: [],
    });
  }

  const artists = await searchArtists(query);

  return NextResponse.json({
    data: artists,
  });
}
