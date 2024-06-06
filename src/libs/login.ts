"use server";

import { signIn } from "@/app/auth";
import { getUser } from "@/db/user";

export const login = async (values: any) => {
  try {
    const eee = await signIn("credentials", {
      // redirectTo: '/protected',
      username: values.get("username") as string,
      password: values.get("password") as string,
    });

    return eee;
  } catch (error: any) {
    // setError(theError)
    return error;
  }
};
