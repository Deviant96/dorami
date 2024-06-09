import { Stage } from "@/types/Stage";
import axios from "axios";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const getAllStages = async (
  userId: number
): Promise<ApiResponse<Stage[]>> => {
  return await axios.post("/api/stages", { userId }).then((response) => {
    return response.data;
  });
};

export const getStageByName = async (
  userId: number,
  stageName: string
): Promise<ApiResponse<Stage>> => {
  return await axios
    .post("/api/stages", { userId, stageName })
    .then((response) => {
      return response.data;
    });
};

export const createState = async (
  userId: number,
  name: string,
  order: number
): Promise<ApiResponse<Stage>> => {
  return await axios
    .post("/api/stages/create", { userId, name, order })
    .then((response) => {
      return response.data;
    });
};

export const deleteState = async (
  userId: number,
  id: number
): Promise<ApiResponse<Stage>> => {
  return await axios
    .delete("/api/stages/delete", { data: { userId, id } })
    .then((response) => {
      return response.data;
    });
};

export const updateState = async (
  userId: number,
  id: number,
  nameOrOrder: string | number
): Promise<ApiResponse<Stage>> => {
  let name, order;
  if (typeof nameOrOrder === "string") {
    name = nameOrOrder;
  } else {
    order = nameOrOrder;
  }

  return await axios
    .put("/api/stages/update", { userId, id, name, order })
    .then((response) => {
      return response.data;
    });
};

export const assignJobProgress = async (
  userId: number,
  jobId: number,
  stageId: number
): Promise<ApiResponse<Stage>> => {
  return await axios
    .post("/api/jobs/assignStage", { userId, jobId, stageId })
    .then((response) => {
      return response.data;
    });
};
