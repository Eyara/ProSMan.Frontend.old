<template>
  <div>
    <project-picker
      v-bind:projects="projects"
      v-on:select="selectProject"
    ></project-picker>
    <div
      v-if="projects && selectedProject && selectedProject.name"
      class="dashboard-wrapper"
    >
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="600px"
        class="bg-primary text-white shadow-1 rounded-borders dashboard-carousel"
      >
        <q-carousel-slide name="first" class="column no-wrap flex-center">
          <div class="general-info">
            <div class="main-info">
              <div class="main-info-card info-card">
                <span>
                  Кол-во спринтов:
                  <span class="highlight-info">
                    {{ selectedProject.overview.totalSprints }}</span
                  >
                </span>
              </div>
            </div>
            <div class="side-info">
              <div class="side-info-card info-card">
                <span>
                  В среднем часов в спринте:
                  <span class="highlight-info">
                    {{ selectedProject.overview.averageHoursInSprint }}</span
                  >
                </span>
              </div>
            </div>
          </div>
          <div class="general-info general-info-end">
            <div>
              <div class="main-info main-info-with-margin">
                <div class="main-info-card info-card">
                  <span>
                    Кол-во задач в бэклоге:
                    <span class="highlight-info">
                      {{ selectedProject.overview.totalBacklogTasks }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="main-info">
                <div class="main-info-card info-card">
                  <span>
                    Кол-во задач без спринта:
                    <span class="highlight-info">
                      {{ selectedProject.overview.totalNonSprintTasks }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="side-info">
              <div class="side-info-card info-card">
                <span>
                  В среднем задач в спринте:
                  <span class="highlight-info">
                    {{ selectedProject.overview.averageTasksInSprint }}</span
                  >
                </span>
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            <doughnut :chart-data="categories_proportion_data"></doughnut>
          </div>
        </q-carousel-slide>
        <!--        Will be added in the future-->
        <!--        <q-carousel-slide name="third" class="column no-wrap flex-center">-->
        <!--          <q-icon name="style" size="56px" />-->
        <!--          <div class="q-mt-md text-center">-->
        <!--          </div>-->
        <!--        </q-carousel-slide>-->
      </q-carousel>
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
import store from "../store";
import dashboardService from "../services/dashboard.service";
import Doughnut from "../components/dashboard/doughnut";
import LineChart from "../components/dashboard/line-chart";
import Bar from "../components/dashboard/bar";
import ProjectPicker from "../components/dashboard/project-picker";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "dashboard",

  components: {
    Doughnut,
    LineChart,
    Bar,
    ProjectPicker
  }
})
export default class extends Vue {
  data = {};
  projects = [];
  selectedProject = null;
  slide = "first";

  async created() {
    store.commit("setPageLabel", "Статистика");
    store.commit("setMenuButtonType", "menu");
    await this.getDashboard();
  }

  get categories_proportion_data() {
    if (!this.data.projects) return { labels: [], datasets: [] };
    return {
      labels: this.data.projects
        .filter(x => x.name === this.selectedProject.name)
        .map(x => x.categories.map(c => c.name))
        .flat(),
      datasets: [
        {
          data: this.data.projects
            .filter(x => x.name === this.selectedProject.name)
            .map(x => x.categories.map(c => c.proportion))
            .flat(),
          backgroundColor: ["#8e5ea2", "#e8c3b9", "#fff", "#c45850"]
        }
      ]
    };
  }

  async getDashboard() {
    await dashboardService.get().then(response => {
      this.data = response.data;
      this.projects = response.data.projects.map(x => {
        return {
          name: x.name,
          selected: false,
          overview: x.overview
        };
      });
    });
  }

  selectProject(selectedProject) {
    this.selectedProject = selectedProject;
  }
}
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

.dashboard-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dashboard-carousel {
  width: 65%;
}

.general-info {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.general-info-end {
  align-items: flex-end;
}

.main-info-with-margin {
  margin-bottom: 50px;
}

.main-info-card {
  width: 250px;
  height: 100px;
}

.side-info-card {
  width: 150px;
  height: 150px;
}

.info-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #185e8c;
}

.highlight-info {
  font-size: 18px;
  color: #d9d71a;
}

@media (max-width: 850px) {
  .dashboard-carousel {
    width: 100%;
  }

  .main-info-card,
  .side-info-card {
    width: 150px;
    height: 125px;
  }
}
</style>
