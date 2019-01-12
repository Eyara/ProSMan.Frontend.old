<template>
  <div class="tasks-content">
    <md-table v-model="tasks">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
        <md-table-cell md-label="Название" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Описание" md-sort-by="description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="Приоритет" md-sort-by="priority">{{ item.priority }}</md-table-cell>
        <md-table-cell md-label="Оценка по времени" md-sort-by="timeEstimate">{{ item.timeEstimate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss">
.md-table-head.md-numeric, .md-table-cell.md-numeric {
  text-align: center !important;
}

.tasks-content {
  text-align: initial;
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