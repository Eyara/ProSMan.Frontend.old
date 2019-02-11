<template>
  <div>
    <md-drawer class="md-right">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Favorites</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
import store from "../../../store.js";
export default {
  name: "update-task-modal",

  data: function() {
    return {
      initial_model: {
        id: "00000000-0000-0000-0000-000000000000",
        projectId: store.state.selectedProjectId,
        sprintId: store.state.selectedSprintId,
        categoryId: "",
        isFinished: 0,
        name: "",
        description: null,
        priority: "Low",
        timeEstimate: 0,
        actualTimeSpent: 0
      },
      model: Object,
      categories: [],
      selectedCategoryId: String,
    };
  },

  props: {
    showDialog: Boolean,
  },

  methods: {
    close: function() {
      this.$emit("close-dialog", this.model);
      this.model = this.initial_model;
    },
  }
};
</script>

<style scoped lang="scss">
.md-dialog {
  max-width: 800px;
}

.modal-block {
  padding: 0 20px 20px 20px;
}

.button-block {
  display: flex;
  justify-content: space-between;
}
</style>