<template>
  <div class="tasks-content">
    <div v-if="tasks">
      <div v-if="finishedTasksProportion != null" class="progress-block">
        <div class="progress-main-header">
          <div>{{$store.state.selectedSprint.name}}</div>
          <div>
            <div @click="createTask()">
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
        <div
          class="task"
          v-for="task in selectedTasks"
          v-bind:key="task.id"
          v-bind:class="{ 'task-finished': task.isFinished}"
        >
          <div @click="toggleFinishTask(task.id)">
            <div class="btn-circle"></div>
          </div>
          <div class="task-item" @click="editTask(task)">
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
              <md-icon v-if="todayTaskDate(task.date)">star_border</md-icon>
              <md-icon v-else>star</md-icon>
            </div>
            <div @click="deleteTask(task.id)">
              <md-icon>delete</md-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./tasks.scss";
</style>

<script>
import store from "../../store.js";
import router from "../../router.js";
import moment from "moment";
import taskService from "../../services/task.service.js";
import categoryService from "../../services/category.service.js";
import CategoryPicker from "../../components/tasks/category-picker/category-picker.vue";

export default {
  name: "tasks",
  data: () => ({
    tasks: null,
    categories: [],
    selectedCategories: [],
    taskModel: {},
    isCreating: true,
    showDialog: false
  }),

  components: {
    CategoryPicker
  },

  created() {
    store.commit("setPageLabel", "Задания");
    store.commit("setMenuButtonType", "back");

    if (store.state.selectedProject.id && store.state.selectedSprint.id) {
      this.refresh();
    }
  },

  computed: {
    finishedTasksHours() {
      return this.tasks
        .filter(x => x.isFinished)
        .map(x => x.timeEstimate)
        .reduce((accumulator, array) => accumulator + array, 0);
    },

    tasksHours() {
      return this.tasks
        .map(x => x.timeEstimate)
        .reduce((accumulator, array) => accumulator + array, 0);
    },

    finishedTasksProportion() {
      return 100 * (this.finishedTasksHours / this.tasksHours);
    },

    selectedTasks() {
      if (this.selectedCategories.length === 0) return [];

      return this.tasks.filter(x =>
        this.selectedCategories.map(s => s.id).includes(x.categoryId)
      );
    },

    hasCategories() {
      return this.categories.length > 0;
    },

    hasBeenUpdated() {
      return store.state.hasBeenUpdated;
    },

    selectedSprintAndProjectIds() {
      return store.state.selectedSprint.id && store.state.selectedProject.id;
    }
  },

  watch: {
    hasBeenUpdated(newValue) {
      if (newValue) {
        switch (store.state.updatingType) {
          case "task":
            this.getTasks();
            break;
          case "category":
            this.getCategory();
            break;
        }
        store.commit("setHasBeenUpdated", false);
      }
    },

    selectedSprintAndProjectIds(newValue) {
      if (newValue) {
        this.refresh();
      }
    }
  },

  methods: {
    refresh() {
      router.replace({
        name: "tasks",
        query: {
          projectId: store.state.selectedProject.id,
          sprintId: store.state.selectedSprint.id
        }
      });

      this.getCategories();
      this.getTasks();
    },

    getTasks() {
      return taskService
        .getBySprintId(store.state.selectedSprint.id)
        .then(response => {
          this.tasks = response.data.data;
        });
    },

    getCategories() {
      categoryService
        .getByProjectId(store.state.selectedProject.id)
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
    },

    todayTaskDate(date) {
      return moment(date).format("YYYY-MM-DD") != moment().format("YYYY-MM-DD");
    },

    createTask() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "task");
      store.dispatch("toggleRightSideMenu");
    },

    createCategory() {
      store.commit("setCreating", true);
      store.commit("setUpdatingType", "category");
      store.dispatch("toggleRightSideMenu");
    },

    editTask(task) {
      window.scrollTo(0, 0);
      store.commit("setCreating", false);
      store.commit("updateItem", task);
      store.commit("setUpdatingType", "task");
      store.dispatch("toggleRightSideMenu");
    },

    async toggleFinishTask(id) {
      await taskService.toggleFinishTask(id);
      this.getTasks();
    },

    async toggleTodayTask(id) {
      await taskService.toggleTodayTask(id);
      this.getTasks();
    },

    async deleteTask(id) {
      await taskService.deleteTask(id);
      this.getTasks();
    },

    selectCategories(selectedCategories) {
      this.selectedCategories = selectedCategories;
    }
  }
};
</script>