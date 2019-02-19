<template>
  <div>
    <md-content v-if="model !== null" class="modal-block">
      <h2 v-if="isCreating">Создание спринта</h2>
      <h2 v-else>Обновление спринта</h2>
      <md-field>
        <label>Название</label>
        <md-input v-model="model.name"></md-input>
      </md-field>
      <md-datepicker v-model="model.fromDate">
        <label>Дата начала спринта</label>
      </md-datepicker>
      <md-datepicker v-model="model.toDate">
        <label>Дата окончания спринта</label>
      </md-datepicker>
      <div class="button-block">
        <md-button class="md-primary" @click="cancel()">Отмена</md-button>
        <md-button class="md-raised md-primary" @click="create()">Создать</md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
import store from "../../../store.js";

export default {
  name: "add-sprint-modal",

  data: function() {
    return {
      initial_model: {
        id: "00000000-0000-0000-0000-000000000000",
        projectId: store.state.selectedProjectId,
        name: "",
        fromDate: new Date(),
        toDate: new Date(),
        isFinished: false
      },
      model: Object | String,
      isCancel: Boolean
    };
  },

  mounted: function() {
    if (this.isCreating) {
      this.model = this.initial_model;
    } else {
      this.model = this.sprintModel;
    }
  },

  computed: {
    show: {
      get: function() {
        return this.showDialog;
      },
      set: function() {
        this.close();
        return false;
      }
    }
  },

  props: {
    isCreating: Boolean,
    showDialog: Boolean,
    sprintModel: Object
  },

  methods: {
    close() {
      this.$emit("close-dialog", this.model, this.isCancel);
      this.model = this.initial_model;
    },

    cancel() {
      this.isCancel = true;
      this.model = null;
      this.close();
    },
    
    create() {
      this.isCancel = false;
      this.close();
    }
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