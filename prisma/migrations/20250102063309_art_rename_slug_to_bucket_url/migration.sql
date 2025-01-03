/*
  Warnings:

  - You are about to drop the column `slug` on the `Art` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Art` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Art" DROP COLUMN "slug",
DROP COLUMN "thumbnail",
ADD COLUMN     "bucketURL" TEXT;
