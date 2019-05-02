<template>
  <div class="login-toolbar">
    <md-tabs class="md-primary" md-alignment="centered">  
      <md-tab id="sign-in" md-icon="input" md-label="Вход">
        <md-content>
          <div class="title-block">
            <p class="login-title">Добро пожаловать в персональный менеджер проектов!</p>
          </div>
          <div class="login-form">
            <md-field>
              <label>Логин</label>
              <md-input v-model="loginModel.username"></md-input>
            </md-field>
            <md-field>
              <label>Пароль</label>
              <md-input v-model="loginModel.password" type="password"></md-input>
            </md-field>
          </div>
          <div class="action-block">
            <md-button @click="login(loginModel)" class="btn-submit">Войти</md-button>
          </div>
        </md-content>
      </md-tab>
      <md-tab id="sign-up" md-icon="perm_identity" md-label="Регистрация">
        <md-content>
          <div class="title-block">
            <p class="login-title">Добро пожаловать в персональный менеджер проектов!</p>
          </div>
          <div class="login-form">
            <md-field>
              <label>Логин</label>
              <md-input v-model="registerModel.username"></md-input>
            </md-field>
            <md-field>
              <label>Как вас зовут</label>
              <md-input v-model="registerModel.fullname"></md-input>
            </md-field>
            <md-field>
              <label>Пароль</label>
              <md-input v-model="registerModel.password" type="password"></md-input>
            </md-field>
          </div>
          <div class="action-block">
            <md-button @click="register()" class="btn-submit">Зарегистрироваться</md-button>
          </div>
        </md-content>
      </md-tab>
    </md-tabs>
    <md-snackbar :md-position="'center'" :md-duration="4000" 
      :md-active.sync="showSnackBar" md-persistent>
      <span>{{snackbar_message}}</span>
      <md-button class="md-primary" @click="snackbar_message = null">Закрыть</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import * as JWT from 'jwt-decode';
import store from "../store.js";
import router from "../router.js";
import authService from "../services/auth.service";

export default {
  name: "login",
  components: {},

  data() {
    return {
      registerModel: {
        username: "",
        fullname: "",
        password: ""
      },
      loginModel: {
        username: "",
        password: "",
        grant_type: "password",
        scope: "openid"
      },
      snackbar_message: null,
    };
  },

  computed: {
    showSnackBar() {
      return this.snackbar_message != null;
    }
  },

  created() {
    if (localStorage.getItem("access_token") != null) {
      router.push({ path: "/" });
    }
  },

  methods: {
    async login(model) {
      await authService.token(model).then(x => {
        let jwtToken = JWT(x.data.id_token);

        localStorage.setItem("fullname", jwtToken.fullname);
        localStorage.setItem("access_token", x.data.access_token);

        store.commit("setAuthenticated", true);

        router.push({ path: "/" });
      }).catch(response => {
        this.snackbar_message = response.error_description;
      });
    },

    async register() {
      await authService.register(this.registerModel).then(async () => {
        let model = {
          username: this.registerModel.username,
          password: this.registerModel.password,
          grant_type: "password",
          scope: "openid" 
        };
        await this.login(model);
      }).catch(response => {
        this.snackbar_message = response.errorDescription;
      });
    },
  }
};
</script>

<style lang="scss">
.login-toolbar {  
  top: 0;
  left: 0;
  position: fixed;

  .md-tabs-navigation {
    background-color: #3a9ad9 !important;
  }

  .md-icon {
    color: white !important;
  }

  .md-content {
    background-color: transparent !important;
    text-align: center;

    .login-form {
      width: 60%;
      margin: 0 auto 40px auto;
    }
  }

  width: 100%;
}

.title-block {
  margin: 0 20px;
}

.login-title {
  font-size: 24px;
  font-weight: 500;
}

.btn-submit {
  color: #fafafa !important;
  background-color: #3a9ad9 !important;
  z-index: 0;
}
</style>