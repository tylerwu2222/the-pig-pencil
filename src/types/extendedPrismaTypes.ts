import { Post as PrismaPost } from "@prisma/client";
import { Author as PrismaAuthor } from "@prisma/client";

export interface Post extends PrismaPost {
    authors: string[];
    tags: string[];
}

export interface Author extends PrismaAuthor {
    posts: string[];
    tags: string[];
}