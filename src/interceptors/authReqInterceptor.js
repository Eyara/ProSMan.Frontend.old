import axios from 'axios';
import store from '../store.js'

export default function setup() {
    axios.interceptors.request.use(function (config) {
        if (config.url.includes("api")) {
            store.commit("setLoading", true);
        }
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        store.commit("setLoading", false);
        return response;
    });
}