import axios, { AxiosPromise } from "axios";
import { ICategoryModel } from "@/models/category.model";
import { IDataResponseModel } from "@/models/data-response.model";

export default {
  name: "categoryService",

  createCategory(model): AxiosPromise<boolean> {
    return axios.post<boolean>("api/Category", model);
  },

  getByProjectId(id): AxiosPromise<IDataResponseModel<ICategoryModel[]>> {
    return axios.get<IDataResponseModel<ICategoryModel[]>>(
      "api/Category/GetByProjectId?id=" + id
    );
  }
};
