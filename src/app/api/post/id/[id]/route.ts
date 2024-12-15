// import { flattenJoinData } from "@/lib/prisma/prismaHelpers";
import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

// get single post by slug, joined w tags and authors
export async function GET(
  req: NextRequest,
  // { params }: { params: { id: string } },
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  const idPost = await prisma.post.findFirst({
    where: {
      id: id,
    },
    // include: {
    //     AuthorsOnPosts: {
    //         select: {
    //             Author: {
    //                 select: {
    //                     name: true
    //                 }
    //             }
    //         }
    //     },
    //     PostsOnTags: {
    //         select: {
    //             Tag: {
    //                 select: {
    //                     tagName: true
    //                 },
    //             },
    //         },
    //     },
    // }
  });

  // error handling
  if (!idPost) {
    return NextResponse.json(
      { error: "No post found with slug " + id },
      { status: 204 },
    );
  }

  // const formattedSectionPosts = flattenJoinData(slugPost, {
  //     AuthorsOnPosts: 'authors',
  //     PostsOnTags: 'tags'
  // })

  // console.log("BE: post by id", idPost);

  return NextResponse.json(idPost);
}
