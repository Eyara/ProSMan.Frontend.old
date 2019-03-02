<template>
  <div>
    <div v-if="sprints">
      <div v-if="sprints.length === 0">
        <md-empty-state
          md-icon="date_range"
          md-label="Создай первый спринт"
          md-description="В этом проекте пока нет спринтов. Добавь их!"
        ></md-empty-state>
      </div>
      <div v-else>
        <sprint-timeline
          v-bind:sprints="sprints"
          v-on:tasks-open="tasksOpen"
          v-on:edit-sprint="editSprint"
          v-on:delete-sprint="deleteSprint"
        ></sprint-timeline>
      </div>
      <div class="action-block">
        <div @click="createSprint()">
          <md-button class="btn-action">Создать новый спринт</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import router from "../router.js";
import sprintService from "../services/sprint.service.js";
import SprintTimeline from "../components/sprints/sprint-timeline/sprint-timeline.vue";

export default {
  name: "sprints",
  components: {
    SprintTimeline
  },
  data: () => ({
    sprints: null
  }),

  created() {
    store.commit("setPageLabel", "Спринты");
    store.commit("setMenuButtonType", "back");

    if (this.selectedProjectId) this.getSprints();
  },

  computed: {
    hasBeenUpdated() {
      return store.state.hasBeenUpdated;
    },

    selectedProjectId() {
      return store.state.selectedProject.id;
    }
  },

  watch: {
    hasBeenUpdated(newValue) {
      if (newValue) {
        this.getSprints();
        store.commit("setHasBeenUpdated", false);
      }
    },

    selectedProjectId(newValue) {
      if (newValue) this.getSprints();
    }
  },

  methods: {
    getSprints() {
      router.replace({
        name: "sprints",
        query: { projectId: store.state.selectedProject.id }
      });
      sprintService
        .getByProjectId(store.state.selectedProject.id)
        .then(response => {
          this.sprints = response.data.data;
        });
    },

    tasksOpen(sprint) {
      router.push({ path: "/tasks" });
      store.commit("selectSprint", sprint);
    },

    createSprint() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "sprint");
      store.commit("toggleRightSideMenu");
    },

    editSprint(sprint) {
      store.commit("setCreating", false);
      store.commit("updateItem", sprint);
      store.commit("setUpdatingType", "sprint");
      store.commit("toggleRightSideMenu");
    },

    async deleteSprint(id) {
      await sprintService.deleteSprint(id);
      this.getSprints();
    }
  }
};
</script>

<style scoped lang="scss">
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