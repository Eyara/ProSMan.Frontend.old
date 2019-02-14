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
      >{{category.name}}
      </md-chip>
      <div class="action-block">
        <md-icon class="btn-action">add</md-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-picker {
  display: flex;
}
.category-chip {
  user-select: none;
  color: #3a9ad9;
  background-color: #e9e0d6;
}

.category-chip:hover {
  color: white !important;
  background-color: #3a9ad9 !important;
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
      this.emitSelectCategories();
    },

    selectAll() {
      this.categories.forEach(x => (x.selected = true));
      this.emitSelectCategories();
    },

    emitSelectCategories() {
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

          this.selectAll();
        });
    }
  }
};
</script>