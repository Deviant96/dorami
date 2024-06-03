import prisma from "@/db/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: "User details required" }, { status: 500 });
  }
  
  const hashedPassword = await hash(password, 10);

  const data = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      email: email,
    }
  })

  return NextResponse.json({ data }, { status: 200 });
};