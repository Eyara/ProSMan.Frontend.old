<template>
  <div>
    <div class="category-picker">
      <md-chip
        v-for="project in items"
        :key="project.id"
        @click="toggle(project)"
        class="category-chip"
        v-bind:class="{ 'category-chip-selected': project.selected }"
        md-clickable
      >{{project.name}}</md-chip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-picker {
  display: flex;
  flex-wrap: wrap;
}

.category-chip {
  user-select: none;
  color: #3a9ad9 !important;
  background-color: #e9e0d6 !important;
}

@media (min-width: 600px) {
  .category-chip:hover {
    color: white !important;
    background-color: #3a9ad9 !important;
  }
}

@media (max-width: 320px) {
  .category-picker .md-chip {
    font-size: 12px;
  }

  .category-chip {
    margin: 5px;
  }
}

.category-chip-selected {
  color: white !important;
  background-color: #3a9ad9 !important;
}

.action-block {
  margin-left: 8px;
}

.btn-action {
  color: #3a9ad9 !important;
  background-color: transparent;
  border: 2px solid #3a9ad9;
  border-radius: 50%;
  font-size: 20px !important;
  height: 32px !important;
  width: 32px !important;
  transition: 0.4s;
}

.btn-action:hover {
  color: #fafafa !important;
  background-color: #3a9ad9 !important;
}
</style>

<script>
export default {
  name: "project-picker",

  // data() {
  //   return {
  //     items: this.projects
  //   };
  // },

  computed: {
    items: {
      get() { return this.projects },
      set() { return this.projects }
    }
  },

  props: {
    projects: Array
  },

  methods: {
    toggle(project) {
      this.items = this.items.map(x => {
        x.selected = false;
        return x;
      });
      project.selected = !project.selected;
      this.emitSelect();
    },

    emitSelect() {
      let selectedProjects = this.items.filter(x => x.selected)[0];
      this.$emit("select", selectedProjects);
    }
  }
};
</script>