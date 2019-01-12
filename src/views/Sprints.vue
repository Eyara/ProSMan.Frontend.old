<template>
  <div>
    <div v-if="sprints.length > 0">
      <md-card v-for="sprint in sprints" :key="sprint.id">
        <md-card-header>
          <div class="md-title">{{sprint.name}}</div>
        </md-card-header>
        <md-card-actions md-alignment="space-between">
          <div>
            <router-link to="/tasks">
              <md-button @click="tasksOpen(sprint.id)">
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
import store from "../store.js";
import router from "../router.js";

export default {
  name: "sprints",
  data: () => ({
    sprints: []
  }),
  created: function() {
    store.commit('setPageLabel', "Спринты");
    this.getSprints();
  },
  methods: {
    getSprints: function() {
      router.push({
        name: "sprints",
        query: { projectId: store.state.selectedProjectId }
      });
      axios
        .get(
          "http://localhost:54973/api/Sprint/GetByProjectId?id=" +
            store.state.selectedProjectId
        )
        .then(response => {
          this.sprints = response.data.data;
        });
    },
    tasksOpen(sprintId) {
      store.commit('selectSprintId', sprintId);
    }
  }
};
</script>

<style scoped lang="scss">
</style>