<template>
  <div>
    <project-picker v-bind:projects="projects" v-on:select="selectProject"></project-picker>
    <div v-if="projects && selectedProject.name" class="dashboard">
      <div class="chart-block">
        <div class="chart-item gauge-item">
          <!-- <p> Среднее кол-во часов в день </p> -->
          <vue-svg-gauge
            class="gauge"
            :start-angle="-110"
            :end-angle="110"
            :value="data.averageDayHours"
            :separator-step="0"
            :min="0"
            :max="24"
            gauge-color="#3cba9f"
            :scale-interval="0.1"
          />
        </div>
        <div class="chart-item">
          <doughnut :chart-data="categories_proportion_data"></doughnut>
        </div>
        <div class="chart-item">
          <bar :chart-data="task_count_data"></bar>
        </div>
        <div class="chart-item">
          <line-chart :chart-data="task_finish_data"></line-chart>
        </div>
      </div>
    </div>
    <div v-else>
      <md-empty-state
        md-icon="assessment"
        md-label="Выбери проект"
        md-description="Выбери проект, чтобы увидеть по нему статистику."
      ></md-empty-state>
    </div>
  </div>
</template>
<script>
import store from "../store.js";
import { VueSvgGauge } from "vue-svg-gauge";
import dashboardService from "../services/dashboard.service.js";
import Doughnut from "../components/dashboard/Doughnut";
import LineChart from "../components/dashboard/LineChart";
import Bar from "../components/dashboard/Bar";
import ProjectPicker from "../components/dashboard/project-picker";

export default {
  name: "dashboard",

  components: {
    VueSvgGauge,
    Doughnut,
    LineChart,
    Bar,
    ProjectPicker
  },

  data() {
    return {
      data: {},
      projects: [],
      selectedProject: {}
    };
  },

  async created() {
    store.commit("setPageLabel", "Статистика");
    store.commit("setMenuButtonType", "menu");
    await this.getDashboard();
  },

  computed: {
    categories_proportion_data() {
      if (!this.data.projects) return { labels: [], datasets: [] };
      return {
        labels: this.data.projects
          .filter(x => x.name == this.selectedProject.name)
          .map(x => x.categories.map(c => c.name))
          .flat(),
        datasets: [
          {
            data: this.data.projects
              .filter(x => x.name == this.selectedProject.name)
              .map(x => x.categories.map(c => c.proportion))
              .flat(),
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#81f0e5",
              "aa1155",
              "ffee88",
              "134074",
              "8da9c4",
              "fce694"
            ]
          }
        ]
      };
    },
    task_count_data() {
      if (!this.data.projects) return { labels: [], datasets: [] };
      return {
        labels: this.data.projects
          .filter(x => x.name == this.selectedProject.name)
          .map(x => x.sprints.map(s => s.name))
          .flat(),
        datasets: [
          {
            label: "Кол-во заданий в спринте",
            data: this.data.projects
              .filter(x => x.name == this.selectedProject.name)
              .map(x => x.sprints.map(s => s.taskCount))
              .flat(),
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#81f0e5",
              "aa1155",
              "ffee88",
              "134074",
              "8da9c4",
              "fce694"
            ]
          }
        ]
      };
    },
    task_finish_data() {
      if (!this.data.projects) return { labels: [], datasets: [] };
      return {
        labels: this.data.projects
          .filter(x => x.name == this.selectedProject.name)
          .map(x =>
            x.sprints.map(s =>
              s.tasks.map(t => new Date(t.date).toLocaleDateString())
            )
          )
          .flat(2),
        datasets: [
          {
            label: "Завершённые задания",
            data: this.data.projects
              .filter(x => x.name == this.selectedProject.name)
              .map(x => x.sprints.map(s => s.tasks.map(t => t.count)))
              .flat(2),
            backgroundColor: ["#e8c3b9"]
          }
        ]
      };
    }
  },

  methods: {
    async getDashboard() {
      await dashboardService.get().then(response => {
        this.data = response.data;
        this.projects = response.data.projects.map(x => {
          return {
            id: x.id,
            name: x.name,
            selected: false
          };
        });
      });
    },

    selectProject(selectedProject) {
      this.selectedProject = selectedProject;
    }
  }
};
</script>

<style lang="scss">
.chart-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-item {
  display: flex;
  width: 450px;
  margin: 50px 25px;

  .gauge {
    width: 300px;
  }

  div > div {
    width: 450px;
    height: 450px;
  }
}

@media (max-width: 320px) {
  .chart-item {
    width: 250px;

    div > div {
    width: 250px;
    height: 250px;
  }
  }
}
</style>