import axios, { AxiosPromise } from "axios";
import { IDataResponseModel } from "@/models/data-response.model";
import { ISprintModel } from "@/models/sprint.model";

export default {
  name: "sprintService",

  createSprint(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Sprint", model);
  },

  getByProjectId(id): AxiosPromise<IDataResponseModel<ISprintModel[]>> {
    return axios.get<IDataResponseModel<ISprintModel[]>>(
      "api/Sprint/GetByProjectId?id=" + id
    );
  },

  getById(sprintId) {
    return axios.get("api/Sprint/GetById?id=" + sprintId);
  },

  getUnfinished(projectId) {
    return axios.get("/api/Sprint/GetUnfinished?id=" + projectId);
  },

  deleteSprint(id) {
    return axios.delete("api/Sprint?id=" + id);
  },

  updateSprint(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Sprint", model);
  },

  finish(id): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Sprint/Finish?id=" + id);
  }
};
