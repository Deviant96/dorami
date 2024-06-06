import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Name cannot be empty" }, { status: 500 });
  }

  const data = await prisma.stage.delete({ where: { id } });
  return NextResponse.json({ data }, { status: 200 });
};
