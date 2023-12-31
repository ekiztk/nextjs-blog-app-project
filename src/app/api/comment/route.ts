import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

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

    const { content, postId } = await req.json();

    const newlyCreatedPost = await prisma.comment.create({
      data: {
        content: content,
        author: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    if (newlyCreatedPost) {
      return NextResponse.json({
        success: true,
        message: "New comment added successfully",
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
