-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "pigThoughts" TEXT,
    "internalLink" TEXT NOT NULL,
    "email" TEXT,
    "quote" TEXT,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVisibile" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Author" ("email", "id", "internalLink", "joinDate", "name", "pigThoughts", "quote", "role") SELECT "email", "id", "internalLink", "joinDate", "name", "pigThoughts", "quote", "role" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
