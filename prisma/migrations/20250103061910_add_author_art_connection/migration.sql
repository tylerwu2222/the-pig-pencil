-- CreateTable
CREATE TABLE "AuthorsOnArt" (
    "authorId" TEXT NOT NULL,
    "artId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorsOnArt_pkey" PRIMARY KEY ("authorId","artId")
);

-- AddForeignKey
ALTER TABLE "AuthorsOnArt" ADD CONSTRAINT "AuthorsOnArt_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnArt" ADD CONSTRAINT "AuthorsOnArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
