<template>
  <div>
    <md-toolbar class="top-menu">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon class="main-color">menu</md-icon>
      </md-button>
      <h3 class="md-title main-color">{{$store.state.pageLabel}}</h3>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">ProSMan</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">
            <router-link to="/">Проекты</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer
      class="md-right drawer-sidenav"
      v-bind:class="{ 'hide-right': !$store.state.rightSideMenuOpen }"
      :md-active.sync="$store.state.rightSideMenuOpen"
    >
      <add-task-modal
        v-if="$store.state.rightSideMenuOpen && $store.state.updatingType == 'task'"
        v-bind:taskModel="$store.state.updatingItem"
        v-bind:isCreating="$store.state.isCreating"
        v-on:close-dialog="closeSideNav"
      ></add-task-modal>
      <add-category-modal
        v-else-if="$store.state.rightSideMenuOpen && $store.state.updatingType == 'category'"
        v-bind:categoryModel="$store.state.updatingItem"
        v-bind:isCreating="$store.state.isCreating"
        v-on:close-dialog="closeSideNav"
      ></add-category-modal>
      <add-sprint-modal
        v-else-if="$store.state.rightSideMenuOpen && $store.state.updatingType == 'sprint'"
        v-bind:sprintModel="$store.state.updatingItem"
        v-bind:isCreating="$store.state.isCreating"
        v-on:close-dialog="closeSideNav"
      ></add-sprint-modal>
      <add-project-modal
        v-else-if="$store.state.rightSideMenuOpen && $store.state.updatingType == 'project'"
        v-bind:projectModel="$store.state.updatingItem"
        v-bind:isCreating="$store.state.isCreating"
        v-on:close-dialog="closeSideNav"
      ></add-project-modal>
    </md-drawer>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
import AddTaskModal from "./tasks/add-task-modal/add-task-modal.vue";
import AddCategoryModal from "./tasks/add-category-modal/add-category-modal.vue";
import AddSprintModal from "./sprints/add-sprint-modal/add-sprint-modal.vue";
import AddProjectModal from "./home/add-project-modal/add-project-modal.vue";

export default {
  name: "Layout",
  data: () => ({
    showNavigation: false
  }),
  components: {
    AddTaskModal,
    AddCategoryModal,
    AddSprintModal,
    AddProjectModal
  },
  async created() {
    this.selectProject();
    this.selectSprint();
  },
  methods: {
    async closeSideNav(model, isCancel) {
      store.commit("toggleRightSideMenu");

      if (isCancel) return;

      switch (store.state.updatingType) {
        case "task":
          store.state.isCreating
            ? await this.createTask(model)
            : await this.updateTask(model);
          break;
        case "category":
          store.state.isCreating
            ? await this.createCategory(model)
            : await this.updateCategory(model);
          break;
        case "sprint":
          store.state.isCreating
            ? await this.createSprint(model)
            : await this.updateSprint(model);
          break;
        case "project":
          store.state.isCreating
            ? await this.createProject(model)
            : await this.updateProject(model);
          break;
      }
      store.commit("setHasBeenUpdated", true);
    },

    async createTask(model) {
      return axios.post("http://localhost:54973/api/Task/", model);
    },

    async updateTask(model) {
      return axios.put("http://localhost:54973/api/Task/", model);
    },

    async createCategory(model) {
      return axios.post("http://localhost:54973/api/Category", model);
    },

    // eslint-disable-next-line
    async updateCategory(model) {
      // not implented
      // await axios.put("http://localhost:54973/api/Category", model);
    },

    async createSprint(model) {
      return axios.post("http://localhost:54973/api/Sprint", model);
    },

    async updateSprint(model) {
      return axios.put("http://localhost:54973/api/Sprint", model);
    },

    async createProject(model) {
      return axios.post("http://localhost:54973/api/Project", model);
    },

    async editProject(model) {
      return axios.put("http://localhost:54973/api/Project", model);
    },

    async selectProject() {
      await axios
        .get(
          "http://localhost:54973/api/Project/GetById?id=" +
            this.$route.query.projectId
        )
        .then(project => {
          store.commit("selectProject", project.data.data[0]);
        });
    },

    async selectSprint() {
      await axios
        .get(
          "http://localhost:54973/api/Sprint/GetById?id=" +
            this.$route.query.sprintId
        )
        .then(sprint => {
          store.commit("selectSprint", sprint.data.data[0]);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3a9ad9 !important;
}

.main-color {
  color: white !important;
}

.md-drawer {
  width: 275px;
}

.drawer-sidenav {
  width: 50%;
}

.hide-right {
  width: 0;
}

@media (max-width: 600px) {
  .drawer-sidenav {
    width: 100%;
    max-width: 100% !important;
  }
}
</style>
