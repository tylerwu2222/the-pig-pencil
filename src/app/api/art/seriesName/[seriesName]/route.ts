// import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
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

  const firstArt = await prisma.art.findMany({
    where: {
      ArtSeriesOnArt: {
        some: {
          artSeriesId: seriesID,
        },
      },
    },
    orderBy:{
      title: "asc"
    }
  });

  // console.log('BE art', firstArt);

  return NextResponse.json(firstArt);
}
