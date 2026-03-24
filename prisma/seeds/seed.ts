import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ce seed crée un petit jeu de données de démonstration pour valider
// la recherche d'artistes et préparer les premiers tests de graphe.
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

  await prisma.artist.upsert({
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

  await prisma.artist.upsert({
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

  await prisma.artist.upsert({
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

  await prisma.artist.upsert({
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
