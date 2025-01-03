import prisma from "@/db";

import { NextResponse } from "next/server";

// get all art series to display for art section
export async function GET() {
  const artSeries = await prisma.artSeries.findMany({
    orderBy: {
      seriesTitle: "asc",
    },
  });

  return NextResponse.json(artSeries);
}
