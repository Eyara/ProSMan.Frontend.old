import axios from "axios";

export default {
  name: "taskService",

  createTask(model) {
    return axios.post("api/Task/", model);
  },

  getBySprintId(id) {
    return axios.get("api/Task/GetBySprintId?id=" + id);
  },

  getTodayTasks() {
    return axios.get("api/Task/getTodayTasks");
  },

  toggleFinishTask(id) {
    return axios.post("api/Task/ToggleFinishTask?id=" + id);
  },

  toggleTodayTask(id) {
    return axios.post("api/Task/ToggleTodayTask?id=" + id);
  },

  deleteTask(id) {
    return axios.delete("api/Task?id=" + id);
  },

  updateTask(model) {
    return axios.put("api/Task/", model);
  }
};
