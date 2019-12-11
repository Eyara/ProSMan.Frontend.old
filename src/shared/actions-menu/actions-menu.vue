<template>
    <div id="actions-menu" class="actions-menu">
        <md-button @click="toggleTodayTaskEmit()">
            <div class="actions-menu__button">
                <md-icon>star</md-icon>
                <span>На сегодня</span>
            </div>
        </md-button>
        <md-button @click="deleteTaskEmit()">
            <div class="actions-menu__button">
                <md-icon>delete</md-icon>
                <span>Удалить</span>
            </div>
        </md-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "actions-menu",
  beforeDestroy() {
    window.removeEventListener("click", this.clickListen);
  }
})
export default class extends Vue {
  @Prop() id: string;

  private clickListen() {
    this.$emit("close");
  }

  created() {
    window.addEventListener("click", this.clickListen);
  }

  toggleTodayTaskEmit() {
    this.$emit("toggle-today", this.id);
  }

  deleteTaskEmit() {
    this.$emit("delete", this.id);
  }
}
</script>

<style lang="scss">
@import "actions-menu.scss";
</style>
