export const getAllStages = async (userId: number) => {
  try {
    const res = await fetch("/api/stages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const getStageByName = async (userId: number, stageName: string) => {
  try {
    const res = await fetch("/api/stages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, stageName }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const createState = async (userId: number, name: string) => {
  try {
    const res = await fetch("/api/stages/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, name }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteState = async (userId: number, id: number) => {
  try {
    const res = await fetch("/api/stages/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, id }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const updateState = async (userId: number, id: number, name: string) => {
  try {
    const res = await fetch("/api/stages/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, id, name }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const assignJobProgress = async (userId: number, jobId: number, stageId: number) => {
  try {
    const res = await fetch("/api/jobs/assignStage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, jobId, stageId }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};