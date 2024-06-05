import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { userId, id } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID cannot be empty" }, { status: 500 });
  }

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" }, { status: 500 });
  }

  const data = await prisma.job.delete({ where: { id, userId } });

  return NextResponse.json({ data }, { status: 200 });
};