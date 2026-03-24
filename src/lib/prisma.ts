import { PrismaClient } from "@prisma/client";

// Cette variable globale évite de recréer plusieurs instances du client Prisma
// pendant le rechargement à chaud en développement.
declare global {
  var prisma: PrismaClient | undefined;
}

// Ce module centralise l'accès à Prisma pour garder une seule instance réutilisable
// dans toute l'application.
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
