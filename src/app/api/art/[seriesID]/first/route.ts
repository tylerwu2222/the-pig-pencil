// import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextResponse } from "next/server";

// get first art for series
export async function GET({
  params,
}: {
  params: Promise<{ seriesID: string }>;
}) {
  const seriesID = (await params).seriesID;
  const firstArt = await prisma.art.findFirst({
    where: {
      ArtSeriesOnArt: {
        some: {
          artSeriesId: seriesID,
        },
      },
    },
  });

  // console.log('BE art', firstArt);

  return NextResponse.json(firstArt);
}
