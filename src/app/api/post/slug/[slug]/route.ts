import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get single post by slug, joined w tags and authors
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug;
    const slugPost = await prisma.post.findFirst({
        where: {
            slug: slug
        },
        include: {
            AuthorsOnPosts: {
                select: {
                    Author: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            PostsOnTags: {
                select: {
                    Tag: {
                        select: {
                            tagName: true
                        },
                    },
                },
            },
        }

    });

    // error handling
    if (!slugPost) {
        return NextResponse.json({ error: 'No post found with slug ' + slug }, { status: 204 })
    }
    
    const formattedSectionPosts = flattenJoinData(slugPost, {
        AuthorsOnPosts: 'authors',
        PostsOnTags: 'tags'
    })

    // console.log('BE: section posts', formattedSectionPosts)

    return NextResponse.json(formattedSectionPosts)
}