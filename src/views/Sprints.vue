<template>
  <div>
    <md-tabs md-alignment="centered">
      <md-tab id="sprints" md-label="Спринты">
        <div>
          <div v-if="sprints == null || sprints.length == 0">
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
              <md-button class="btn-action-add">Создать новый спринт</md-button>
            </div>
          </div>
        </div>
      </md-tab>
      <md-tab id="non-sprint-tasks" md-label="Задания вне спринтов">
        <div v-if="nonSprintTasks == null || nonSprintTasks.length == 0">
          <md-empty-state
            md-icon="list"
            md-label="Создай первую задачу"
            md-description="У тебя нет задач без спринта. Добавь их!"
          ></md-empty-state>
        </div>
        <div v-else>
          <div class="tasks-content">
            <div class="tasks-block">
              <div
                class="task"
                v-for="nsTask in nonSprintTasks"
                v-bind:key="nsTask.id"
                v-bind:class="{ 'task-finished': nsTask.isFinished}"
              >
                <div class="btn-circle" @click="toggleFinishTask(nsTask.id, true)"></div>
                <div class="task-item">
                  <span class="task-name">{{nsTask.name}}</span>
                  <div class="task-info">
                    <div class="task-info-header">
                      <md-icon>access_time</md-icon>
                      <span class="task-sub-info">{{nsTask.timeEstimate}}ч</span>
                    </div>
                    <div class="task-info-header">
                      <md-icon style="margin-right: -5px;">priority_high</md-icon>
                      <span class="task-sub-info">{{nsTask.priority | priority}}</span>
                    </div>
                  </div>
                </div>
                <div class="action-buttons">
                  <!-- <div @click="toggleTodayTask(nsTask.id, true)"> -->
                  <div>
                    <md-icon v-if="todayTaskDate(nsTask.date)">star_border</md-icon>
                    <md-icon v-else>star</md-icon>
                  </div>
                  <div @click="deleteTask(nsTask.id, true)">
                    <md-icon>delete</md-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="action-block">
          <div @click="createNonSprintTask()">
            <md-button class="btn-action-add">Создать новую задачу</md-button>
          </div>
        </div>
      </md-tab>
      <md-tab id="backlog" md-label="Бэклог">
        <md-empty-state
          md-icon="build"
          md-label="В разработке"
          md-description="Бэклога пока нет. :("
        ></md-empty-state>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import store from "../store.js";
import router from "../router.js";
import moment from "moment";
import nonSprintTaskService from "../services/nonSprintTask.service.js";
import sprintService from "../services/sprint.service.js";
import SprintTimeline from "../components/sprints/sprint-timeline/sprint-timeline.vue";

export default {
  name: "sprints",
  components: {
    SprintTimeline
  },
  data: () => ({
    sprints: null,
    nonSprintTasks: null,
    backlog: null
  }),

  created() {
    store.commit("setPageLabel", "Спринты");
    store.commit("setMenuButtonType", "back");

    if (this.selectedProjectId) this.getSprints();
    this.getNonSprintTasks();
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
        this.getNonSprintTasks();
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

    getNonSprintTasks() {
      nonSprintTaskService.getAll().then(response => {
        this.nonSprintTasks = response.data.data;
      });
    },

    tasksOpen(sprint) {
      router.push({ path: "/tasks" });
      store.commit("selectSprint", sprint);
    },

    createSprint() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "sprint");
      store.dispatch("toggleRightSideMenu");
    },

    createNonSprintTask() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "nonSprintTask");
      store.dispatch("toggleRightSideMenu");
    },

    editSprint(sprint) {
      store.commit("setCreating", false);
      store.commit("updateItem", sprint);
      store.commit("setUpdatingType", "sprint");
      store.dispatch("toggleRightSideMenu");
    },

    todayTaskDate(date) {
      return moment(date).format("YYYY-MM-DD") != moment().format("YYYY-MM-DD");
    },

    async toggleFinishTask(id, isNonSprintTask) {
      if (isNonSprintTask) {
        await nonSprintTaskService.toggleFinishTask(id);
      }
      this.getNonSprintTasks();
    },

    async deleteTask(id, isNonSprintTask) {
      if (isNonSprintTask) {
        await nonSprintTaskService.delete(id);
      }
      this.getNonSprintTasks();
    },

    async deleteSprint(id) {
      await sprintService.deleteSprint(id);
      this.getSprints();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./Tasks/tasks.scss";

.btn-action-add {
  color: #3a9ad9 !important;
  background-color: transparent;
  transition: 0.4s;
  z-index: 0;
}

.btn-action-add:hover {
  color: #fafafa !important;
  background-color: #3a9ad9 !important;
}
</style>