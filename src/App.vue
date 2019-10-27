<template>
    <div id="app">
        <link
                rel="stylesheet"
                href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
        >
        <div v-if="$store.state.isAuthenticated" id="nav">
            <Layout/>
        </div>

        <loading :active.sync="$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="true"></loading>

        <md-content class="content" v-touch:swipe.right="openSideNav">
            <router-view/>
        </md-content>
    </div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: #3a9ad9,
    icon-on-background: #3a9ad9,
    text-primary-on-primary: white,
    text-primary-on-background: #484848,
    secondary-color: #fafafa,
    disabled-on-background: rgba(0, 0, 0, 0.26),
    accent-on-background: rgba(0, 0, 0, 0.12),
    background: transparent,
    background-on-background: transparent,
    theme: light
  )
);

@import "~vue-material/dist/theme/all";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  a {
    text-decoration: none;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #3a9ad9;
      cursor: pointer;
    }
  }
}

.content {
  padding: 25px;
  background-color: transparent !important;
  text-align: center;
}

a {
  text-decoration: none;
}

.md-list.md-theme-default {
  background-color: white !important;
}

.md-list.md-theme-default
  .md-list-item-container:not(.md-list-item-default):not([disabled]):hover {
  background-color: rgba(0, 0, 0, 0.12) !important;
}

.md-drawer {
  background-color: var(--md-theme-secondary-color, #fff) !important;
}

.md-overlay {
  z-index: 7 !important;
}
</style>

<script>
import router from "./router";
import store from "./store";
import Layout from "./components/Layout.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App",
  components: {
    Layout,
    Loading
  },

  computed: {
    isRightSideMenuOpen() {
      return store.state.isRightSideMenuOpen;
    }
  },

  watch: {
    isRightSideMenuOpen(isOpen) {
      document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
    }
  },

  created() {
    if (localStorage.getItem("access_token") == null) {
      store.commit("setAuthenticated", false);
      router.push({ path: "/login" });
    } else {
      store.commit("setAuthenticated", true);
    }
  },

  methods: {
    openSideNav() {
      store.commit("toggleLeftSideMenu");
    }
  }
};
</script>
