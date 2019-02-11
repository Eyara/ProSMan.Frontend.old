<template>
  <div>
    <md-toolbar class="top-menu">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon class="main-color">menu</md-icon>
      </md-button>
      <h3 class="md-title main-color">{{$store.state.pageLabel}}</h3>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">ProSMan</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">
            <router-link to="/">Projects</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer class="md-right" :md-active.sync="$store.state.rightSideMenuOpen">
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
import store from "../store.js";

export default {
  name: "Layout",
  data: () => ({
    showNavigation: false
  }),
  created: function() {
    store.commit("selectProjectId", this.$route.query.projectId);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3a9ad9 !important;
}

.main-color {
  color: white !important;
}

.md-drawer {
  width: 275px;
}
</style>
