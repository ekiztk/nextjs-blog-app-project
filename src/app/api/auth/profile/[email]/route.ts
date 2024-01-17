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
      registerDate: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      error: "No user with Email found",
    });
  }

  const birthDate = new Date(user.birthDate!);

  const registerDate = new Date(user.registerDate!);

  const now = new Date();

  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }

  let membershipDuration = now.getFullYear() - registerDate.getFullYear();
  const n = now.getMonth() - registerDate.getMonth();
  if (n < 0 || (n === 0 && now.getDate() < registerDate.getDate())) {
    membershipDuration--;
  }

  const userWithInfo = {
    ...user,
    age: age,
    membershipDuration: membershipDuration,
  };

  return NextResponse.json({
    success: true,
    data: userWithInfo,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  let json = await request.json();
  delete json.age;
  delete json.membershipDuration;

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
