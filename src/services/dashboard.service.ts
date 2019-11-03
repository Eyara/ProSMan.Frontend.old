import axios, { AxiosPromise } from "axios";
import { IDashboardModel } from "@/models/dashboard.model";

export default {
  name: "dashboardService",

  get(): AxiosPromise<IDashboardModel> {
    return axios.get<IDashboardModel>("api/Dashboard");
  }
};
