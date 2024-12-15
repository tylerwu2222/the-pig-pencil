import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

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

  const formatedAllAuthors = flattenJoinData(allAuthors, {
    AuthorsOnPosts: "posts",
    TagsOnAuthors: "tags",
  });

  console.log("BE author after flatten", formatedAllAuthors);

  return NextResponse.json(formatedAllAuthors);
  // return NextResponse.json(allAuthors);
}
