import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { id, name } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" }, { status: 500 });
  }

  if (!name) {
    return NextResponse.json({ message: "Name cannot be empty" }, { status: 500 });
  }

  const updatedStage = await prisma.stage.update({
    where: { id: id },
    data: { name: name }
  });
  return NextResponse.json(updatedStage, { status: 200 });
};
