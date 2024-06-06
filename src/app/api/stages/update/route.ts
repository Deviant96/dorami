import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { userId, id, name, order } = await req.json();
  let updatedStage;

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" }, { status: 500 });
  }

  if (order !== undefined) {
    updatedStage = await prisma.stage.update({
      where: { id, userId },
      data: { order }
    });
  } else {
    if (!name)
      return NextResponse.json({ message: "Name cannot be empty" }, { status: 500 });

    updatedStage = await prisma.stage.update({
      where: { id, userId },
      data: { name }
    });
  }

  return NextResponse.json(updatedStage, { status: 200 });
};
