import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const queryParameters = Object.fromEntries(request.nextUrl.searchParams);
    const sortField = queryParameters.sortField;
    const sortOrder = queryParameters.sortOrder;

    if (!validateQueryParameters(queryParameters)) {
      return NextResponse.json({
        success: false,
        message: "Invalid query parameters!",
      });
    }

    const queryObj = Object.fromEntries(
      Object.entries(queryParameters).filter(
        ([key]) => !["sortField", "sortOrder"].includes(key)
      )
    );

    const getAllBlogPosts = await prisma.post.findMany({
      where: queryObj,
      orderBy: {
        [sortField]: sortOrder,
      },
      include: {
        author: { select: { name: true, email: true, image: true } },
        category: { select: { value: true, label: true } },
      },
    });
    if (getAllBlogPosts && getAllBlogPosts.length) {
      return NextResponse.json({
        success: true,
        data: getAllBlogPosts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch blog posts. Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}

function validateQueryParameters(queryParameters: { [key: string]: string }) {
  const validKeys = [
    "id",
    "slug",
    "title",
    "content",
    "image",
    "createDate",
    "lastModifyDate",
    "authorId",
    "categoryId",
    "sortField",
    "sortOrder",
  ];

  for (const key in queryParameters) {
    if (!validKeys.includes(key)) {
      return false;
    }

    if (key === "authorId" || key === "categoryId") {
      if (isNaN(Number(queryParameters[key]))) {
        return false;
      }
    } else if (key === "createDate" || key === "lastModifyDate") {
      if (isNaN(Date.parse(queryParameters[key]))) {
        return false;
      }
    } else if (key === "sortField") {
      if (
        !["title", "updateDate", "lastModifyDate"].includes(
          queryParameters[key]
        )
      ) {
        return false;
      }
    } else if (key === "sortOrder") {
      if (!["asc", "desc"].includes(queryParameters[key])) {
        return false;
      }
    } else {
      if (typeof queryParameters[key] !== "string") {
        return false;
      }
    }
  }
  return true;
}
