<template>
  <div class="tasks-content">
    <div class="progress-block">
      <div>Pre-Alpha 0.1</div>
      <md-progress-bar
        class="progress-task-bar"
        md-mode="determinate"
        :md-value="finishedTasksProportion"
      ></md-progress-bar>
    </div>
    <div class="tasks-block">
      <div
        class="task"
        v-for="task in tasks"
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
      </div>
    </div>
    <div class="action-block">
      <md-icon class="btn-action">add</md-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.md-table-head.md-numeric,
.md-table-cell.md-numeric {
  text-align: center !important;
}

.md-icon {
  font-size: 22px !important;
}

.btn-circle {
  display: inline-block;
  border: 2px solid #448aff;
  background-color: transparent;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
  transition: 0.4s;
}

.btn-circle:hover {
  background-color: #448aff;
}

.btn-action {
  color: #448aff !important;
  background-color: transparent;
  border: 2px solid #448aff;
  border-radius: 50%;
  font-size: 32px !important;
  height: 40px !important;
  width: 40px !important;
  transition: 0.4s;
}

.btn-action:hover {
  color: #fafafa !important;
  background-color: #448aff !important;
}

.progress-block {
  font-size: 24px;
  font-weight: 700;
}

.progress-task-bar {
  margin-top: 10px;
  height: 10px;
  border-radius: 5px;
}

.tasks-content {
  text-align: initial;
}

.tasks-block {
  margin-top: 20px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.5);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
  padding: 0px 20px 20px 20px;
}

.task {
  display: flex;
  padding-top: 20px;
}

.task-item {
  margin-left: 20px;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
}

.task-name {
  font-size: 18px;
  font-weight: 600;
}

.task-info {
  display: flex;
  margin-top: 5px;

  .task-info-header:not(:first-child) {
    margin-left: 15px;
  }
}

.task-sub-info {
  margin-left: 5px;
  vertical-align: bottom;
}

.task-info-header {
  .md-icon {
    color: #448aff;
  }

  font-size: 14px;
  color: #448aff;
}

.task-finished {
  .task-item > .task-name {
    color: rgba($color: #000000, $alpha: 0.2);
  }

  .task-item > .task-info > .task-info-header {
    .md-icon {
      color: rgba($color: #000000, $alpha: 0.2);
    }

    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.2);
  }
  .btn-circle {
    background-color: #448aff;
  }
}

.action-block {
  margin: 20px 0 0 10px;
}
</style>

<script>
import axios from "axios";
import store from "../store.js";

export default {
  name: "tasks",
  data: () => ({
    tasks: []
  }),
  created: function() {
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
    }
  },
  methods: {
    getTasks: function() {
      //   router.push({
      //     name: "sprints",
      //     query: { projectId: store.state.selectedProjectId }
      //   });
      axios
        .get(
          "http://localhost:54973/api/Task/GetBySprintId?id=" +
            store.state.selectedSprintId
        )
        .then(response => {
          this.tasks = response.data.data;
        });
    }
  }
};
</script>