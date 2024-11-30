/*
  Warnings:

  - Added the required column `section` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "thumbnail" TEXT,
    "caption" TEXT,
    "readingTime" TEXT,
    "hasScrollspy" BOOLEAN DEFAULT true,
    "publishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "visibility" TEXT NOT NULL DEFAULT 'hidden'
);
INSERT INTO "new_Post" ("caption", "hasScrollspy", "id", "publishDate", "readingTime", "thumbnail", "title", "updateDate", "visibility") SELECT "caption", "hasScrollspy", "id", "publishDate", "readingTime", "thumbnail", "title", "updateDate", "visibility" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
