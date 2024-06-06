import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, stageName } = await req.json();
  let data;

  if (!userId) 
    return NextResponse.json({ message: "User ID cannot be empty" }, { status: 500 });

  if (stageName) {
    data = await prisma.stage.findFirst({ where: { name: stageName } });
  } else {
    data = await prisma.stage.findMany({
      orderBy: { order: "asc" },
      where: { userId }
    });
  }

  return NextResponse.json( data );
};
