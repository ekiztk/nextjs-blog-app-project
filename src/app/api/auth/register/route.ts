import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/database";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Name, email and password are required!" },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use!" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        registerDate: new Date(),
      },
    });
    return NextResponse.json(
      { message: "User Created!", user },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.log({ e });
  }
}
