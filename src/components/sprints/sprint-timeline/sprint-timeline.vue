<template>
    <div>
        <div v-for="sprint in sprints" v-bind:key="sprint.id">
            <div class="timeline__box">
                <div class="timeline__date">
                    <span class="timeline__day">{{sprint.fromDate | day}}</span>
                    <span class="timeline__month">{{ sprint.fromDate | month}}</span>
                </div>
                <div class="timeline__post" v-bind:class="{ timeline__post__finished: sprint.isFinished}">
                    <div
                            class="timeline__content"
                            v-bind:class="{ timeline__content__finished: sprint.isFinished}"
                            @click="tasksOpen(sprint)"
                    >
                        <p>{{sprint.name}}</p>
                    </div>
                    <div class="timeline__actions">
                        <div>
                            <div @click="emitFinishSprint(sprint.id)">
                                <md-icon>done</md-icon>
                            </div>
                        </div>
                        <div class="non-del-actions">
                            <div v-if="!sprint.isFinished" @click="emitEditSprint(sprint)">
                                <md-icon>create</md-icon>
                            </div>
                            <div @click="emitDeleteSprint(sprint.id)">
                                <md-icon>delete</md-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "./sprint-timeline.scss";
</style>

<script lang="ts">
import moment from "moment";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "sprint-timeline",
  filters: {
    year(date) {
      return moment(date)
        .local()
        .format("YYYY");
    },
    month(date) {
      return moment(date)
        .local()
        .format("MMM");
    },
    day(date) {
      return moment(date)
        .local()
        .format("D");
    }
  }
})
export default class extends Vue {
  @Prop() sprints;

  tasksOpen(sprint) {
    this.$emit("tasks-open", sprint);
  }

  emitEditSprint(sprint) {
    this.$emit("edit-sprint", sprint);
  }

  emitDeleteSprint(id) {
    this.$emit("delete-sprint", id);
  }

  emitFinishSprint(id) {
    this.$emit("finish-sprint", id);
  }
}
</script>
