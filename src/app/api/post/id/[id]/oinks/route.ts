import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get oinks for post by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const res = await prisma.post.findFirst({
    where: {
      id: id,
    },
    select: {
      oinks: true,
    },
  });

  if (!res){
    return NextResponse.json({ error: 'No oinks found for id ' + id }, { status: 204 })
  }

  const postOinks = res['oinks']

  return NextResponse.json(postOinks);
}
