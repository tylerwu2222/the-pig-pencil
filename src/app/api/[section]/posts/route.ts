import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get posts for section
export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    await params

    const sectionPosts = await prisma.post.findMany({
        where: {
            section: params.section,
            visibility: 'visible'
        }

    });
    console.log('BE: section posts', sectionPosts)

    return NextResponse.json(sectionPosts)
}

