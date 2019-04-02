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
      <div class="action-block" @click="emitCreateCategory()">
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
  color: #3a9ad9 !important;
  background-color: #e9e0d6 !important;
}

@media (min-width: 600px) {
  .category-chip:hover {
    color: white !important;
    background-color: #3a9ad9 !important;
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
  name: "category-picker",

  props: {
    categories: Array
  },

  methods: {
    toggleCategory(category) {
      category.selected = !category.selected;
      this.emitSelectCategories();
    },

    emitCreateCategory() {
      this.$emit("create-category");
    },

    emitSelectCategories() {
      let selectedCategories = this.categories.filter(x => x.selected);
      this.$emit("select-categories", selectedCategories);
    }
  }
};
</script>