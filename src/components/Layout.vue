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
            <router-link to="/">Projects</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer
      class="md-right"
      v-bind:class="{ 'hide-right': !$store.state.rightSideMenuOpen }"
      :md-active.sync="$store.state.rightSideMenuOpen"
    >
      <add-task-modal 
      v-if="$store.state.rightSideMenuOpen"
      v-bind:taskModel="$store.state.updatingTask"
      v-bind:isCreating="$store.state.isCreating"
      v-on:close-dialog="closeSideNav"></add-task-modal>
    </md-drawer>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
import AddTaskModal from "./tasks/add-task-modal/add-task-modal.vue";

export default {
  name: "Layout",
  data: () => ({
    showNavigation: false
  }),
  components: {
    AddTaskModal
  },
  created: function() {
    store.commit("selectProjectId", this.$route.query.projectId);
  },
  methods: {
    closeSideNav: function(model, isCancel) {
      store.commit("toggleRightSideMenu"); 
      
      if (isCancel) return;

      if (store.state.isCreating) {
        this.createTask(model);
      }
      else {
        this.updateTask(model);
      }  
    },
    createTask: async function(model) {
      await axios.post("http://localhost:54973/api/Task/", model);
    },
    updateTask: async function(model) {
      await axios.put("http://localhost:54973/api/Task/", model);
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

.hide-right {
  width: 0;
}
</style>
