<template>
    <div>
        <md-toolbar class="top-menu">
            <md-button
                    v-if="$store.state.menuButtonType == 'menu'"
                    class="md-icon-button"
                    @click="$store.commit('toggleLeftSideMenu')"
            >
                <md-icon class="main-color">menu</md-icon>
            </md-button>
            <md-button
                    v-else-if="$store.state.menuButtonType == 'back'"
                    class="md-icon-button"
                    @click="$router.go(-1)"
            >
                <md-icon class="main-color">arrow_back</md-icon>
            </md-button>
            <h3 class="md-title main-color">{{$store.state.pageLabel}}</h3>
        </md-toolbar>

        <md-drawer :md-active.sync="$store.state.isLeftSideMenuOpen">
            <md-list @click="$store.commit('toggleLeftSideMenu')">
                <md-list-item class="user-panel">
                    <md-icon>person</md-icon>
                    <span class="md-list-item-text">{{userFullname}}</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>view_list</md-icon>
                    <span class="md-list-item-text">
                        <router-link to="/">Проекты</router-link>
                    </span>
                </md-list-item>
                <md-list-item>
                    <md-icon>today</md-icon>
                    <span class="md-list-item-text">
                        <router-link to="/today">Задания на день</router-link>
                    </span>
                </md-list-item>
                <md-list-item>
                    <md-icon>assessment</md-icon>
                    <span class="md-list-item-text">
                        <router-link to="/dashboard">Статистика</router-link>
                    </span>
                </md-list-item>
            </md-list>

            <div class="exit-panel" @click="logout()">
                <md-icon>exit_to_app</md-icon>
                <span class="md-list-item-text">Выход</span>
            </div>
        </md-drawer>

        <md-drawer
                class="md-right drawer-sidenav"
                v-bind:class="{ 'hide-right': !$store.state.isRightSideMenuOpen }"
                :md-active.sync="$store.state.isRightSideMenuOpen"
                v-touch:swipe.right="hideRightSideNav"
        >
            <add-task-modal
                    v-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.Task"
                    v-bind:taskModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-task-modal>
            <add-non-sprint-task-modal
                    v-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.NonSprintTask"
                    v-bind:taskModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-non-sprint-task-modal>
            <add-backlog-task-modal
                    v-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.BacklogTask"
                    v-bind:taskModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-backlog-task-modal>
            <add-category-modal
                    v-else-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.Category"
                    v-bind:categoryModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-category-modal>
            <add-sprint-modal
                    v-else-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.Sprint"
                    v-bind:sprintModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-sprint-modal>
            <add-project-modal
                    v-else-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.Project"
                    v-bind:projectModel="$store.state.updatingItem"
                    v-bind:isCreating="$store.state.isCreating"
                    v-on:close-dialog="closeSideNav"
            ></add-project-modal>
            <move-to-sprint-modal
                    v-if="$store.state.isRightSideMenuOpen && $store.state.updatingType === updatingType.MoveToSprint"
                    v-bind:taskModel="$store.state.updatingItem"
                    v-on:close-dialog="closeSideNav"
            ></move-to-sprint-modal>
        </md-drawer>
    </div>
</template>

<script lang="ts">
import store from "../store";
import router from "../router";

import backlogTaskService from "../services/backlogTask.service";
import nonSprintTaskService from "../services/nonSprintTask.service";
import projectService from "../services/project.service";
import sprintService from "../services/sprint.service";
import taskService from "../services/task.service";
import categoryService from "../services/category.service";

import { UpdatingTypeEnum } from "@/models/enums/updating-type.enum";

import AddTaskModal from "./tasks/add-task-modal/add-task-modal.vue";
import AddBacklogTaskModal from "./sprints/add-backlog-task-modal/add-backlog-task-modal.vue";
import AddNonSprintTaskModal from "./sprints/add-non-sprint-task-modal/add-non-sprint-task-modal.vue";
import AddCategoryModal from "./tasks/add-category-modal/add-category-modal.vue";
import AddSprintModal from "./sprints/add-sprint-modal/add-sprint-modal.vue";
import AddProjectModal from "./home/add-project-modal/add-project-modal.vue";
import MoveToSprintModal from "./sprints/move-to-sprint-modal/move-to-sprint-modal.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Layout",
  components: {
    AddTaskModal,
    AddNonSprintTaskModal,
    AddCategoryModal,
    AddSprintModal,
    AddProjectModal,
    AddBacklogTaskModal,
    MoveToSprintModal
  }
})
export default class extends Vue {
  async created() {
    await this.selectProject();
  }

