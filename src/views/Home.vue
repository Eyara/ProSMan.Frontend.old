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
        <scrum-card v-bind:cards="projects"
          v-on:click="openProject"
          v-on:edit="editProject"
          v-on:delete="deleteProject"
        ></scrum-card>
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
import router from "../router.js"
import projectService from "../services/project.service.js";
import ScrumCard from "../shared/scrum-card/ScrumCard.vue";

export default {
  name: "home",
  components: {
    ScrumCard
  },

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
      router.push({path: "/sprints?projectId=" + project.id});
      store.commit("selectProject", project);
    }
  }
};
</script>

<style lang="scss">
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

@media (max-width: 320px) {
  .md-card {
    width: 240px;
  }
}
</style>