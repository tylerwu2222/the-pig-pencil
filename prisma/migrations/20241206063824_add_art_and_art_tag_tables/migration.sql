-- CreateTable
CREATE TABLE "Art" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "series" TEXT,
    "slug" TEXT,
    "thumbnail" TEXT,
    "publishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "visibility" TEXT NOT NULL DEFAULT 'hidden'
);

-- CreateTable
CREATE TABLE "ArtTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artTagName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ArtTagsOnArt" (
    "artId" TEXT NOT NULL,
    "artTagId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("artTagId", "artId"),
    CONSTRAINT "ArtTagsOnArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtTagsOnArt_artTagId_fkey" FOREIGN KEY ("artTagId") REFERENCES "ArtTag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
