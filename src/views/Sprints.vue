<template>
  <div>
    <md-tabs md-alignment="centered" v-if="sprints">
      <md-tab id="sprints" md-label="Спринты">
        <div>
          <div v-if="sprints.length == 0">
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
              v-on:finish-sprint="finishSprint"
              v-on:edit-sprint="editSprint"
              v-on:delete-sprint="deleteSprint"
            ></sprint-timeline>
          </div>
          <div class="action-block">
            <div v-if="sprintIsCreatable" @click="createSprint()">
              <md-button class="btn-action-add">Создать новый спринт</md-button>
            </div>
          </div>
          <div class="pagination-block" v-if="hasSprint">
            <q-pagination
              v-model="currentPage"
              :max="lastPage"
              :direction-links="true"
            >
            </q-pagination>
          </div>
        </div>
      </md-tab>
      <md-tab id="non-sprint-tasks" md-label="Задания">
        <div v-if="nonSprintTasks == null || nonSprintTasks.length === 0">
          <md-empty-state
            md-icon="list"
            md-label="Создай первую задачу"
            md-description="У тебя нет задач без спринта. Добавь их!"
          ></md-empty-state>
        </div>
        <div v-else>
          <div class="tasks-content">
            <div class="tasks-block">
              <div class="task">
                <task
                  v-for="nsTask in nonSprintTasks"
                  v-bind:key="nsTask.id"
                  v-bind:task="nsTask"
                  v-bind:class="{ 'task-finished': nsTask.isFinished }"
                  v-bind:task-type="taskType.NonSprint"
                  v-on:edit="editNonSprintTask"
                  v-on:toggle-finish="toggleFinishTask"
                  v-on:toggle-today="toggleTodayTask"
                  v-on:finish-task="toggleFinishTask"
                  v-on:delete="deleteTask"
                >
                </task>
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
        <div v-if="backlogTasks == null || backlogTasks.length === 0">
          <md-empty-state
            md-icon="list"
            md-label="Создай первую задачу в бэклог"
            md-description="У тебя нет задач в бэклоге. Добавь их!"
          ></md-empty-state>
        </div>
        <div v-else>
          <div class="tasks-content">
            <div class="tasks-block">
              <task
                v-for="task in backlogTasks"
                v-bind:key="task.id"
                v-bind:task="task"
                v-bind:task-type="taskType.Backlog"
                v-on:edit="editBacklogTask"
                v-on:move-to-sprint="moveToSprint"
                v-on:delete="deleteBacklogTask"
              >
              </task>
            </div>
          </div>
        </div>
        <div class="action-block">
          <div @click="createBacklogTask()">
            <md-button class="btn-action-add">Создать новую задачу</md-button>
          </div>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import store from "../store";
import router from "../router";

import { Component, Vue, Watch } from "vue-property-decorator";

import backlogTaskService from "../services/backlogTask.service";
import nonSprintTaskService from "../services/nonSprintTask.service";
import sprintService from "../services/sprint.service";

import SprintTimeline from "../components/sprints/sprint-timeline/sprint-timeline.vue";
import Task from "../shared/task/task.vue";

import { TaskTypeEnum } from "@/models/enums/task-type.enum";
import { UpdatingTypeEnum } from "@/models/enums/updating-type.enum";
import { ISprintModel } from "@/models/sprint.model";
import { QPagination } from "quasar";

@Component({
  name: "sprints",
  components: {
    Task,
    SprintTimeline,
    QPagination
  }
})
export default class extends Vue {
  sprints: ISprintModel[] = null;
  nonSprintTasks = null;
  backlogTasks = null;
  currentPage: number = 1;
  lastPage: number = 0;
  pageCount: number = 5;

  created() {
    store.commit("setPageLabel", "Спринты");
    store.commit("setMenuButtonType", "back");

    this.getSprints();
    this.getNonSprintTasks();
    this.getBacklogTasks();
  }

  get taskType() {
    return TaskTypeEnum;
  }

