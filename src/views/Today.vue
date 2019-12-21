<template>
    <div class="tasks-content">
        <div v-if="tasks">
            <div class="tasks-block" v-if="tasks.length > 0">
                <task
                        v-for="task in tasks"
                        v-bind:key="task.id"
                        v-bind:task="task"
                        v-bind:task-type="taskType.Today"
                        v-on:toggle-finish="toggleFinishTask"
                        v-on:toggle-today="toggleTodayTask"
                >
                </task>
            </div>
            <div v-else>
                <md-empty-state
                        md-icon="today"
                        md-label="Нет задач"
                        md-description="Задачи на сегодня отсутствуют."
                ></md-empty-state>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import router from "../router";
import taskService from "../services/task.service";
import { Component, Vue, Watch } from "vue-property-decorator";
import { UpdatingTypeEnum } from "@/models/enums/updating-type.enum";
import Task from "@/shared/task/task";
import { TaskTypeEnum } from "@/models/enums/task-type.enum";

@Component({
  name: "today",
  components: {
    Task
  }
})
export default class extends Vue {
  tasks = null;

  created() {
    store.commit("setPageLabel", "Задания на день");
    this.refresh();
  }

  get taskType() {
    return TaskTypeEnum;
  }

  get hasBeenUpdated() {
    return store.state.hasBeenUpdated;
  }

  @Watch("hasBeenUpdated", { immediate: true })
  hasBeenUpdatedWatcher(newValue) {
    if (newValue) {
      if (store.state.updatingType === UpdatingTypeEnum.Task) {
        this.getTodayTasks();
      }
      store.commit("setHasBeenUpdated", false);
    }
  }

  refresh() {
    router.replace({
      name: "today"
    });
    this.getTodayTasks();
  }

  getTodayTasks() {
    return taskService.getTodayTasks().then(response => {
      this.tasks = response.data.data;
    });
  }

  async toggleFinishTask(id) {
    await taskService.toggleFinishTask(id);
    this.getTodayTasks();
  }

  async toggleTodayTask(id) {
    await taskService.toggleTodayTask(id);
    this.getTodayTasks();
  }
}
</script>

<style lang="scss" scoped>
@import "./Tasks/tasks.scss";
</style>
