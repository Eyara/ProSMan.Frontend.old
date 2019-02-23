import axios from 'axios';
import globalVariable from '../variables'

export default {
    name: 'sprintService',

    createSprint(model) {
        return axios.post(globalVariable.hostname + "api/Sprint", model);
    },

    getByProjectId(id) {
        return axios.get(globalVariable.hostname + "api/Sprint/GetByProjectId?id=" + id)
    },

    getById(sprintId) {
        return axios.get(globalVariable.hostname + "api/Sprint/GetById?id=" + sprintId);
    },

    deleteSprint(id) {
        return axios.delete(globalVariable.hostname + "api/Sprint?id=" + id);
    },

    updateSprint(model) {
        return axios.put(globalVariable.hostname + "api/Sprint", model);
    },
}