<template>
  <div>
    <div>
      <md-dialog :md-active.sync="show">
        <md-dialog-title v-if="isCreating">Создание задачи</md-dialog-title>
        <md-dialog-title v-else>Обновление задачи</md-dialog-title>
        <md-content v-if="model !== null" class="modal-block">
          <md-field>
            <label>Название</label>
            <md-input v-model="model.name"></md-input>
          </md-field>
          <md-field>
            <label>Описание</label>
            <md-textarea v-model="model.description" md-autogrow></md-textarea>
          </md-field>
          <md-field>
            <label>Приоритет</label>
            <md-select v-model="model.priority">
              <md-option value="Low">Низкий</md-option>
              <md-option value="Medium">Средний</md-option>
              <md-option value="High">Высокий</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Категория</label>
            <md-select v-model="selectedCategoryId">
              <md-option v-for="category in categories" v-bind:key="category.id"
                v-bind:value="category.id">{{category.name}}</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Предполагаемое время</label>
            <md-input v-model="model.timeEstimate"></md-input>
          </md-field>
          <div class="button-block">
            <md-button class="md-primary" @click="cancel()">Отмена</md-button>
            <md-button class="md-raised md-primary" @click="create()">Создать</md-button>
          </div>
        </md-content>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../../store.js";
export default {
  name: "add-update-task-modal",

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

  created: function() {
    if (!this.isCreating) {
      console.log('updated');
      this.model = this.taskModel;
    }
    else {
      console.log('created');
      this.model = this.initial_model;
    }

    console.log(this.model);
    this.getCategories();
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
    taskModel: Object
  },

  methods: {
    close: function() {
      this.$emit("close-dialog", this.model);
      this.model = this.initial_model;
    },
    cancel: function() {
      this.model = null;
      this.close();
    },
    create: function() {
      this.model.categoryId = this.selectedCategoryId;
      this.close();
    },

    getCategories: function () {
      axios
        .get(
          "http://localhost:54973/api/Category/GetByProjectId?id=" +
            store.state.selectedProjectId
        )
        .then(response => {
          this.categories = response.data.data;
        });
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