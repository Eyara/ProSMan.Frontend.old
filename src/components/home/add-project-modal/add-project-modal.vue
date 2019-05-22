<template>
  <div>
    <md-content v-if="model !== null" class="modal-block" @keyup.enter="create()">
      <h2 v-if="isCreating">Создание проекта</h2>
      <h2 v-else>Обновление проекта</h2>
      <md-field>
        <label>Название</label>
        <md-input v-model="model.name"></md-input>
      </md-field>
      <div class="button-block">
        <md-button class="md-primary" @click="cancel()">Отмена</md-button>
        <md-button class="md-raised md-primary" @click="create()">
          <span v-if="isCreating">Создать</span>
          <span v-else>Обновить</span>
        </md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "add-project-modal",

  data() {
    return {
      initial_model: {
        id: "00000000-0000-0000-0000-000000000000",
        name: ""
      },
      model: Object,
      isCancel: Boolean
    };
  },

  created() {
    if (this.isCreating) {
      this.model = this.initial_model;
    } else {
      this.model = this.projectModel;
    }
  },

  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set() {
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