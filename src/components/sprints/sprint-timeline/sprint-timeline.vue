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
                <div class="timeline__content" @click="tasksOpen(sprint.id)">
                  <p>{{sprint.name}}</p>
                </div>
                <div class="timeline__actions">
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
    year: function (date) {
      return moment(date).format('YYYY');
    },
    month: function(date) {
      return moment(date).format('MMM');
    },
    day: function(date) {
      return moment(date).format('D');
    }
  },

  methods: {
    tasksOpen(id) {
      this.$emit("tasks-open", id);
    },

    emitEditSprint(sprint) {
      this.$emit("edit-sprint", sprint);
    },

    emitDeleteSprint(id) {
      this.$emit("delete-sprint", id);
    }
  }
};
</script>
