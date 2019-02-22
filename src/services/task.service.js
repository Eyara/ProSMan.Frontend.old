import axios from 'axios';
export default {
    name: 'taskService',

    createTask(model) {
        return axios.post("http://localhost:54973/api/Task/", model);
    },

    getBySprintId(id) {
        return axios.get("http://localhost:54973/api/Task/GetBySprintId?id=" + id);
    },

    toggleFinishTask(id) {
        return axios.post("http://localhost:54973/api/Task/ToggleFinishTask?id=" + id);
    },

    deleteTask(id) {
        return axios.delete("http://localhost:54973/api/Task?id=" + id);
    },

    updateTask(model) {
        return axios.put("http://localhost:54973/api/Task/", model);
    },
}