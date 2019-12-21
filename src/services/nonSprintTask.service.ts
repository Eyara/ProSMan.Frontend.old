import axios, { AxiosPromise } from "axios";
import { IDataResponseModel } from "@/models/data-response.model";
import { INonSprintTaskModel } from "@/models/non-sprint-task.model";

export default {
  name: "nonSprintTaskService",

  create(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/NonSprintTask/", model);
  },

  getAll(projectId): AxiosPromise<IDataResponseModel<INonSprintTaskModel[]>> {
    return axios.get<IDataResponseModel<INonSprintTaskModel[]>>(
      "api/NonSprintTask?projectId=" + projectId
    );
  },

  toggleFinishTask(id): AxiosPromise<boolean> {
    return axios.post<boolean>("api/NonSprintTask/ToggleFinishTask?id=" + id);
  },

  update(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/NonSprintTask/", model);
  },

  delete(id) {
    return axios.delete("api/NonSprintTask?id=" + id);
  },

  toggleTodayTask(id) {
      return axios.put("api/NonSprintTask/ToggleTodayTask?id=" + id);
  },
};
