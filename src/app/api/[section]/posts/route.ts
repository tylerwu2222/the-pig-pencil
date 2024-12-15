import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get posts to display for section
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> },
) {
  const section = (await params).section;

  const sectionPosts = await prisma.post.findMany({
    where: {
      section: section,
      visibility: {
        in: ["visible", "wip"],
      },
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
    orderBy: {
      publishDate: "desc",
    },
  });

  console.log("BE section posts", section, sectionPosts);

  const formattedSectionPosts = flattenJoinData(sectionPosts, {
    AuthorsOnPosts: "authors",
    PostsOnTags: "tags",
  });

  console.log("BE: section posts flattened", formattedSectionPosts);

  return NextResponse.json(formattedSectionPosts);
}
