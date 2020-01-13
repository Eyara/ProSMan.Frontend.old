<template>
    <div>
        <md-content v-if="model !== null" class="modal-block" @keyup.enter="create()">
            <label class="main-label">
                <span v-if="isCreating">Создание</span>
                <span v-else>Обновление</span>
                задачи
            </label>
            <md-field>
                <label>Название</label>
                <md-input v-model="model.name"></md-input>
            </md-field>
            <md-field>
                <label>Описание</label>
                <md-textarea v-model="model.description" md-autogrow></md-textarea>
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
  name: "add-backlog-task-modal"
})
export default class extends Vue {
  @Prop() isCreating: Boolean;
  @Prop() showDialog: Boolean;
  @Prop() taskModel: ITaskModel;

  initial_model = {
    id: "00000000-0000-0000-0000-000000000000",
    projectId: store.state.selectedProject.id,
    name: "",
    description: null
  };
  model = {};
  isCancel: Boolean;

  created() {
    this.model = this.isCreating ? this.initial_model : this.taskModel;
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
