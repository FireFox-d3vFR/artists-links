-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "primaryGenreId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaboration" (
    "id" TEXT NOT NULL,
    "sourceArtistId" TEXT NOT NULL,
    "targetArtistId" TEXT NOT NULL,
    "contextLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collaboration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_slug_key" ON "Artist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Collaboration_sourceArtistId_idx" ON "Collaboration"("sourceArtistId");

-- CreateIndex
CREATE INDEX "Collaboration_targetArtistId_idx" ON "Collaboration"("targetArtistId");

-- CreateIndex
CREATE UNIQUE INDEX "Collaboration_sourceArtistId_targetArtistId_key" ON "Collaboration"("sourceArtistId", "targetArtistId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_primaryGenreId_fkey" FOREIGN KEY ("primaryGenreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_sourceArtistId_fkey" FOREIGN KEY ("sourceArtistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_targetArtistId_fkey" FOREIGN KEY ("targetArtistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
