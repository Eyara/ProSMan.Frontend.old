<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    >
    <div id="nav">
      <Layout/>
    </div>
    <md-content class="content">
      <router-view/>
    </md-content>
  </div>
</template>

<style lang="scss">
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
      color: #42b983;
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
</style>

<script>
import Layout from "./components/Layout.vue";
import "vue-material/dist/theme/default.css";

export default {
  name: "App",
  components: {
    Layout
  }
};
</script>
