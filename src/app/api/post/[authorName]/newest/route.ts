import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get single post by slug, joined w tags and authors
export async function GET(
  req: NextRequest,
  // { params }: { params: { id: string } },
  { params }: { params: Promise<{ authorName: string }> },
) {
  const authorName = (await params).authorName;

  const newestPostByAuthor = await prisma.post.findFirst({
    where: {
      AuthorsOnPosts: {
        some: {
          Author: {
            name: authorName,
          },
        },
      },
      visibility: "visible"
    },
    orderBy: {
      publishDate: "desc",
    },
  });
  console.log("BE newest post for", authorName, newestPostByAuthor);
  // return post
  return NextResponse.json(newestPostByAuthor);
}
