import axios from 'axios';
import globalVariable from '../variables'

export default {
    name: 'categoryService',

    createCategory(model) {
        return axios.post(globalVariable.hostname + "api/Category", model);
    },

    getByProjectId(id) {
        return axios.get(globalVariable.hostname + "api/Category/GetByProjectId?id=" + id);
    },
}