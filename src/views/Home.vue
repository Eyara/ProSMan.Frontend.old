<template>
  <div class="home">
    <div v-if="projects.length > 0">
      <md-card v-for="project in projects" :key="project.id">
        <md-card-header>
          <router-link to="/sprints">
            <div @click="openProject(project.id)" class="md-title">{{project.name}}</div>
          </router-link>
        </md-card-header>
        <md-card-actions md-alignment="space-between">
          <div @click="editProject(project)">
            <md-button>
              <span>Редактировать</span>
            </md-button>
          </div>
          <div @click="deleteProject(project.id)">
            <md-button>Удалить</md-button>
          </div>
        </md-card-actions>
      </md-card>
    </div>
    <div class="action-block">
      <div @click="createProject()">
        <md-button class="btn-action">Создать новый проект</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
export default {
  name: "home",
  components: {},

  data: function() {
    return {
      projects: []
    };
  },

  created: function() {
    store.commit("setPageLabel", "Проекты");
    this.getProjects();
  },

  methods: {
    getProjects: function() {
      axios.get("http://localhost:54973/api/Project").then(response => {
        this.projects = response.data.data;
      });
    },

    createProject() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "project");
      store.commit("toggleRightSideMenu");
    },

    editProject(project) {
      store.commit("setCreating", false);
      store.commit("updateItem", project);
      store.commit("setUpdatingType", "project");
      store.commit("toggleRightSideMenu");
    },

    async deleteProject(id) {
      await axios.delete("http://localhost:54973/api/Project?id=" + id);
      this.getProjects();
    },

    openProject(projectId) {
      store.commit("selectProjectId", projectId);
    }
  }
};
</script>

<style>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>