// import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get views for post by id
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
      views: true,
    },
  });

  if (!res) {
    return NextResponse.json(
      { error: "No views found for id " + id },
      { status: 204 },
    );
  }

  const postViews = res["views"];

  return NextResponse.json(postViews);
}


// update views for id
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id; // Post ID from the route params
    const body = await req.json(); // Parse the incoming JSON data
    const { increment } = body;

    // Validate incoming data
    if (!increment || typeof increment !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Update the oinks count using Prisma's atomic increment
    const updated = await prisma.post.update({
      where: { id: id },
      data: { views: { increment: increment } }, // Atomic increment to avoid race conditions
    });

    // console.log("BE incremented views", updated);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 },
    );
  }
}
