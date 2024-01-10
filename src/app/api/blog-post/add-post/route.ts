import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import slugify from "slugify";
import { Category } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You have to log in to create a post!",
      });
    }

    const user = await prisma.user.findUnique({
      select: { id: true },
      where: {
        email: session?.user?.email!,
      },
    });

    const extractPostData = await req.json();

    const category: Category | null = await prisma.category.findUnique({
      where: {
        value: extractPostData.category!,
      },
    });

    const newlyCreatedPost = await prisma.post.create({
      data: {
        ...extractPostData,
        content: JSON.stringify(extractPostData.content),
        slug: slugify(extractPostData.title),
        author: {
          connect: {
            id: user?.id,
          },
        },
        category: {
          connect: {
            id: category?.id,
          },
        },
      },
    });

    //console.log(extractPostData, "extractPostData");

    if (newlyCreatedPost) {
      return NextResponse.json({
        success: true,
        message: "New blog post added successfully",
        slug: newlyCreatedPost.slug,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
