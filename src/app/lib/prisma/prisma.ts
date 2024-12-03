import prisma from "@/db";

import { flattenJoinData } from "./prismaHelpers";

export const getPostBySlug = async (slug: string) => {
    const slugPost = await prisma.post.findFirst({
        where: {
            slug: slug
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

    // error handling
    if (!slugPost) {
        return { error: 'No post found with slug ' + slug }
    }

    const formattedSectionPosts = flattenJoinData(slugPost, {
        AuthorsOnPosts: 'authors',
        TagsOnPosts: 'tags'
    })

    return formattedSectionPosts;
}