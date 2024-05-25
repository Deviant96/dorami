import { Job } from "@/types/Job";

export const createJobs = async (job: any, jobLength: number) => {
  try {
    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ job, jobLength }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteJobs = async (id: number) => {
  try {
    const res = await fetch("/api/jobs/delete", {
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

export const updateJobs = async (job: Job) => {
  try {
    const res = await fetch("/api/jobs/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ job: job }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};