import prisma from "@/db";

import { flattenJoinData } from "./prismaHelpers";
import { Post, Author } from "@prisma/client";
import {
  Post as PostExtended,
  Art as ArtExtended,
} from "@/types/extendedPrismaTypes";
import { getDashedString } from "../stringFormatting";

// GETTERS

// export const getPostById = async (id:string): Promise<PostExtended> => {
export const getPostById = async (id: string): Promise<Post> => {
  const idPost = await prisma.post.findFirst({
    where: {
      id: id,
    },
    // include: {
    //   AuthorsOnPosts: {
    //     select: {
    //       Author: {
    //         select: {
    //           name: true,
    //         },
    //       },
    //     },
    //   },
    //   PostsOnTags: {
    //     select: {
    //       Tag: {
    //         select: {
    //           tagName: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  // error handling
  if (!idPost) {
    console.log("No post found with id " + id);
  }

  // const formattedSectionPosts = flattenJoinData(idPost as any, {
  //   AuthorsOnPosts: "authors",
  //   PostsOnTags: "tags",
  // }) as PostExtended;

  return idPost as Post;
  // return formattedSectionPosts;
};

export const getPostBySlug = async (slug: string): Promise<PostExtended> => {
  const slugPost = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
    include: {
      AuthorsOnPosts: {
        select: {
          Author: {
            select: {
              name: true,
            },
          },
        },
      },
      PostsOnTags: {
        select: {
          Tag: {
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
    console.log("No post found with slug " + slug);
  }

  const formattedSectionPosts = flattenJoinData(slugPost as any, {
    AuthorsOnPosts: "authors",
    PostsOnTags: "tags",
  }) as PostExtended;

  return formattedSectionPosts;
};

export const getContentForSection = async (
  section: string,
): Promise<(Post | Author)[]> => {
  let res;
  if (section == "collaborators") {
    res = await fetch("/api/authors");
  }
  // else if (section == 'art'){

  // }
  else {
    res = await fetch(`/api/${section}/posts`);
  }
  const content = await res.json();
  console.log("BE: content", content);
  return content;
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

export const getArtSeriesIDByName = async (name: string) => {
  const artSeriesByName = await prisma.artSeries.findFirst({
    where: {
      seriesTitle: name,
    },
    select: {
      id: true,
    },
  });
  const artSeriesID = artSeriesByName?.id;
  if (artSeriesID) {
    return artSeriesID;
  } else {
    console.log("did not find id for series", name);
  }
};

// CREATE ONE
export const createPost = async (metadata: Post) => {
  const newPost = await prisma.post.create({
    data: metadata,
  });
  return newPost;
};

export const createAuthors = async (authorNames: string[]) => {
  const AuthorsData = authorNames.map((a) => {
    return {
      name: a,
      internalLink:
        "https://thepigpencil.com/collaborators/" + getDashedString(a),
    };
  });
  // const existingAuthors = await prisma.author.findMany();
  await prisma.author.createMany({
    data: AuthorsData,
    skipDuplicates: true,
  });
};

// CREATE MANY
export const createManyTags = async (tagNames: string[]) => {
  // create new tags
  const TagsData = tagNames.map((t) => {
    return { tagName: t };
  });
  // // get existing tags
  // const existingTags = await prisma.tag.findMany({
  //   select: {
  //     tagName: true,
  //   },
  // });
  // const existingTagsData = existingTags.map((t) => t.tagName);
  // // and use to filter for new tags
  // const newTagsData = tagsData.filter(
  //   (t) => !existingTagsData.includes(t.tagName),
  // );
  await prisma.tag.createMany({
    data: TagsData,
    skipDuplicates: true,
  });
};

// CREATE CONNECTIONS
export const createPostTagsConnection = async (
  tagIds: string[],
  postId: string,
) => {
  const TagPostData = tagIds.map((t) => {
    return { tagId: t, postId: postId };
  });

  // console.log('tag post data', TagPostData);
  await prisma.postsOnTags.createMany({
    data: TagPostData,
    skipDuplicates: true,
  });
};

export const createAuthorsPostConnection = async (
  authorIds: string[] | undefined,
  postId: string | undefined,
) => {
  if (!authorIds || !postId) {
    return;
  }
  const AuthorPostData = authorIds.map((a) => {
    return { authorId: a, postId: postId };
  });

  await prisma.authorsOnPosts.createMany({
    data: AuthorPostData,
    skipDuplicates: true,
  });
};

export const createAuthorsTagsConnection = async (
  tagIds: string[],
  authorIds: string[],
) => {
  // each combination of tags-authors
  const AuthorTagData = tagIds.flatMap((tag) =>
    authorIds.map((author) => ({ tagId: tag, authorId: author })),
  );

  // get existing tag-authors for all tags/authors
  // const existingTagAuthors = await prisma.authorsOnTags.findMany({
  //   where: {
  //     OR: AuthorTagData.map((combo) => ({
  //       tagId: combo.tagId,
  //       authorId: combo.authorId,
  //     })),
  //   },
  // });
  // // and use to filter for new tag-author
  // const existingTagAuthorsData = existingTagAuthors.map(
  //   (record) => `${record.tagId}-${record.authorId}`,
  // );

  // const newAuthorTagData = AuthorTagData.filter(
  //   (combo) =>
  //     !existingTagAuthorsData.includes(`${combo.tagId}-${combo.authorId}`),
  // );
  // create Tag-Author connection
  await prisma.authorsOnTags.createMany({
    data: AuthorTagData,
    skipDuplicates: true,
  });
};

export const createArtSeriesArtConnection = async (
  artIds: string[],
  artSeriesIds: string[],
) => {
  const ArtSeriesArtData = artIds.map((a, i) => {
    return { artId: a, artSeriesId: artSeriesIds[i] };
  });

  await prisma.artSeriesOnArt.createMany({
    data: ArtSeriesArtData,
    skipDuplicates: true,
  });
};

// UPDATE/UPSERT
// export const upsertPost = async (slug: string, metadata: Post) => {
//   await prisma.post.upsert({
//     where: {
//       slug: slug,
//     },
//     create: metadata,
//     update: metadata,
//   });
// };

export const updatePost = async (slug: string, metadata: PostExtended) => {
  // extract author and tags to handle seperately
  const { authors, tags, ...postMetadata } = metadata;

  // update post
  await prisma.post.update({
    where: {
      slug: slug,
    },
    data: postMetadata,
  });

  // get ids for making relations
  const post = await getPostBySlug(slug);
  const postId = post.id;
  const authorIds = await Promise.all(
    authors.map(async (a) => await getAuthorIDByName(a)),
  );
  const validAuthorIds = authorIds.filter(
    (id): id is string => id !== undefined,
  );
  const tagIds = await Promise.all(
    tags.map(async (t) => await getTagIDByName(t)),
  );
  const validTagIds = tagIds.filter((id): id is string => id !== undefined);

  // update post authors
  if (authors && authors.length > 0) {
    // first create any new authors
    await createAuthors(authors);
    if (validAuthorIds.length > 0) {
      await createAuthorsPostConnection(validAuthorIds, postId);
      console.log("updated author-post");
    }
  }

  // update post tags
  if (tags && tags.length > 0) {
    // first create any new tags
    await createManyTags(tags);
    if (validTagIds.length > 0) {
      await createPostTagsConnection(validTagIds, postId);
      console.log("updated post-tags");
    }
  }

  // update author tags
  if (authors && authors.length > 0 && tags && tags.length > 0) {
    await createAuthorsTagsConnection(validTagIds, validAuthorIds);
    console.log("updated authors-tags");
  }
};

export const updateArtSeries = async (
  folderNames: string[],
  thumbnails: string[],
) => {
  //
  const data = folderNames.map((name, index) => {
    return {
      seriesTitle: name,
      thumbnail: thumbnails[index],
      updateDate: new Date(),
    };
  });

  await prisma.artSeries.createMany({
    data: data,
    skipDuplicates: true,
  });
};

export const updateArt = async (artData: Partial<ArtExtended>[]) => {
  // console.log("art data to update", artData);

  // split out series id from
  const artDataNoConnections = artData.map(({ seriesId, ...rest }) => rest);

  // create data without series id
  await prisma.art.createMany({
    data: artDataNoConnections,
    skipDuplicates: true,
  });

  // create art-art series connections
  await createArtSeriesArtConnection(
    artData.map((d) => d.id) as string[],
    artData.map((d) => d.seriesId) as string[],
  );
};
