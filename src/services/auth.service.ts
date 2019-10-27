import axios from "axios";
import qs from "qs";

export default {
  name: "authService",

  token(model) {
    return axios.post("api/Authorization/token", qs.stringify(model), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },

  register(model) {
    return axios.post("api/Authorization/register", qs.stringify(model), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
};
