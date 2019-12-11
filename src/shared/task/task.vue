<template>
    <div>
        <div class="task"
             v-bind:class="{ 'task-finished': task.isFinished}">
            <div>
                <div @click="toggleFinishTaskEmit(task.id)" class="btn-circle"></div>
            </div>
            <div class="task-item task-non-select"
                 v-touch:longtap="showActions"
                 @click="editTaskEmit(task)">
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
        </div>
        <actions-menu
                v-if="isActions"
                v-bind:id="task.id"
                v-on:close="closeActions"
                v-on:delete="deleteTaskEmit"
                v-on:toggle-today="toggleTodayTaskEmit"
        ></actions-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITaskModel } from "@/models/task.model";
import moment from "moment";
import ActionsMenu from "@/shared/actions-menu/actions-menu.vue";

@Component({
  name: "task",
  components: {
    ActionsMenu
  }
})
export default class extends Vue {
  @Prop() task;

  isActions: boolean = false;

  showActions() {
    this.isActions = true;
  }

  closeActions() {
    this.isActions = false;
  }

  toggleFinishTaskEmit(id: string) {
    this.$emit("toggle-finish", id);
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
