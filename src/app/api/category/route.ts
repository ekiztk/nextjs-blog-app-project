import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const queryParameters = Object.fromEntries(request.nextUrl.searchParams);
    const categories = await prisma.category.findMany({
      where: queryParameters,
    });

    if (categories && categories.length) {
      return NextResponse.json({
        success: true,
        data: categories,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch blog posts. Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
