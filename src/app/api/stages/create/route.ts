import prisma from "@/db/prisma";
import { NextRequest } from "next/server";
import { API_RESPONSE_MESSAGES } from "../../(lib)/consts";
import { auth } from "@/app/auth";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session)
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.UNAUTHORIZED },
      { status: 500 }
    );

  const { userId, name, order } = await req.json();

  if (!userId) {
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST },
      { status: 500 }
    );
  }

  if (!name) {
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST },
      { status: 500 }
    );
  }
  const data = await prisma.stage.create({
    data: { name, userId, order },
  });

  return Response.json({ success: true, data }, { status: 200 });
};
