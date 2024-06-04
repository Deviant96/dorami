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
    console.log(error);
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

export const updateJobs = async (jobId: number, job: JobWithProgress) => {
  console.log('updateJobs');
  try {
    // const { companyName, isForeign, details, date, notes, status, order, progress } = job;

    const res = await fetch("/api/jobs/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: jobId, job: job }),
    });
    console.log('res :', res);

    const data = await res.json();
    console.log('data :', data);

    return data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};