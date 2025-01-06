-- CreateTable
CREATE TABLE "ArtTagsOnArtSeries" (
    "artSeriesId" TEXT NOT NULL,
    "artTagId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtTagsOnArtSeries_pkey" PRIMARY KEY ("artTagId","artSeriesId")
);

-- AddForeignKey
ALTER TABLE "ArtTagsOnArtSeries" ADD CONSTRAINT "ArtTagsOnArtSeries_artSeriesId_fkey" FOREIGN KEY ("artSeriesId") REFERENCES "ArtSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtTagsOnArtSeries" ADD CONSTRAINT "ArtTagsOnArtSeries_artTagId_fkey" FOREIGN KEY ("artTagId") REFERENCES "ArtTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
