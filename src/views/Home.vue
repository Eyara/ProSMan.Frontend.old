<template>
  <div class="home">
    <div v-if="projects">
      <div v-if="projects.length === 0">
        <md-empty-state
          md-icon="date_range"
          md-label="Создай первый проекте"
          md-description="Ты пока не создал ни одного проекта"
        ></md-empty-state>
      </div>
      <div v-else>
        <md-card v-for="project in projects" :key="project.id">
          <md-card-header>
            <router-link to="/sprints">
              <div @click="openProject(project)" class="md-title">{{project.name}}</div>
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
  </div>
</template>

<script>
import store from "../store.js";
import projectService from "../services/project.service.js";

export default {
  name: "home",
  components: {},

  data() {
    return {
      projects: null
    };
  },

  created() {
    store.commit("setPageLabel", "Проекты");
    store.commit("setMenuButtonType", "menu");
    this.getProjects();
  },

  computed: {
    hasBeenUpdated() {
      return store.state.hasBeenUpdated;
    }
  },

  watch: {
    hasBeenUpdated(newValue) {
      if (newValue) {
        this.getProjects();
        store.commit("setHasBeenUpdated", false);
      }
    }
  },

  methods: {
    async getProjects() {
      await projectService.getProjects().then(response => {
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
      await projectService.deleteProject(id);
      this.getProjects();
    },

    openProject(project) {
      store.commit("selectProject", project);
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

.btn-action {
  color: #3a9ad9 !important;
  background-color: transparent;
  transition: 0.4s;
  z-index: 0;
}

.btn-action:hover {
  color: #fafafa !important;
  background-color: #3a9ad9 !important;
}
</style>