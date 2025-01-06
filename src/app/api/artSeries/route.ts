import prisma from "@/db";

import { NextResponse } from "next/server";

import { flattenJoinData } from "@/lib/prisma/prismaHelpers";

// get all art series to display for art section
export async function GET() {
  const artSeries = await prisma.artSeries.findMany({
    include: {
      ArtTagsOnArtSeries: {
        select: {
          ArtTag: {
            select: {
              artTagName: true,
            },
          },
        },
      },
    },
    orderBy: {
      seriesTitle: "asc",
    },
  });

  const formattedArtSeries = flattenJoinData(artSeries, {
    // AuthorsOnPosts: "authors",
    ArtTagsOnArtSeries: "tags",
  });

  return NextResponse.json(formattedArtSeries);
}
