import {
  Post as PrismaPost,
  Author as PrismaAuthor,
  AuthorsOnPosts,
  AuthorsOnTags,
  Art as PrismaArt,
  ArtSeries as PrismaArtSeries,
} from "@prisma/client";

export interface Post extends PrismaPost {
  authors: string[];
  tags: string[];
}

// extend original type with optional params that are added through joins
export interface Author extends PrismaAuthor {
  posts: string[];
  tags: string[];
  viewCount?: number;
  oinkCount?: number;
  postCount?: number;
  AuthorsOnPosts?: AuthorsOnPosts;
  AuthorsOnTags?: AuthorsOnTags;
}

export interface Art extends PrismaArt {
  seriesId: string;
  tags: string[]
}

export interface ArtSeries extends PrismaArtSeries {
  tags: string[];
}

// export interface AuthorWithCounts extends Author {

//   }
