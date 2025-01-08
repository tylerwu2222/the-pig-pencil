import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get all posts for author, by authorName
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ authorName: string }> },
) {
  const authorName = (await params).authorName;

  const postsByAuthor = await prisma.post.findMany({
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
  // console.log("BE newest post for", authorName, newestPostByAuthor);
  // return post
  return NextResponse.json(postsByAuthor);
}
