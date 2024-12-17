import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { Author } from "@/types/extendedPrismaTypes";

import { NextRequest, NextResponse } from "next/server";

// get all authors
export async function GET() {
  const allAuthors = await prisma.author.findMany({
    where: {
      isVisible: true,
    },
    include: {
      AuthorsOnPosts: {
        select: {
          Post: true,
        },
      },
      AuthorsOnTags: {
        select: {
          Tag: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // console.log('BE author before flatten', allAuthors);

  // get total views and oinks on posts
  const countedAuthors = allAuthors.map((author) => ({
    ...author,
    viewCount: author.AuthorsOnPosts.reduce((acc, p) => acc + p.Post.views, 0),
    oinkCount: author.AuthorsOnPosts.reduce((acc, p) => acc + p.Post.oinks, 0),
    postCount: author.AuthorsOnPosts.filter(
      (p) => p.Post.visibility === "visible",
    ).length, // only get published posts
  }));

  const formattedAllAuthors = flattenJoinData(countedAuthors, {
    AuthorsOnPosts: "posts", // post ids
    AuthorsOnTags: "tags", // tag names
  });

  // console.log("BE author after format", formattedAllAuthors);

  return NextResponse.json(formattedAllAuthors);
  // return NextResponse.json(allAuthors);
}
