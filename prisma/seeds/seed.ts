import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ce seed crée un petit jeu de données de démonstration pour valider
// la recherche d'artistes, le détail d'un artiste et les premiers liens directs.
async function main() {
  const rap = await prisma.genre.upsert({
    where: { name: "Rap" },
    update: {
      color: "#2563eb",
    },
    create: {
      name: "Rap",
      color: "#2563eb",
    },
  });

  const afro = await prisma.genre.upsert({
    where: { name: "Afro" },
    update: {
      color: "#f59e0b",
    },
    create: {
      name: "Afro",
      color: "#f59e0b",
    },
  });

  const sch = await prisma.artist.upsert({
    where: { slug: "sch" },
    update: {
      name: "SCH",
      primaryGenreId: rap.id,
    },
    create: {
      name: "SCH",
      slug: "sch",
      primaryGenreId: rap.id,
    },
  });

  const ninho = await prisma.artist.upsert({
    where: { slug: "ninho" },
    update: {
      name: "Ninho",
      primaryGenreId: rap.id,
    },
    create: {
      name: "Ninho",
      slug: "ninho",
      primaryGenreId: rap.id,
    },
  });

  const damso = await prisma.artist.upsert({
    where: { slug: "damso" },
    update: {
      name: "Damso",
      primaryGenreId: rap.id,
    },
    create: {
      name: "Damso",
      slug: "damso",
      primaryGenreId: rap.id,
    },
  });

  const burnaBoy = await prisma.artist.upsert({
    where: { slug: "burna-boy" },
    update: {
      name: "Burna Boy",
      primaryGenreId: afro.id,
    },
    create: {
      name: "Burna Boy",
      slug: "burna-boy",
      primaryGenreId: afro.id,
    },
  });

  await prisma.collaboration.upsert({
    where: {
      sourceArtistId_targetArtistId: {
        sourceArtistId: sch.id,
        targetArtistId: ninho.id,
      },
    },
    update: {
      contextLabel: "Autour du rap francophone",
    },
    create: {
      sourceArtistId: sch.id,
      targetArtistId: ninho.id,
      contextLabel: "Autour du rap francophone",
    },
  });

  await prisma.collaboration.upsert({
    where: {
      sourceArtistId_targetArtistId: {
        sourceArtistId: sch.id,
        targetArtistId: damso.id,
      },
    },
    update: {
      contextLabel: "Pont rap sombre et mélodique",
    },
    create: {
      sourceArtistId: sch.id,
      targetArtistId: damso.id,
      contextLabel: "Pont rap sombre et mélodique",
    },
  });

  await prisma.collaboration.upsert({
    where: {
      sourceArtistId_targetArtistId: {
        sourceArtistId: damso.id,
        targetArtistId: burnaBoy.id,
      },
    },
    update: {
      contextLabel: "Ouverture afro et internationale",
    },
    create: {
      sourceArtistId: damso.id,
      targetArtistId: burnaBoy.id,
      contextLabel: "Ouverture afro et internationale",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erreur pendant le seed Prisma :", error);
    await prisma.$disconnect();
    process.exit(1);
  });
