import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get all authors
export async function GET(
) {

    const allAuthors = await prisma.author.findMany({
        where: {
            isVisible: true
        },
        include: {
            AuthorsOnPosts: {
                select: {
                    Post: true
                }
            },
            AuthorsOnTags: {
                select: {
                    Tag: {
                        select: {
                            tagName: true
                        }
                    }
                }
            }
        }

    });

    // console.log('BE author before', allAuthors);

    const formatedAllAuthors = flattenJoinData(allAuthors, {
        AuthorsOnPosts: 'posts',
        TagsOnAuthors: 'tags'
    })

    // console.log('BE author post', formatedAllAuthors)

    return NextResponse.json(formatedAllAuthors)
}

