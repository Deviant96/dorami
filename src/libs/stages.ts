import { Stage } from "@/types/Stage";
import { fetchFromApi } from "./api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const getAllStages = async (userId: number): Promise<ApiResponse<Stage[]>> => {
  return await fetchFromApi('/api/stages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
};

export const getStageByName = async (userId: number, stageName: string): Promise<ApiResponse<Stage>> => {
  return await fetchFromApi("/api/stages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, stageName }),
  });
};

export const createState = async (userId: number, name: string): Promise<ApiResponse<Stage>> => {
  return await fetchFromApi("/api/stages/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });
};

export const deleteState = async (userId: number, id: number): Promise<ApiResponse<Stage>> => {
  return await fetchFromApi("/api/stages/delete", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, id }),
  });
};

export const updateState = async (userId: number, id: number, nameOrOrder: string | number): Promise<ApiResponse<Stage>> => {
  let name, order;
  if (typeof nameOrOrder === 'string') {
    name = nameOrOrder;
  } else {
    order = nameOrOrder;
  }

  return await fetchFromApi("/api/stages/update", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, id, name, order }),
  });
};

export const assignJobProgress = async (userId: number, jobId: number, stageId: number): Promise<ApiResponse<Stage>> => {
  return await fetchFromApi("/api/jobs/assignStage", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, jobId, stageId }),
  });
};