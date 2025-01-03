/*
  Warnings:

  - A unique constraint covering the columns `[seriesTitle]` on the table `ArtSeries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArtSeries_seriesTitle_key" ON "ArtSeries"("seriesTitle");
