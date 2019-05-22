<template>
  <div>
    <md-content v-if="model !== null" class="modal-block" @keyup.enter="create()">
      <h2>Перенос задачи в спринт</h2>
      <md-field>
        <label>Спринт</label>
        <md-select v-model="selectedSprintId">
          <md-option  v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">
            {{sprint.name}}
          </md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Категории</label>
        <md-select v-model="selectedCategoryId">
          <md-option  v-for="category in categories" :key="category.id" :value="category.id">
            {{category.name}}
          </md-option>
        </md-select>
      </md-field>
      <div class="button-block">
        <md-button class="md-primary" @click="cancel()">Отмена</md-button>
        <md-button class="md-raised md-primary" @click="create()">
          <span>Переместить</span>
        </md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
import store from "../../../store.js";
import sprintService from "../../../services/sprint.service.js"
import categoryService from "../../../services/category.service.js"
export default {
  name: "move-to-sprint-modal",

  data() {
    return {
      selectedSprintId: String,
      selectedCategoryId: String,
      sprints: [],
      categories: [],
      model: {
        id: "00000000-0000-0000-0000-000000000000",
        sprintId: "00000000-0000-0000-0000-000000000000",
        categoryId: "00000000-0000-0000-0000-000000000000",
      },
      isCancel: Boolean
    };
  },

  created() {
    this.model.id = this.taskModel.id;
    this.getUnfinishedSprints();
    this.getCategories();
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
    showDialog: Boolean,
    taskModel: Object
  },

  methods: {
    close() {
      this.$emit("close-dialog", this.model, this.isCancel);
    },
    cancel() {
      this.isCancel = true;
      this.model = null;
      this.close();
    },
    create() {
      this.model.sprintId = this.selectedSprintId;
      this.model.categoryId = this.selectedCategoryId;
      this.isCancel = false;
      this.close();
    },
    getUnfinishedSprints() {
      sprintService.getUnfinished(store.state.selectedProject.id).then(response => {
        this.sprints = response.data.data;
      });
    },
    getCategories() {
        categoryService.getByProjectId(store.state.selectedProject.id).then(response => {
        this.categories = response.data.data;
      });
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