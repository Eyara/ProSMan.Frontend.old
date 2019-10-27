import axios from "axios";

export default {
  name: "dashboardService",

  get() {
    return axios.get("api/Dashboard");
  }
};
