<template>
  <div class="home">
    <div v-if="projects.length > 0">
      <md-card v-for="project in projects" :key="project.id">
        <md-card-header>
          <div class="md-title">{{project.name}}</div>
        </md-card-header>
        <md-card-actions md-alignment="space-between">
          <div>
            <router-link to="/sprints">
              <md-button @click="projectOpen(project.id)">
                <span>Открыть</span>
              </md-button>
            </router-link>
          </div>
          <md-button>Удалить</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '../store.js';
export default {
  name: "home",
  components: {},

  data: function() {
    return {
      projects: []
    };
  },

  created: function() {
    store.commit('setPageLabel', "Проекты");
    this.getProjects();
  },

  methods: {
    getProjects: function() {
      // this.projects = [
      //   { id: 1, name: "Crusader's Destiny" },
      //   { id: 2, name: "Crusader's Run" },
      //   { id: 3, name: "Crusader's Kings" }
      // ];
      axios.get("http://localhost:54973/api/Project").then(response => {
        this.projects = response.data.data;
      });
    },

    projectOpen(projectId) {
      store.commit('selectProjectId', projectId);
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