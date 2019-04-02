<template>
  <div class="home">
    <div v-if="projects">
      <div v-if="projects.length === 0">
        <md-empty-state
          md-icon="date_range"
          md-label="Создай первый проект"
          md-description="Ты пока не создал ни одного проекта"
        ></md-empty-state>
      </div>
      <div v-else>
        <md-card v-for="project in projects" :key="project.id">
          <md-card-media-cover md-solid>
            <md-card-media>
              <img src="@/assets/project_background/project_background_3.jpg" style="height: 225px">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <router-link to="/sprints">
                  <div @click="openProject(project)" class="md-title project-name">{{project.name}}</div>
                </router-link>
              </md-card-header>

              <md-card-actions>
                <md-button class="md-icon-button" @click="editProject(project)">
                  <md-icon>edit</md-icon>
                </md-button>

                <md-button class="md-icon-button" @click="deleteProject(project.id)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
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
      store.dispatch("toggleRightSideMenu");
    },

    editProject(project) {
      store.commit("setCreating", false);
      store.commit("updateItem", project);
      store.commit("setUpdatingType", "project");
      store.dispatch("toggleRightSideMenu");
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

.project-name {
  color: white;
  cursor: pointer;
}

.project-name:hover {
  color: #e2e2e2;
}
</style>