import prisma from "@/db/prisma";
import { NextRequest } from "next/server";
import { API_RESPONSE_MESSAGES } from "../../(lib)/consts";
import { auth } from "@/app/auth";

export const PUT = async (req: NextRequest) => {
  const session = await auth();
  if (!session)
    return Response.json({ message: API_RESPONSE_MESSAGES.ERROR.UNAUTHORIZED }, { status: 500 });

  const { userId, id, name, order } = await req.json();
  let data;

  if (!id) {
    return Response.json({ message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST }, { status: 500 });
  }

  if (order !== undefined) {
    data = await prisma.stage.update({
      where: { id, userId },
      data: { order }
    });
  } else {
    if (!name)
      return Response.json({ message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST }, { status: 500 });

    data = await prisma.stage.update({
      where: { id, userId },
      data: { name }
    });
  }

  return Response.json({ success: true, data }, { status: 200 });
};
