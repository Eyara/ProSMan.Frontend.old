import axios, { AxiosPromise } from "axios";
import { IDataResponseModel } from "@/models/data-response.model";
import { INonSprintTaskModel } from "@/models/non-sprint-task.model";

export default {
  name: "taskService",

  create(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/NonSprintTask/", model);
  },

  createBacklog(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/NonSprintTask/Backlog", model);
  },

  getAll(projectId): AxiosPromise<IDataResponseModel<INonSprintTaskModel[]>> {
    return axios.get<IDataResponseModel<INonSprintTaskModel[]>>(
      "api/NonSprintTask?projectId=" + projectId
    );
  },

  getAllBacklog(
    projectId
  ): AxiosPromise<IDataResponseModel<INonSprintTaskModel[]>> {
    return axios.get<IDataResponseModel<INonSprintTaskModel[]>>(
      "api/NonSprintTask/getBacklog?projectId=" + projectId
    );
  },

  moveToSprint(model): AxiosPromise<boolean> {
    return axios.put<boolean>("/api/NonSprintTask/MoveToSprint", model);
  },

  toggleFinishTask(id): AxiosPromise<boolean> {
    return axios.post<boolean>("api/NonSprintTask/ToggleFinishTask?id=" + id);
  },

  delete(id) {
    return axios.delete("api/NonSprintTask?id=" + id);
  },

  update(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/NonSprintTask/", model);
  }

  // not implemented
  // toggleTodayTask(id) {
  //     return axios.post("api/Task/ToggleTodayTask?id=" + id);
  // },
};
