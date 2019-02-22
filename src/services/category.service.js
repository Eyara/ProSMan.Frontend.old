import axios from 'axios';
export default {
    name: 'categoryService',

    createCategory(model) {
        return axios.post("http://localhost:54973/api/Category", model);
    },

    getByProjectId(id) {
        return axios.get("http://localhost:54973/api/Category/GetByProjectId?id=" + id);
    },
}