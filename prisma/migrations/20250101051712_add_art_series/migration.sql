-- CreateTable
CREATE TABLE "ArtSeries" (
    "id" TEXT NOT NULL,
    "seriesTitle" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtSeriesOnArt" (
    "artId" TEXT NOT NULL,
    "artSeriesId" TEXT NOT NULL,

    CONSTRAINT "ArtSeriesOnArt_pkey" PRIMARY KEY ("artSeriesId","artId")
);

-- AddForeignKey
ALTER TABLE "ArtSeriesOnArt" ADD CONSTRAINT "ArtSeriesOnArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtSeriesOnArt" ADD CONSTRAINT "ArtSeriesOnArt_artSeriesId_fkey" FOREIGN KEY ("artSeriesId") REFERENCES "ArtSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
