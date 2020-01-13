import axios, { AxiosPromise } from "axios";
import { IDataResponseModel } from "@/models/data-response.model";
import { ISprintModel } from "@/models/sprint.model";
import {IPaginationResponseModel} from "@/models/pagination-response.model";

export default {
  name: "sprintService",

  createSprint(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Sprint", model);
  },

  getByProjectId(id: string, currentPage: number, pageCount: number): AxiosPromise<IPaginationResponseModel<ISprintModel[]>> {
    return axios.get<IPaginationResponseModel<ISprintModel[]>>(
      `api/Sprint/GetByProjectId?id=${id}&currentPage=${currentPage}&pageCount=${pageCount}`
    );
  },

  getById(sprintId) {
    return axios.get("api/Sprint/GetById?id=" + sprintId);
  },

  getUnfinished(projectId) {
    return axios.get("/api/Sprint/GetUnfinished?id=" + projectId);
  },

  deleteSprint(id: string) {
    return axios.delete("api/Sprint?id=" + id);
  },

  updateSprint(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Sprint", model);
  },

  finish(id: string): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Sprint/Finish?id=" + id);
  }
};
