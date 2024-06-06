import { Job } from "@/types/Job";
import { JobWithProgress } from "@/types/JobWithProgress";

export const getAllJobs = async (userId: number) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return error;
  }
};

export const createJobs = async (userId: number, job: any, jobLength: number) => {
  try {
    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, job, jobLength }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return error;
  }
};

export const deleteJobs = async (userId: number, id: number) => {
  try {
    const res = await fetch("/api/jobs/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, id }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return error;
  }
};

export const updateJobs = async (userId: number, jobId: number, jobOrOrder?: JobWithProgress | number) => {
  let body;
  if (typeof jobOrOrder === 'number') {
    body = { userId, id: jobId, jobOrOrder }
  } else {
    body = { userId, id: jobId, jobOrOrder }
  }
  try {
    const res = await fetch("/api/jobs/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return error;
  }
};