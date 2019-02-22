import axios from 'axios';
export default {
    name: 'sprintService',

    createSprint(model) {
        return axios.post("http://localhost:54973/api/Sprint", model);
    },

    getByProjectId(id) {
        return axios.get("http://localhost:54973/api/Sprint/GetByProjectId?id=" + id)
    },

    getById(sprintId) {
        return axios.get("http://localhost:54973/api/Sprint/GetById?id=" + sprintId);
    },

    deleteSprint(id) {
        return axios.delete("http://localhost:54973/api/Sprint?id=" + id);
    },

    updateSprint(model) {
        return axios.put("http://localhost:54973/api/Sprint", model);
    },
}