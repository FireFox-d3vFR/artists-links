"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

import type { GraphNode, ArtistGraphData } from "@/types/graph/graph.types";

type ArtistGraphProps = {
  data: ArtistGraphData;
  onNodeSelect?: (node: GraphNode) => void;
};

// Ce composant encapsule l'instance Cytoscape utilisée pour afficher
// le graphe local autour de l'artiste sélectionné.
export function ArtistGraph({ data, onNodeSelect }: ArtistGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...data.nodes.map((node) => ({
          data: {
            id: node.id,
            label: node.label,
            color: node.color,
            slug: node.slug ?? "",
            isCentral: node.isCentral ?? false,
          },
        })),
        ...data.edges.map((edge) => ({
          data: {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            label: edge.label ?? "",
          },
        })),
      ],
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "data(color)",
            color: "#f8fafc",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": 12,
            "font-weight": 600,
            "text-wrap": "wrap",
            "text-max-width": "90px",
            width: 52,
            height: 52,
            "border-width": 2,
            "border-color": "#e2e8f0",
          },
        },
        {
          selector: 'node[isCentral = "true"]',
          style: {
            width: 68,
            height: 68,
            "font-size": 14,
            "border-width": 3,
            "border-color": "#ffffff",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#94a3b8",
            "target-arrow-color": "#94a3b8",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            color: "#cbd5e1",
            "font-size": 10,
            "text-rotation": "autorotate",
            "text-background-color": "#020617",
            "text-background-opacity": 0.7,
            "text-background-padding": "3px",
          },
        },
      ],
      layout: {
        name: "cose",
        animate: false,
        padding: 24,
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
    });

    cy.on("tap", "node", (event) => {
      const tappedNode = event.target;
      const nodeId = tappedNode.data("id") as string;
      const nodeLabel = tappedNode.data("label") as string;
      const nodeColor = tappedNode.data("color") as string;
      const nodeSlug = tappedNode.data("slug") as string;
      const isCentral = (tappedNode.data("isCentral") as boolean) ?? false;

      onNodeSelect?.({
        id: nodeId,
        label: nodeLabel,
        color: nodeColor,
        slug: nodeSlug || undefined,
        isCentral,
      });
    });

    return () => {
      cy.destroy();
    };
  }, [data, onNodeSelect ?? null]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/20 p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Graphe local
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            Connexions directes
          </h3>
        </div>

        <p className="text-sm text-slate-400">
          {data.nodes.length} noeud(s) · {data.edges.length} lien(s)
        </p>
      </div>

      <div
        ref={containerRef}
        className="h-[420px] w-full rounded-[1.5rem] border border-white/10 bg-slate-950/70"
      />
    </div>
  );
}
