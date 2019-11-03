import Vue from "vue";
import Vuex from "vuex";
import { UpdatingTypeEnum } from "@/models/enums/updating-type.enum";
import { ILookupViewModel } from "@/models/lookup.model";
import { ISprintModel } from "@/models/sprint.model";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProject: <ILookupViewModel>{},
    selectedSprint: <ISprintModel>{},
    selectedCategoryId: 0,
    pageLabel: "",
    isLeftSideMenuOpen: false,
    isRightSideMenuOpen: false,
    updatingItem: Object(null),
    isCreating: true,
    updatingType: UpdatingTypeEnum.Task,
    hasBeenUpdated: false,
    menuButtonType: "menu",
    isAuthenticated: false,
    isLoading: false
  },
  mutations: {
    selectProject(state, value: ILookupViewModel) {
      state.selectedProject = value;
    },

    selectCategoryId(state, value) {
      state.selectedCategoryId = value;
    },

    selectSprint(state, value: ISprintModel) {
      state.selectedSprint = value;
    },

    setPageLabel(state, value: string) {
      state.pageLabel = value;
    },

    toggleRightSideMenu(state) {
      state.isRightSideMenuOpen = !state.isRightSideMenuOpen;
    },

    hideRightSideMenu(state) {
      state.isRightSideMenuOpen = false;
    },

    toggleLeftSideMenu(state) {
      state.isLeftSideMenuOpen = !state.isLeftSideMenuOpen;
    },

    updateItem(state, value) {
      state.updatingItem = value;
    },

    setCreating(state, value: boolean) {
      state.isCreating = value;
    },

    setUpdatingType(state, value: UpdatingTypeEnum) {
      state.updatingType = value;
    },

    setHasBeenUpdated(state, value: boolean) {
      state.hasBeenUpdated = value;
    },

    setMenuButtonType(state, value) {
      state.menuButtonType = value;
    },

    setAuthenticated(state, value: boolean) {
      state.isAuthenticated = value;
    },

    setLoading(state, value: boolean) {
      state.isLoading = value;
    }
  },
  actions: {
    toggleRightSideMenu(context) {
      context.commit("toggleRightSideMenu");
      window.scrollTo(0, 0);
    },

    setUpdatingItem(context, [isCreating, type, item]) {
      context.commit("setCreating", isCreating);
      context.commit("updateItem", item);
      context.commit("setUpdatingType", type);
      context.dispatch("toggleRightSideMenu");
    }
  }
});
