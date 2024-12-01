import { Post as PrismaPost } from "@prisma/client";

export interface Post extends PrismaPost {
    authors: string[];
    tags: string[];
}