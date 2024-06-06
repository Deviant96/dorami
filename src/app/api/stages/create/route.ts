import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, name } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID cannot be empty" }, { status: 500 });
  }

  if (!name) {
    return NextResponse.json({ message: "Name cannot be empty" }, { status: 500 });
  }
  const data = await prisma.stage.create({
    data: { name, userId }
  });
  return NextResponse.json({ data }, { status: 200 });
};
