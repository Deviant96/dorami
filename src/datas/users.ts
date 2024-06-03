export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const findByUsername = async (
  username: string
) => {
  try {
    const res = await fetch(`/api/users/find/${username}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
