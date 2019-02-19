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
  created: function() {
    store.commit("selectProjectId", this.$route.query.projectId);
  },
  methods: {
    closeSideNav: function(model, isCancel) {
      store.commit("toggleRightSideMenu");

      if (isCancel) return;

      if (store.state.updatingType == "task") {
        store.state.isCreating
          ? this.createTask(model)
          : this.updateTask(model);
        return;
      } else if (store.state.updatingType == "category") {
        store.state.isCreating
          ? this.createCategory(model)
          : this.updateCategory(model);
        return;
      } else if (store.state.updatingType == "sprint"){
        store.state.isCreating
        ? this.createSprint(model)
        : this.updateSprint(model);
      } else if (store.state.updatingType == "project"){
        store.state.isCreating
        ? this.createProject(model)
        : this.updateProject(model);
      }
    },

    createTask: async function(model) {
      await axios.post("http://localhost:54973/api/Task/", model);
    },

    updateTask: async function(model) {
      await axios.put("http://localhost:54973/api/Task/", model);
    },

    createCategory: async function(model) {
      await axios.post("http://localhost:54973/api/Category", model);
    },

    // eslint-disable-next-line
    updateCategory: async function(model) {
      // not implented
      // await axios.put("http://localhost:54973/api/Category", model);
    },

    createSprint: async function(model) {
      await axios.post("http://localhost:54973/api/Sprint", model);
    },

    updateSprint: async function(model) {
      await axios.put("http://localhost:54973/api/Sprint", model);
    },

    createProject: async function(model) {
      await axios.post("http://localhost:54973/api/Project", model);
    },

    editProject: async function(model) {
      await axios.put("http://localhost:54973/api/Project", model);
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

@media(max-width: 600px) {
  .drawer-sidenav {
    width: 100%;
    max-width: 100% !important;
  }
}
</style>
