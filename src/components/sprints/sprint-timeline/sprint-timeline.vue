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
              <div class="timeline__post" @click="tasksOpen(sprint.id)">
                <div class="timeline__content">
                  <p>{{sprint.name}}</p>
                </div>
                <div class="timeline__actions">
                    <md-icon>create</md-icon>
                    <md-icon>delete</md-icon>
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
// eslint-disable-next-line 
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
    tasksOpen: function(id) {
      this.$emit("tasks-open", id);
    }
  }
};
</script>
