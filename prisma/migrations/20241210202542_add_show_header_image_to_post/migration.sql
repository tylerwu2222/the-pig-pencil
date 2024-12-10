-- DropForeignKey
ALTER TABLE "AuthorsOnTags" DROP CONSTRAINT "TagsOnAuthors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorsOnTags" DROP CONSTRAINT "TagsOnAuthors_tagId_fkey";

-- DropForeignKey
ALTER TABLE "PostsOnTags" DROP CONSTRAINT "TagsOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostsOnTags" DROP CONSTRAINT "TagsOnPosts_tagId_fkey";

-- AlterTable
ALTER TABLE "AuthorsOnTags" RENAME CONSTRAINT "TagsOnAuthors_pkey" TO "AuthorsOnTags_pkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "showHeaderImage" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "PostsOnTags" RENAME CONSTRAINT "TagsOnPosts_pkey" TO "PostsOnTags_pkey";

-- AddForeignKey
ALTER TABLE "AuthorsOnTags" ADD CONSTRAINT "AuthorsOnTags_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnTags" ADD CONSTRAINT "AuthorsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTags" ADD CONSTRAINT "PostsOnTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTags" ADD CONSTRAINT "PostsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
