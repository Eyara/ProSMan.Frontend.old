<template>
  <div>
    <div class="category-picker">
      <md-chip
        v-for="category in categories"
        :key="category.id"
        @click="toggleCategory(category)"
        class="category-chip"
        v-bind:class="{ 'category-chip-selected': category.selected }"
        md-clickable
      >{{category.name}}</md-chip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-picker {
  display: flex;
}
.category-chip {
  user-select: none;
  color: #448aff;
  background-color: rgb(224, 224, 224);
}

.category-chip:hover {
  color: white !important;
  background-color: #448aff !important;
}

.category-chip-selected {
  color: white !important;
  background-color: #448aff !important;
}
</style>

<script>
/* eslint-disable */
import axios from "axios";
import store from "../../../store.js";

export default {
  name: "category-picker",
  data: () => ({
    categories: []
  }),

  created: function() {
    this.getCategories();
  },

  methods: {
    toggleCategory(category) {
      category.selected = !category.selected;

      let selectedCategories = this.categories.filter(x => x.selected);
      this.$emit("select-categories", selectedCategories);
    },

    getCategories() {
      axios
        .get(
          "http://localhost:54973/api/Category/GetByProjectId?id=" +
            store.state.selectedProjectId
        )
        .then(response => {
          this.categories = response.data.data.map(x => {
            return {
              id: x.id,
              name: x.name,
              selected: false
            };
          });
        });
    }
  }
};
</script>