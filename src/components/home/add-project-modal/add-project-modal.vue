<template>
  <div>
    <md-content v-if="model !== null" class="modal-block">
      <h2 v-if="isCreating">Создание проекта</h2>
      <h2 v-else>Обновление проекта</h2>
      <md-field>
        <label>Название</label>
        <md-input v-model="model.name"></md-input>
      </md-field>
      <div class="button-block">
        <md-button class="md-primary" @click="cancel()">Отмена</md-button>
        <md-button class="md-raised md-primary" @click="create()">Создать</md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "add-project-modal",

  data: function() {
    return {
      initial_model: {
        id: "00000000-0000-0000-0000-000000000000",
        name: "",
      },
      model: Object,
      isCancel: Boolean,
    };
  },

  created: function() {
    if (this.isCreating) {
      this.model = this.initial_model;
    }
    else {
      this.model = this.projectModel;
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
    projectModel: Object
  },

  methods: {
    close: function() {
      this.$emit("close-dialog", this.model, this.isCancel);
      this.model = this.initial_model;
    },
    cancel: function() {
      this.isCancel = true;
      this.model = null;
      this.close();
    },
    create: function() {
      this.isCancel = false;
      this.close();
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