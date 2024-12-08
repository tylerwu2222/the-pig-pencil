import prisma from "@/db";

import { flattenJoinData } from "./prismaHelpers";
import { Post } from "@prisma/client";

// GETTERS
export const getPostBySlug = async (slug: string) => {
  const slugPost = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
    include: {
      AuthorsOnPosts: {
        select: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
      TagsOnPosts: {
        select: {
          tag: {
            select: {
              tagName: true,
            },
          },
        },
      },
    },
  });

  // error handling
  if (!slugPost) {
    return { error: "No post found with slug " + slug };
  }

  const formattedSectionPosts = flattenJoinData(slugPost, {
    AuthorsOnPosts: "authors",
    TagsOnPosts: "tags",
  });

  return formattedSectionPosts;
};

export const getAuthorIDByName = async (name: string) => {
  const authorByName = await prisma.author.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  const authorIDByName = authorByName?.id;

  return authorIDByName;
};

export const getTagIDByName = async (name: string) => {
  const tagByName = await prisma.tag.findFirst({
    where: {
      tagName: name,
    },
    select: {
      id: true,
    },
  });
  const tagIDByName = tagByName?.id;

  return tagIDByName;
};
// CREATE ONE
export const createPost = async (metadata: Post) => {
  const newPost = await prisma.post.create({
    data: metadata,
  });
  return newPost;
};

export const createAuthor = async (name: string) => {
  // const authorData = { name: name };
  // // const existingAuthors = await prisma.author.findMany();
  // await prisma.author.create({
  //     data: authorData,
  // })
};

// CREATE MANY
export const createManyTags = async (tagNames: string[]) => {
  // 1) create new tags in tag
  const tagsData = tagNames.map((t) => {
    return { tagName: t };
  });
  // get existing tags
  const existingTags = await prisma.tag.findMany({
    select: {
      tagName: true,
    },
  });
  const existingTagsData = existingTags.map((t) => t.tagName);
  // and use to filter for new tags
  const newTagsData = tagsData.filter(
    (t) => !existingTagsData.includes(t.tagName),
  );
  await prisma.tag.createMany({
    data: newTagsData,
  });
};

// CREATE CONNECTIONS
export const createTagsPostConnection = async (
  tagIds: string[],
  postId: string,
) => {
  const TagPostData = tagIds.map((t) => {
    return { tagId: t, postId: postId };
  });

  // console.log('tag post', TagPostData);
  await prisma.tagsOnPosts.createMany({
    data: TagPostData,
  });
};

export const createAuthorsPostConnection = async (
  authorIds: string[],
  postId: string,
) => {
  const AuthorPostData = authorIds.map((a) => {
    return { authorId: a, postId: postId };
  });

  await prisma.authorsOnPosts.createMany({
    data: AuthorPostData,
  });
};

export const createTagsAuthorConnection = async (
  tagIds: string[],
  authorIds: string[],
) => {
  // each combination of tags-authors
  const TagAuthorData = tagIds.flatMap((tag) =>
    authorIds.map((author) => ({ tagId: tag, authorId: author })),
  );

  // get existing tag-authors for all tags/authors
  const existingTagAuthors = await prisma.tagsOnAuthors.findMany({
    where: {
      OR: TagAuthorData.map((combo) => ({
        tagId: combo.tagId,
        authorId: combo.authorId,
      })),
    },
  });
  // and use to filter for new tag-author
  const existingTagAuthorsData = existingTagAuthors.map(
    (record) => `${record.tagId}-${record.authorId}`,
  );

  const newTagAuthorData = TagAuthorData.filter(
    (combo) =>
      !existingTagAuthorsData.includes(`${combo.tagId}-${combo.authorId}`),
  );
  // create Tag-Author connection
  await prisma.tagsOnAuthors.createMany({
    data: newTagAuthorData,
  });
};
