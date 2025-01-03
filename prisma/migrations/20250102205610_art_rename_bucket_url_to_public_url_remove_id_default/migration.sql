/*
  Warnings:

  - You are about to drop the column `bucketURL` on the `Art` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Art" DROP COLUMN "bucketURL",
ADD COLUMN     "publicUrl" TEXT;
