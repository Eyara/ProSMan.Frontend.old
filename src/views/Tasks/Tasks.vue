<template>
  <div class="tasks-content">
    <div class="progress-block">
      <div>Pre-Alpha 0.1</div>
      <md-progress-bar
        class="progress-task-bar"
        md-mode="determinate"
        :md-value="finishedTasksProportion"
      ></md-progress-bar>
      <div class="category-picker">
        <category-picker v-on:select-categories="selectCategories"
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
import CategoryPicker from "../../components/tasks/category-picker/category-picker.vue";

export default {
  name: "tasks",
  data: () => ({
    tasks: [],
    selectedCategories: [],
    taskModel: {},
    isCreating: true,
    showDialog: false
  }),
  components: {
    CategoryPicker
  },
  created: function() {
    store.commit("setPageLabel", "Задания");
    this.getTasks();
  },
  computed: {
    finishedTasksLength: function() {
      return this.tasks.filter(x => x.isFinished).length;
    },

    tasksLength: function() {
      return this.tasks.length;
    },

    finishedTasksProportion: function() {
      return 100 * (this.finishedTasksLength / this.tasksLength);
    },

    selectedTasks: function() {
      if (this.selectedCategories.length === 0) return [];

      return this.tasks.filter(x =>
        this.selectedCategories.map(s => s.id).includes(x.categoryId)
      );
    },

    sideNavOpen: function() {
      return store.state.rightSideMenuOpen;  
    }
  },

  watch: {
    // make update task list
    // sideNavOpen(newValue, oldValue) {
    // }
  },

  methods: {
    getTasks: function() {
      axios
        .get(
          "http://localhost:54973/api/Task/GetBySprintId?id=" +
            store.state.selectedSprintId
        )
        .then(response => {
          this.tasks = response.data.data;
        });
    },

    createTask: function() {
      store.commit("setCreating", true);
      store.commit("toggleRightSideMenu");
      store.commit("setUpdatingType", "task");
    },

    createCategory: function() {
      store.commit("setCreating", true);
      store.commit("toggleRightSideMenu");
      store.commit("setUpdatingType", "category");
    },

    editTask: function(task) {
      store.commit("setCreating", false);
      store.commit("updateItem", task);
      store.commit("setUpdatingType", "task");
      store.commit("toggleRightSideMenu");
    },

    toggleFinishTask: async function(id) {
      await axios.post("http://localhost:54973/api/Task/ToggleFinishTask?id=" + id);
      this.getTasks();
    },

    deleteTask: async function(id) {
      await axios.delete("http://localhost:54973/api/Task?id=" + id);
      this.getTasks();
    },

    selectCategories: function(selectedCategories) {
      this.selectedCategories = selectedCategories;
    }
  }
};
</script>