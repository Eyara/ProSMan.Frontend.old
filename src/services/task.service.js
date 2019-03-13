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

    getTodayTasks() {
        return axios.get(globalVariable.hostname + "api/Task/getTodayTasks");    
    },

    toggleFinishTask(id) {
        return axios.post(globalVariable.hostname + "api/Task/ToggleFinishTask?id=" + id);
    },

    toggleTodayTask(id) {
        return axios.post(globalVariable.hostname + "api/Task/ToggleTodayTask?id=" + id);
    },

    deleteTask(id) {
        return axios.delete(globalVariable.hostname + "api/Task?id=" + id);
    },

    updateTask(model) {
        return axios.put(globalVariable.hostname + "api/Task/", model);
    },
}