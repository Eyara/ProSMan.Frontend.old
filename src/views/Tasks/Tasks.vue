<template>
    <div class="tasks-content">
        <div v-if="tasks">
            <div v-if="finishedTasksProportion != null" class="progress-block">
                <div class="progress-main-header">
                    <div>{{$store.state.selectedSprint.name}}</div>
                    <div>
                        <div v-if="!$store.state.selectedSprint.isFinished" @click="createTask()">
                            <md-icon class="btn-action">add</md-icon>
                        </div>
                    </div>
                </div>
                <md-progress-bar
                        class="progress-task-bar"
                        md-mode="determinate"
                        :md-value="finishedTasksProportion"
                ></md-progress-bar>
                <div class="progress-header">{{finishedTasksHours}}ч / {{tasksHours}}ч</div>
                <div class="category-picker">
                    <category-picker
                            v-bind:categories="categories"
                            v-on:select-categories="selectCategories"
                            v-on:create-category="createCategory"
                    ></category-picker>
                </div>
            </div>
            <div v-if="tasks.length === 0">
                <md-empty-state
                        md-icon="list"
                        md-label="Добавь новую задачу"
                        md-description="В этом спринте нет заданий. Добавь их!"
                ></md-empty-state>
            </div>
            <div class="tasks-block" v-else>
                <task
                        v-for="task in selectedTasks"
                        v-bind:key="task.id"
                        v-bind:task="task"
                        v-bind:task-type="taskType.Common"
                        v-on:edit="editTask"
                        v-on:toggle-finish="toggleFinishTask"
                        v-on:toggle-today="toggleTodayTask"
                        v-on:delete="deleteTask"
                >
                </task>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "./tasks.scss";
</style>

<script>
import store from "../../store";
import router from "../../router";
import taskService from "../../services/task.service";
import categoryService from "../../services/category.service";
import CategoryPicker from "../../components/tasks/category-picker/category-picker.vue";
import Task from "../../shared/task/task";
import { Component, Vue, Watch } from "vue-property-decorator";
import { UpdatingTypeEnum } from "@/models/enums/updating-type.enum";
import { TaskTypeEnum } from "@/models/enums/task-type.enum";

@Component({
  name: "tasks",
  components: {
    CategoryPicker,
    Task
  }
})
export default class extends Vue {
  tasks = null;
  categories = [];
  selectedCategories = [];
  isCreating = true;

  created() {
    store.commit("setPageLabel", "Задания");
    store.commit("setMenuButtonType", "back");

    // this.refresh();
  }

  get taskType() {
    return TaskTypeEnum;
  }

  get finishedTasksHours() {
    return this.tasks
      .filter(x => x.isFinished)
      .map(x => x.timeEstimate)
      .reduce((accumulator, array) => accumulator + array, 0);
  }

  get tasksHours() {
    return this.tasks
      .map(x => x.timeEstimate)
      .reduce((accumulator, array) => accumulator + array, 0);
  }

  get finishedTasksProportion() {
    return 100 * (this.finishedTasksHours / this.tasksHours);
  }

  get selectedTasks() {
    if (this.selectedCategories.length === 0) return [];

    return this.tasks.filter(x =>
      this.selectedCategories.map(s => s.id).includes(x.categoryId)
    );
  }

  get hasCategories() {
    return this.categories.length > 0;
  }

  get hasBeenUpdated() {
    return store.state.hasBeenUpdated;
  }

  selectedSprintAndProjectIds() {
    return store.state.selectedSprint.id && store.state.selectedProject.id;
  }

  @Watch("hasBeenUpdated", { immediate: true })
  hasBeenUpdatedWatcher(newValue) {
    if (newValue) {
      switch (+store.state.updatingType) {
        case UpdatingTypeEnum.Task:
          this.getTasks();
          break;
        case UpdatingTypeEnum.Category:
          this.getCategories();
          break;
      }
      store.commit("setHasBeenUpdated", false);
    }
  }

  @Watch("selectedSprintAndProjectIds", { immediate: true })
  selectedSprintAndProjectIdsWatcher(newValue) {
    if (newValue) {
      this.refresh();
    }
  }

  refresh() {
    if (store.state.selectedProject.id && store.state.selectedSprint.id) {
      router.replace({
        name: "tasks",
        query: {
          projectId: store.state.selectedProject.id,
          sprintId: store.state.selectedSprint.id
        }
      });
    }

    this.getCategories();
    this.getTasks();
  }

  getTasks() {
    return taskService
      .getBySprintId(this.$route.query.sprintId)
      .then(response => {
        this.tasks = response.data.data;
      });
  }

  getCategories() {
    categoryService
      .getByProjectId(this.$route.query.projectId)
      .then(response => {
        this.categories = response.data.data.map(x => {
          return {
            id: x.id,
            name: x.name,
            selected: true
          };
        });
        this.selectCategories(this.categories);
      });
  }

  createTask() {
    store.dispatch("setUpdatingItem", [true, UpdatingTypeEnum.Task]);
  }

  createCategory() {
    store.dispatch("setUpdatingItem", [true, UpdatingTypeEnum.Category]);
  }

  editTask(task) {
    store.dispatch("setUpdatingItem", [false, UpdatingTypeEnum.Task, task]);
  }

  async toggleFinishTask(id) {
    await taskService.toggleFinishTask(id);
    this.getTasks();
  }

  async toggleTodayTask(id) {
    await taskService.toggleTodayTask(id);
    this.getTasks();
  }

  async deleteTask(id) {
    await taskService.deleteTask(id);
    this.getTasks();
  }

  selectCategories(selectedCategories) {
    this.selectedCategories = selectedCategories;
  }
}
</script>
