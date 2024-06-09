"use server";

import { signIn } from "@/app/auth";

export const login = async (values: any) => {
  try {
    const eee = await signIn("credentials", {
      username: values.get("username") as string,
      password: values.get("password") as string,
    });

    return eee;
  } catch (error: any) {
    return error;
  }
};
