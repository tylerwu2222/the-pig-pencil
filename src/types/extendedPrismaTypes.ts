import { Post as PrismaPost, Author as PrismaAuthor, AuthorsOnPosts, AuthorsOnTags } from "@prisma/client";


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
  AuthorsOnTags?: AuthorsOnTags
}

// export interface AuthorWithCounts extends Author {

//   }
