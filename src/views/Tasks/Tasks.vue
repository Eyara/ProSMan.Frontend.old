<template>
  <div class="tasks-content">
    <add-task-modal
      v-bind:isCreating="isCreating"
      v-bind:taskModel="taskModel"
      v-bind:showDialog="showDialog"
      v-on:close-dialog="closeDialog"
    ></add-task-modal>
    <div class="progress-block">
      <div>Pre-Alpha 0.1</div>
      <md-progress-bar
        class="progress-task-bar"
        md-mode="determinate"
        :md-value="finishedTasksProportion"
      ></md-progress-bar>
      <div class="category-picker">
        <category-picker v-on:select-categories="selectCategories"></category-picker>
      </div>
    </div>
    <div class="tasks-block" v-if="tasks.length > 0">
      <div
        class="task"
        v-for="task in selectedTasks"
        v-bind:key="task.id"
        v-bind:class="{ 'task-finished': task.isFinished}"
      >
        <div class="btn-circle"></div>
        <div class="task-item">
          <span class="task-name">{{task.name}}</span>
          <div class="task-info">
            <div class="task-info-header">
              <md-icon>access_time</md-icon>
              <span class="task-sub-info">{{task.timeEstimate}}ч</span>
            </div>
            <div class="task-info-header">
              <md-icon style="margin-right: -5px;">priority_high</md-icon>
              <span class="task-sub-info">{{task.priority}}</span>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <div @click="editTask(task)">
            <md-icon>edit</md-icon>
          </div>
          <div @click="deleteTask(task.id)">
            <md-icon>delete</md-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="action-block">
      <div @click="createTaskDialog()">
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
import AddTaskModal from "../../components/tasks/add-task-modal/add-task-modal.vue";

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
    AddTaskModal,
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
    }
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
    createTask: async function(model) {
      await axios.post("http://localhost:54973/api/Task/", model);
      this.getTasks();
    },
    editTask: async function(task) {
      console.log(task);
      store.commit("toggleRightSideMenu");
    },
    deleteTask: async function(id) {
      await axios.delete("http://localhost:54973/api/Task?id=" + id);
      this.getTasks();
    },
    openDialog: function() {
      this.showDialog = true;
    },
    closeDialog: function(model) {
      this.showDialog = false;
      if (model != null) {
        this.createTask(model);
      }
    },
    createTaskDialog: function() {
      this.isCreating = true;
      this.openDialog();
    },

    selectCategories: function(selectedCategories) {
      this.selectedCategories = selectedCategories;
    }
  }
};
</script>