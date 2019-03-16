import axios from 'axios';

export default {
    name: 'categoryService',

    createCategory(model) {
        return axios.post("api/Category", model);
    },

    getByProjectId(id) {
        return axios.get("api/Category/GetByProjectId?id=" + id);
    },
}