export type ArtistGenre = {
  id: string;
  name: string;
  color: string;
};

export type ArtistListItem = {
  id: string;
  name: string;
  slug: string;
  primaryGenre: ArtistGenre | null;
};

export type ArtistCollaborationLink = {
  id: string;
  contextLabel: string | null;
  artist: ArtistListItem;
};

export type ArtistDetails = {
  id: string;
  name: string;
  slug: string;
  primaryGenre: ArtistGenre | null;
  outgoingCollaborations: ArtistCollaborationLink[];
  incomingCollaborations: ArtistCollaborationLink[];
};

export type ArtistSearchResponse = {
  data: ArtistListItem[];
};

export type ArtistDetailsResponse = {
  data: ArtistDetails;
};

export type ArtistErrorResponse = {
  error: string;
};
