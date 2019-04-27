<template>
  <div class="page">
    <div class="page__demo">
      <div class="main-container page__container">
        <div class="timeline">
          <div class="timeline__group" v-for="sprint in sprints" v-bind:key="sprint.id">
            <span class="timeline__year">{{sprint.fromDate | year}}</span>
            <div class="timeline__box">
              <div class="timeline__date">
                <span class="timeline__day">{{sprint.fromDate | day}}</span>
                <span class="timeline__month">{{ sprint.fromDate | month}}</span>
              </div>
              <div class="timeline__post">
                <div class="timeline__content" @click="tasksOpen(sprint)">
                  <p>{{sprint.name}}</p>
                </div>
                <div class="timeline__actions">
                  <div @click="emitFinishSprint(sprint.id)">
                    <md-icon>done</md-icon>
                  </div>
                  <div @click="emitEditSprint(sprint)">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./sprint-timeline.scss";
</style>

<script>
import moment from 'moment'
export default {
  name: "sprint-timeline",

  data: () => ({}),

  props: {
    sprints: Array,
  },

  filters: {
    year(date) {
      return moment(date).local().format('YYYY');
    },
    month(date) {
      return moment(date).local().format('MMM');
    },
    day(date) {
      return moment(date).local().format('D');
    }
  },

  methods: {
    tasksOpen(sprint) {
      this.$emit("tasks-open", sprint);
    },

    emitEditSprint(sprint) {
      this.$emit("edit-sprint", sprint);
    },

    emitDeleteSprint(id) {
      this.$emit("delete-sprint", id);
    },

    emitFinishSprint(id) {
      this.$emit("finish-sprint", id);
    }
  }
};
</script>
