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
    // console.log("eee", eee);
        console.log('eee', eee)
    return eee;
  } catch (error: any) {
    // console.log("error", error);
    // setError(theError)
    return error;
  }
};
