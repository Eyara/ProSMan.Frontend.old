import axios from 'axios';
export default {
    name: 'projectService',

    createProject(model) {
        return axios.post("http://localhost:54973/api/Project", model);
    },

    getProjects() {
        return axios.get("http://localhost:54973/api/Project");
    },

    getById(projectId) {
        return axios.get("http://localhost:54973/api/Project/GetById?id=" + projectId);
    },

    deleteProject(id) {
        return axios.delete("http://localhost:54973/api/Project?id=" + id);
    },

    editProject(model) {
        return axios.put("http://localhost:54973/api/Project", model);
    }
}