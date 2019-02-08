<template>
  <div>
    <div v-if="sprints.length > 0">
      <sprint-timeline v-bind:sprints="sprints"
      v-on:tasks-open="tasksOpen"></sprint-timeline>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
import router from "../router.js";
import SprintTimeline from "../components/sprints/sprint-timeline/sprint-timeline.vue";

export default {
  name: "sprints",
  components: {
    SprintTimeline
  },
  data: () => ({
    sprints: []
  }),
  created: function() {
    store.commit("setPageLabel", "Спринты");
    this.getSprints();
  },
  methods: {
    getSprints: function() {
      router.replace({
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
      router.push({path: "/tasks" });
      store.commit("selectSprintId", sprintId);
    }
  }
};
</script>

<style scoped lang="scss">
</style>