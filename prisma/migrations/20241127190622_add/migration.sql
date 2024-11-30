/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `internalLink` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AuthorLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AuthorsOnAuthorLinks" (
    "authorId" TEXT NOT NULL,
    "authorLinkId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("authorId", "authorLinkId"),
    CONSTRAINT "AuthorsOnAuthorLinks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AuthorsOnAuthorLinks_authorLinkId_fkey" FOREIGN KEY ("authorLinkId") REFERENCES "AuthorLink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthorsOnPosts" (
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("authorId", "postId"),
    CONSTRAINT "AuthorsOnPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AuthorsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagsOnPosts" (
    "tagId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tagId", "postId"),
    CONSTRAINT "TagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagsOnAuthors" (
    "tagId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tagId", "authorId"),
    CONSTRAINT "TagsOnAuthors_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "internalLink" TEXT NOT NULL,
    "email" TEXT,
    "quote" TEXT,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Author" ("email", "id", "joinDate", "name", "quote") SELECT "email", "id", "joinDate", "name", "quote" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT,
    "caption" TEXT,
    "readingTime" TEXT,
    "hasScrollspy" BOOLEAN DEFAULT true,
    "publishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "visibility" TEXT NOT NULL DEFAULT 'hidden'
);
INSERT INTO "new_Post" ("caption", "id", "publishDate", "thumbnail", "title", "updateDate", "visibility") SELECT "caption", "id", "publishDate", "thumbnail", "title", "updateDate", "visibility" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tagName" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "tagName") SELECT "id", "tagName" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
