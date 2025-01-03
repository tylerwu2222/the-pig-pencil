/*
  Warnings:

  - Made the column `publicUrl` on table `Art` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Art" ALTER COLUMN "publicUrl" SET NOT NULL,
ALTER COLUMN "publicUrl" SET DEFAULT '';
