import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ message: "Name cannot be empty" }, { status: 500 });
  }
  const data = await prisma.stage.create({
    data: { name: name },
  });
  return NextResponse.json({ data }, { status: 200 });
};