  get updatingType() {
    return UpdatingTypeEnum;
  }

  get userFullname() {
    return localStorage.fullname;
  }

  async closeSideNav(model, isCancel) {
    store.commit("toggleRightSideMenu");

    if (isCancel) return;

    switch (+store.state.updatingType) {
      case UpdatingTypeEnum.Task:
        store.state.isCreating
          ? await this.createTask(model)
          : await this.updateTask(model);
        break;
      case UpdatingTypeEnum.Category:
        store.state.isCreating
          ? await this.createCategory(model)
          : await this.updateCategory(model);
        break;
      case UpdatingTypeEnum.Sprint:
        store.state.isCreating
          ? await this.createSprint(model)
          : await this.updateSprint(model);
        break;
      case UpdatingTypeEnum.Project:
        store.state.isCreating
          ? await this.createProject(model)
          : await this.editProject(model);
        break;
      case UpdatingTypeEnum.NonSprintTask:
        store.state.isCreating
          ? await this.createNonSprintTask(model)
          : await this.updateNonSprintTask(model);
        break;
      case UpdatingTypeEnum.BacklogTask:
        store.state.isCreating
          ? await this.createBacklogTask(model)
          : await this.updateBacklogTask(model);
        break;
      case UpdatingTypeEnum.MoveToSprint:
        await this.moveToSprint(model);
        break;
    }
    store.commit("setHasBeenUpdated", true);
  }

  hideRightSideNav() {
    store.commit("hideRightSideMenu");
  }

  async createTask(model) {
    return await taskService.createTask(model);
  }

  async updateTask(model) {
    return await taskService.updateTask(model);
  }

  async createCategory(model) {
    return await categoryService.createCategory(model);
  }

  // eslint-disable-next-line
  async updateCategory(model) {
    // not implented
    // await axios.put("http://localhost:54973/api/Category", model);
  }

  async createSprint(model) {
    return await sprintService.createSprint(model);
  }

  async updateSprint(model) {
    return await sprintService.updateSprint(model);
  }

  async createProject(model) {
    return await projectService.createProject(model);
  }

  async editProject(model) {
    return await projectService.editProject(model);
  }

  async selectProject() {
    await projectService
      .getById(this.$route.query.projectId.toString())
      .then(project => store.commit("selectProject", project.data.data[0]));
    await this.selectSprint();
  }

  async selectSprint() {
    return await sprintService
      .getById(this.$route.query.sprintId)
      .then(sprint => {
        store.commit("selectSprint", sprint.data.data[0]);
      });
  }

  async createNonSprintTask(model) {
    return await nonSprintTaskService.create(model);
  }

  async updateNonSprintTask(model) {
    return await nonSprintTaskService.update(model);
  }

  async createBacklogTask(model) {
    return await backlogTaskService.create(model);
  }

  async updateBacklogTask(model) {
    return await backlogTaskService.update(model);
  }

  async moveToSprint(model) {
    return await backlogTaskService.moveToSprint(model);
  }

  logout() {
    localStorage.clear();
    store.commit("setAuthenticated", false);
    router.push({ path: "/login" });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3a9ad9 !important;
  z-index: 6;
}

.main-color {
  color: white !important;
}

.md-drawer {
  width: 275px;
  z-index: 8;
  position: fixed;
}

.drawer-sidenav {
  width: 50%;
}

.hide-right {
  width: 0 !important;
}

.md-list-item {
  border-bottom: 1px rgba($color: #000000, $alpha: 0.15) solid;
  padding: 5px 0px;

  span {
    font-weight: 600;
  }
}

.user-panel {
  padding: 10px 0px;
  margin-bottom: 10px;
}

.exit-panel {
  min-height: 48px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;

  .md-icon {
    margin-right: 32px;
  }

  .md-list-item-text {
    font-weight: 600;
    cursor: pointer;
  }
}

@media (max-width: 600px) {
  .drawer-sidenav {
    width: 100%;
    max-width: 100% !important;
  }
}
</style>
