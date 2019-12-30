<template>
    <div>
        <md-content v-if="model !== null" class="modal-block" @keyup.enter="create()">
            <h2>Перенос задачи в спринт</h2>
            <md-field>
                <label>Описание</label>
                <md-textarea v-model="model.description" md-autogrow></md-textarea>
            </md-field>
            <md-field>
                <label>Категории</label>
                <md-select v-model="selectedCategoryId">
                    <md-option v-for="category in categories" :key="category.id" :value="category.id">
                        {{category.name}}
                    </md-option>
                </md-select>
            </md-field>
            <md-field>
                <label>Приоритет</label>
                <md-select v-model="model.priority">
                    <md-option value="1">Низкий</md-option>
                    <md-option value="2">Средний</md-option>
                    <md-option value="3">Высокий</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label>Предполагаемое время</label>
                <md-input v-model="model.timeEstimate"></md-input>
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

<script lang="ts">
import store from "../../../store";
import sprintService from "../../../services/sprint.service";
import categoryService from "../../../services/category.service";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ITaskModel } from "@/models/task.model";

@Component({
  name: "move-to-sprint-modal"
})
export default class extends Vue {
  @Prop() showDialog: Boolean;
  @Prop() taskModel: ITaskModel;

  selectedSprintId: string = null;
  selectedCategoryId: string = null;
  sprints = [];
  categories = [];
  model = {
    id: "00000000-0000-0000-0000-000000000000",
    categoryId: "00000000-0000-0000-0000-000000000000",
    description: "",
    priority: 0,
    timeEstimate: 0
  };
  isCancel: Boolean;

  created() {
    this.model.id = this.taskModel.id.toString();
    this.getUnfinishedSprints();
    this.getCategories();
  }

  get show() {
    return this.showDialog;
  }

  set show(value) {
    this.close();
  }

  close() {
    this.$emit("close-dialog", this.model, this.isCancel);
  }

  cancel() {
    this.isCancel = true;
    this.model = null;
    this.close();
  }

  create() {
    this.model.categoryId = this.selectedCategoryId;
    this.isCancel = false;
    this.close();
  }

  getUnfinishedSprints() {
    sprintService
      .getUnfinished(store.state.selectedProject.id)
      .then(response => {
        this.sprints = response.data.data;
      });
  }

  getCategories() {
    categoryService
      .getByProjectId(store.state.selectedProject.id)
      .then(response => {
        this.categories = response.data.data;
      });
  }
}
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