  get hasBeenUpdated() {
    return store.state.hasBeenUpdated;
  }

  get selectedProjectId() {
    return store.state.selectedProject.id;
  }

  get hasSprint() {
    return this.sprints && this.sprints.length > 0;
  }

  get hasNonFinishedSprint() {
    return this.hasSprint && this.sprints.some(sprint => !sprint.isFinished);
  }

  get sprintIsCreatable() {
    return !this.hasNonFinishedSprint;
    // TODO: not the best solution, will be changed in the future releases
  }

  @Watch("hasBeenUpdated", { immediate: true })
  hasBeenUpdatedWatcher(newValue) {
    if (newValue) {
      this.getNonSprintTasks();
      this.getBacklogTasks();
      this.getSprints();
      store.commit("setHasBeenUpdated", false);
    }
  }

  @Watch("selectedProjectId", { immediate: true })
  selectedProjectIdWatcher(newValue) {
    if (newValue) {
      this.getSprints();
      this.getNonSprintTasks();
      this.getBacklogTasks();
    }
  }

  @Watch("currentPage", { immediate: true })
  currentPageWatcher(newValue) {
    if (newValue) {
      this.getSprints();
    }
  }

  getSprints() {
    sprintService
      .getByProjectId(
        this.$route.query.projectId.toString(),
        this.currentPage,
        this.pageCount
      )
      .then(response => {
        this.sprints = response.data.items;
        this.lastPage = response.data.lastPage;
      });
  }

  getNonSprintTasks() {
    nonSprintTaskService.getAll(this.$route.query.projectId).then(response => {
      this.nonSprintTasks = response.data.data;
    });
  }

  getBacklogTasks() {
    backlogTaskService.getAll(this.$route.query.projectId).then(response => {
      this.backlogTasks = response.data.data;
    });
  }

  tasksOpen(sprint: ISprintModel) {
    router.push({
      path: "/tasks",
      query: {
        projectId: this.selectedProjectId.toString(),
        sprintId: sprint.id.toString()
      }
    });
    store.commit("selectSprint", sprint);
  }

  createSprint() {
    store.dispatch("setUpdatingItem", [true, UpdatingTypeEnum.Sprint]);
  }

  createNonSprintTask() {
    store.dispatch("setUpdatingItem", [true, UpdatingTypeEnum.NonSprintTask]);
  }

  createBacklogTask() {
    store.dispatch("setUpdatingItem", [true, UpdatingTypeEnum.BacklogTask]);
  }

  editSprint(sprint) {
    store.dispatch("setUpdatingItem", [false, UpdatingTypeEnum.Sprint, sprint]);
  }

  editNonSprintTask(task) {
    store.dispatch("setUpdatingItem", [
      false,
      UpdatingTypeEnum.NonSprintTask,
      task
    ]);
  }

  editBacklogTask(task) {
    store.dispatch("setUpdatingItem", [
      false,
      UpdatingTypeEnum.BacklogTask,
      task
    ]);
  }

  moveToSprint(id) {
    store.dispatch("setUpdatingItem", [
      false,
      UpdatingTypeEnum.MoveToSprint,
      { id: id }
    ]);
  }

  async toggleFinishTask(id) {
    await nonSprintTaskService.toggleFinishTask(id);
    this.getNonSprintTasks();
  }

  async toggleTodayTask(id) {
    await nonSprintTaskService.toggleTodayTask(id);
    this.getNonSprintTasks();
  }

  async finishSprint(id) {
    await sprintService.finish(id);
    this.getSprints();
    this.getBacklogTasks();
  }

  async deleteTask(id) {
    await nonSprintTaskService.delete(id);
    this.getNonSprintTasks();
  }

  async deleteBacklogTask(id) {
    await backlogTaskService.delete(id);
    this.getBacklogTasks();
  }

  async deleteSprint(id) {
    await sprintService.deleteSprint(id);
    this.getSprints();
  }
}
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

.pagination-block {
  display: flex;
  justify-content: center;
  margin: 15px 0 5px 0;
}
</style>
