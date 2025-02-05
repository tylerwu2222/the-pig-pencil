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

  if (!res) {
    return NextResponse.json(
      { error: "No oinks found for id " + id },
      { status: 204 },
    );
  }

  const postOinks = res["oinks"];

  return NextResponse.json(postOinks);
}

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
      data: { oinks: { increment: increment } }, // Atomic increment to avoid race conditions
    });

    console.log("BE incremented oink", updated);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating oinks:", error);
    return NextResponse.json(
      { error: "Failed to update oinks" },
      { status: 500 },
    );
  }
}
