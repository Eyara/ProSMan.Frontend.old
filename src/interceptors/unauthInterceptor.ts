import axios from "axios";
import store from "../store";
import router from "../router";

export default function unauthorize() {
  axios.interceptors.response.use(undefined, error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      store.commit("setAuthenticated", false);
      router.push({
        path: "/login"
      });
    }
    return Promise.reject(error.response.data);
  });
}
