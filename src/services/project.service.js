import axios from 'axios';
import globalVariable from '../variables'

export default {
    name: 'projectService',

    createProject(model) {
        return axios.post(globalVariable.hostname + "api/Project", model);
    },

    getProjects() {
        return axios.get(globalVariable.hostname + "api/Project");
    },

    getById(projectId) {
        return axios.get(globalVariable.hostname + "api/Project/GetById?id=" + projectId);
    },

    deleteProject(id) {
        return axios.delete(globalVariable.hostname + "api/Project?id=" + id);
    },

    editProject(model) {
        return axios.put(globalVariable.hostname + "api/Project", model);
    }
}