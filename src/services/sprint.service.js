import axios from 'axios';

export default {
    name: 'sprintService',

    createSprint(model) {
        return axios.post("api/Sprint", model);
    },

    getByProjectId(id) {
        return axios.get("api/Sprint/GetByProjectId?id=" + id)
    },

    getById(sprintId) {
        return axios.get("api/Sprint/GetById?id=" + sprintId);
    },

    deleteSprint(id) {
        return axios.delete("api/Sprint?id=" + id);
    },

    updateSprint(model) {
        return axios.put("api/Sprint", model);
    },
}