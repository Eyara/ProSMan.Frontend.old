import axios from 'axios';
import globalVariable from '../variables'

export default {
    name: 'taskService',

    createTask(model) {
        return axios.post(globalVariable.hostname + "api/Task/", model);
    },

    getBySprintId(id) {
        return axios.get(globalVariable.hostname + "api/Task/GetBySprintId?id=" + id);
    },

    toggleFinishTask(id) {
        return axios.post(globalVariable.hostname + "api/Task/ToggleFinishTask?id=" + id);
    },

    deleteTask(id) {
        return axios.delete(globalVariable.hostname + "api/Task?id=" + id);
    },

    updateTask(model) {
        return axios.put(globalVariable.hostname + "api/Task/", model);
    },
}