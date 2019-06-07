<template>
  <div class="tasks-content">
    <div v-if="tasks && tasks.length > 0">
      <div class="tasks-block">
        <div
          class="task"
          v-for="task in tasks"
          v-bind:key="task.id"
          v-bind:class="{ 'task-finished': task.isFinished}"
        >
          <div class="btn-circle" @click="toggleFinishTask(task.id)"></div>
          <div class="task-item">
            <span class="task-name">{{task.name}}</span>
            <div class="task-info">
              <div class="task-info-header">
                <md-icon>access_time</md-icon>
                <span class="task-sub-info">{{task.timeEstimate}}ч</span>
              </div>
              <div class="task-info-header">
                <md-icon style="margin-right: -5px;">priority_high</md-icon>
                <span class="task-sub-info">{{task.priority | priority}}</span>
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <div @click="toggleTodayTask(task.id)">
              <md-icon>star</md-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        <md-empty-state
        md-icon="today"
        md-label="Нет задач"
        md-description="Задачи на сегодня отсутствуют."
      ></md-empty-state>
      </div>
  </div>
</template>

<script>
import store from "../store.js";
import router from "../router.js";
import taskService from "../services/task.service.js";

export default {
  name: "today",
  data: () => ({
    tasks: null,
  }),

  created() {
    store.commit("setPageLabel", "Задания на день");
    this.refresh();
  },

  computed: {
    hasBeenUpdated() {
      return store.state.hasBeenUpdated;
    },
  },

  watch: {
    hasBeenUpdated(newValue) {
      if (newValue) {
        switch (store.state.updatingType) {
          case "task":
            this.getTodayTasks();
            break;
        }
        store.commit("setHasBeenUpdated", false);
      }
    },
  },

  methods: {
    refresh() {
      router.replace({
        name: "today",
      });
      this.getTodayTasks();
    },

    getTodayTasks() {
      return taskService
        .getTodayTasks()
        .then(response => {
          this.tasks = response.data.data;
        });
    },

    async toggleFinishTask(id) {
      await taskService.toggleFinishTask(id);
      this.getTodayTasks();
    },

    async toggleTodayTask(id) {
      await taskService.toggleTodayTask(id);
      this.getTodayTasks();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./Tasks/tasks.scss";
</style>