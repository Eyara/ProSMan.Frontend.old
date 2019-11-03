<template>
    <div>
        <md-content v-if="model !== null" class="modal-block" @keyup.enter="create()">
            <h2 v-if="isCreating">Создание задачи</h2>
            <h2 v-else>Обновление задачи</h2>
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
                    <span v-if="isCreating">Создать</span>
                    <span v-else>Обновить</span>
                </md-button>
            </div>
        </md-content>
    </div>
</template>

<script lang="ts">
import store from "../../../store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITaskModel } from "@/models/task.model";

@Component({
  name: "add-non-sprint-task-modal"
})
export default class extends Vue {
  @Prop() isCreating: Boolean;
  @Prop() showDialog: Boolean;
  // TODO add task interface
  @Prop() taskModel: ITaskModel;

  initial_model = {
    id: "00000000-0000-0000-0000-000000000000",
    projectId: store.state.selectedProject.id,
    isFinished: 0,
    name: "",
    description: null,
    priority: "Low",
    timeEstimate: 0
  };
  model = {};
  isCancel: Boolean;

  created() {
    if (this.isCreating) {
      this.model = this.isCreating ? this.initial_model : this.taskModel;
    }
  }

  get show() {
    return this.showDialog;
  }

  set show(value) {
    this.close();
  }

  close() {
    this.$emit("close-dialog", this.model, this.isCancel);
    this.model = this.initial_model;
  }

  cancel() {
    this.isCancel = true;
    this.model = null;
    this.close();
  }

  create() {
    this.isCancel = false;
    this.close();
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
