import axios, { AxiosPromise } from "axios";
import { ITaskModel } from "@/models/task.model";
import { IDataResponseModel } from "@/models/data-response.model";

export default {
  name: "taskService",

  createTask(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Task/", model);
  },

  getBySprintId(id): AxiosPromise<IDataResponseModel<ITaskModel[]>> {
    return axios.get<IDataResponseModel<ITaskModel[]>>(
      "api/Task/GetBySprintId?id=" + id
    );
  },

  getTodayTasks(): AxiosPromise<IDataResponseModel<ITaskModel[]>> {
    return axios.get<IDataResponseModel<ITaskModel[]>>(
      "api/Task/getTodayTasks"
    );
  },

  toggleFinishTask(id): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Task/ToggleFinishTask?id=" + id);
  },

  toggleTodayTask(id): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Task/ToggleTodayTask?id=" + id);
  },

  deleteTask(id): AxiosPromise<boolean> {
    return axios.delete("api/Task?id=" + id);
  },

  updateTask(model): AxiosPromise<boolean> {
    return axios.put<boolean>("api/Task/", model);
  }
};
