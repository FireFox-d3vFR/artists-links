export type GraphNode = {
  id: string;
  label: string;
  color: string;
  slug?: string;
  isCentral?: boolean;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  label?: string | null;
};

export type ArtistGraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
