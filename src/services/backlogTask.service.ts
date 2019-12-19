import axios, { AxiosPromise } from "axios";
import { IDataResponseModel } from "@/models/data-response.model";
import { INonSprintTaskModel } from "@/models/non-sprint-task.model";

export default {
  name: "taskService",

  create(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Backlog/", model);
  },

  getAll(projectId): AxiosPromise<IDataResponseModel<INonSprintTaskModel[]>> {
    return axios.get<IDataResponseModel<INonSprintTaskModel[]>>(
      "api/Backlog?projectId=" + projectId
    );
  },

  moveToSprint(model): AxiosPromise<boolean> {
    return axios.put<boolean>("/api/Backlog/MoveToSprint", model);
  },

  update(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Backlog/", model);
  },

  delete(id) {
    return axios.delete("api/Backlog?id=" + id);
  }
};
