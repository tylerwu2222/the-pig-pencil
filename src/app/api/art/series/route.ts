// import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextResponse } from "next/server";

// get all art series
export async function GET() {
  const artSeries = await prisma.artSeries.findMany();

  return NextResponse.json(artSeries);
}
