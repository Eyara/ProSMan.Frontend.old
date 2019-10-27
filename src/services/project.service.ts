import axios from "axios";

export default {
  name: "projectService",

  createProject(model) {
    return axios.post("api/Project", model);
  },

  getProjects() {
    return axios.get("api/Project");
  },

  getById(projectId) {
    return axios.get("api/Project/GetById?id=" + projectId);
  },

  deleteProject(id) {
    return axios.delete("api/Project?id=" + id);
  },

  editProject(model) {
    return axios.put("api/Project", model);
  }
};
