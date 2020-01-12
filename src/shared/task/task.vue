import {TaskTypeEnum} from "@/models/enums/task-type.enum";
import {TaskTypeEnum} from "@/models/enums/task-type.enum";
<template>
    <div>
        <div class="task"
             v-bind:class="{ 'task-finished': task.isFinished,
                'task-with-padding': isBacklog}">
            <div v-if="!isBacklog">
                <div @click="toggleFinishTaskEmit(task.id)" class="btn-circle"></div>
            </div>
            <div class="task-item task-non-select"
                 v-touch:touchhold="showActions"
                 @contextmenu.prevent="showActions"
                 @click="editTaskEmit(task)">
                <span class="task-name">{{task.name}}</span>
                <div class="task-info" v-if="!isBacklog">
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
        </div>
        <actions-menu
                v-if="isActions"
                v-bind:id="task.id"
                v-bind:is-moveable="isBacklog"
                v-bind:is-today-available="!(isBacklog || isNonSprintTask)"
                v-bind:is-deletable="!isTodayTask"
                v-on:close="closeActions"
                v-on:toggle-today="toggleTodayTaskEmit"
                v-on:move-to-sprint="moveToSprintEmit"
                v-on:delete="deleteTaskEmit"
        ></actions-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITaskModel } from "@/models/task.model";
import moment from "moment";
import ActionsMenu from "@/shared/actions-menu/actions-menu.vue";
import { TaskTypeEnum } from "@/models/enums/task-type.enum";

@Component({
  name: "task",
  components: {
    ActionsMenu
  }
})
export default class extends Vue {
  @Prop() task;
  @Prop() taskType: TaskTypeEnum;

  isActions: boolean = false;

  get isBacklog() {
    return this.taskType == TaskTypeEnum.Backlog;
  }

  get isNonSprintTask() {
    return this.taskType == TaskTypeEnum.NonSprint;
  }

  get isTodayTask() {
    return this.taskType == TaskTypeEnum.Today;
  }

  showActions() {
    this.isActions = true;
  }

  closeActions() {
    this.isActions = false;
  }

  toggleFinishTaskEmit(id: string) {
    this.$emit("toggle-finish", id);
  }

  moveToSprintEmit(id: string) {
    this.$emit("move-to-sprint", id);
  }

  editTaskEmit(task: ITaskModel) {
    this.$emit("edit", task);
  }

  toggleTodayTaskEmit(id: string) {
    this.$emit("toggle-today", id);
  }

  deleteTaskEmit(id: string) {
    this.$emit("delete", id);
  }

  todayTaskDate(date) {
    return moment(date).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD");
  }
}
</script>
<style lang="scss" scoped>
@import "./task.scss";
</style>
