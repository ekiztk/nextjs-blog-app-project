import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slugOfPost = url.searchParams.get("slug");

    const blogDetails = await prisma.post.findUnique({
      where: {
        slug: slugOfPost || "",
      },
      include: {
        author: { select: { name: true, email: true, image: true } },
        category: { select: { value: true, label: true } },
        comments: {
          select: {
            content: true,
            createDate: true,
            author: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (blogDetails) {
      return NextResponse.json({
        success: true,
        data: blogDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the blog details ! Please try again",
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
