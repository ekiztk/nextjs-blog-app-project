import prisma from "@/database";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
    select: {
      email: true,
      name: true,
      aboutMe: true,
      birthDate: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      error: "No user with Email found",
    });
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  let json = await request.json();

  const hashedPassword = await hash(json.password, 10);

  const updated_user = await prisma.user.update({
    where: { email },
    data: { ...json, password: hashedPassword },
  });

  if (!updated_user) {
    return new NextResponse("No user with email found", { status: 404 });
  }

  return NextResponse.json(updated_user);
}
