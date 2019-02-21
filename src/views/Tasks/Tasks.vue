<template>
  <div class="tasks-content">
    <div class="progress-block">
      <div>{{$store.state.selectedSprint.name}}</div>
      <md-progress-bar
        class="progress-task-bar"
        md-mode="determinate"
        :md-value="finishedTasksProportion"
      ></md-progress-bar>
      <div v-if="hasCategories" class="category-picker">
        <category-picker
          v-bind:categories="categories"
          v-on:select-categories="selectCategories"
          v-on:create-category="createCategory"
        ></category-picker>
      </div>
    </div>
    <div class="tasks-block" v-if="tasks.length > 0">
      <div
        class="task"
        v-for="task in selectedTasks"
        v-bind:key="task.id"
        v-bind:class="{ 'task-finished': task.isFinished}"
      >
        <div class="btn-circle" @click="toggleFinishTask(task.id)"></div>
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
          <div @click="deleteTask(task.id)">
            <md-icon>delete</md-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="action-block">
      <div @click="createTask()">
        <md-icon class="btn-action">add</md-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./tasks.scss";
</style>

<script>
import axios from "axios";
import store from "../../store.js";
import router from "../../router.js";
import CategoryPicker from "../../components/tasks/category-picker/category-picker.vue";

export default {
  name: "tasks",
  data: () => ({
    tasks: [],
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

    if (store.state.selectedProject.id && store.state.selectedSprint.id) {
      this.refresh();
    }
  },

  computed: {
    finishedTasksLength() {
      return this.tasks.filter(x => x.isFinished).length;
    },

    tasksLength() {
      return this.tasks.length;
    },

    finishedTasksProportion() {
      return 100 * (this.finishedTasksLength / this.tasksLength);
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
    },
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
      axios
        .get(
          "http://localhost:54973/api/Task/GetBySprintId?id=" +
            store.state.selectedSprint.id
        )
        .then(response => {
          this.tasks = response.data.data;
        });
    },

    getCategories() {
      axios
        .get(
          "http://localhost:54973/api/Category/GetByProjectId?id=" +
            store.state.selectedProject.id
        )
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

    createTask() {
      store.commit("setCreating", true);
      store.commit("toggleRightSideMenu");
      store.commit("setUpdatingType", "task");
    },

    createCategory() {
      store.commit("setCreating", true);
      store.commit("toggleRightSideMenu");
      store.commit("setUpdatingType", "category");
    },

    editTask(task) {
      store.commit("setCreating", false);
      store.commit("updateItem", task);
      store.commit("setUpdatingType", "task");
      store.commit("toggleRightSideMenu");
    },

    async toggleFinishTask(id) {
      await axios.post(
        "http://localhost:54973/api/Task/ToggleFinishTask?id=" + id
      );
      this.getTasks();
    },

    async deleteTask(id) {
      await axios.delete("http://localhost:54973/api/Task?id=" + id);
      this.getTasks();
    },

    selectCategories(selectedCategories) {
      this.selectedCategories = selectedCategories;
    }
  }
};
</script>