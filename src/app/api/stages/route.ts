import prisma from "@/db/prisma";
import { NextRequest } from "next/server";
import { API_RESPONSE_MESSAGES } from "../(lib)/consts";
import { auth } from "@/app/auth";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session)
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.UNAUTHORIZED },
      { status: 500 }
    );

  const { userId, stageName } = await req.json();
  let data;

  if (!userId)
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST },
      { status: 500 }
    );

  if (stageName) {
    data = await prisma.stage.findFirst({ where: { name: stageName } });
  } else {
    data = await prisma.stage.findMany({
      orderBy: { order: "asc" },
      where: { userId },
    });
  }

  return Response.json({ success: true, data }, { status: 200 });
};
