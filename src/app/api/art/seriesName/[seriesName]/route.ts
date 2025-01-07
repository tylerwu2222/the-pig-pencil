import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";
import { getArtSeriesIDByName } from "@/lib/prisma/prisma";

import { NextRequest, NextResponse } from "next/server";

// get all art for series by seriesName
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ seriesName: string }> },
) {
  const seriesName = (await params).seriesName;

  const seriesID = await getArtSeriesIDByName(seriesName);

  const art = await prisma.art.findMany({
    where: {
      ArtSeriesOnArt: {
        some: {
          artSeriesId: seriesID,
        },
      },
    },
    include: {
      ArtTagsOnArt: {
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
      title: "asc",
    },
  });

  const formattedArt = flattenJoinData(art, {
    ArtTagsOnArt: "tags",
  });

  return NextResponse.json(formattedArt);
}
