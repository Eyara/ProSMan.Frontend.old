import axios from 'axios';

export default {
    name: 'taskService',

    create(model) {
        return axios.post("api/NonSprintTask/", model);
    },

    createBacklog(model) {
        return axios.post("api/NonSprintTask/Backlog", model);
    },

    getAll(projectId) {
        return axios.get("api/NonSprintTask?projectId=" + projectId);
    },

    getAllBacklog(projectId) {
        return axios.get("api/NonSprintTask/getBacklog?projectId=" + projectId);
    },

    moveToSprint(model) {
        return axios.put("/api/NonSprintTask/MoveToSprint", model);
    },

    toggleFinishTask(id) {
        return axios.post("api/NonSprintTask/ToggleFinishTask?id=" + id);
    },

    delete(id) {
        return axios.delete("api/NonSprintTask?id=" + id);
    },

    update(model) {
        return axios.put("api/NonSprintTask/", model);
    },

    // not implemented
    // toggleTodayTask(id) {
    //     return axios.post("api/Task/ToggleTodayTask?id=" + id);
    // },

}