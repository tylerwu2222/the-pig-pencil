/*
  Warnings:

  - Made the column `updateDate` on table `Art` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Art` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Art" ALTER COLUMN "updateDate" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
