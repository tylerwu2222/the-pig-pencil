import { flattenJoinData } from "@/app/lib/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get posts to display for section
export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    await params

    const sectionPosts = await prisma.post.findMany({
        where: {
            section: params.section,
            visibility: 'visible'
        },
        include: {
            AuthorsOnPosts: {
                select: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            TagsOnPosts: {
                select: {
                    tag: {
                        select: {
                            tagName: true
                        },
                    },
                },
            },
        }

    });

    // Flatten the nested join data
    // const formattedSectionPosts = sectionPosts.map((post) => ({
    //     ...post,
    //     // authors: post.AuthorsOnPosts.map((a) => a.author.name), // Extract author names
    //     authors: flattenAoE(post.AuthorsOnPosts), // Extract author names
    //     // tags: post.TagsOnPosts.map((t) => t.tag.tagName), // Extract tag names
    //     tags: flattenAoE(post.TagsOnPosts), // Extract tag names
    // }));

    const formattedSectionPosts = flattenJoinData(sectionPosts,{
        AuthorsOnPosts: 'authors',
        TagsOnPosts: 'tags'
    })

    // console.log('BE: section posts', formattedSectionPosts)

    return NextResponse.json(formattedSectionPosts)
}

