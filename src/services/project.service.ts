import axios, { AxiosPromise } from "axios";
import { ILookupViewModel } from "@/models/lookup.model";
import { IDataResponseModel } from "@/models/data-response.model";

export default {
  name: "projectService",

  createProject(model: ILookupViewModel): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Project", model);
  },

  getProjects(): AxiosPromise<IDataResponseModel<ILookupViewModel[]>> {
    return axios.get<IDataResponseModel<ILookupViewModel[]>>("api/Project");
  },

  getById(projectId: string) {
    return axios.get("api/Project/GetById?id=" + projectId);
  },

  deleteProject(id: string) {
    return axios.delete("api/Project?id=" + id);
  },

  editProject(model: ILookupViewModel) {
    return axios.put("api/Project", model);
  }
};
