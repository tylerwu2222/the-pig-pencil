-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isSharable" BOOLEAN DEFAULT true,
ADD COLUMN     "showViews" BOOLEAN DEFAULT true;
