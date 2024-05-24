export const createState = async (name: string) => {
  try {
    const res = await fetch("/api/states/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteState = async (id: number) => {
  try {
    const res = await fetch("/api/states/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
