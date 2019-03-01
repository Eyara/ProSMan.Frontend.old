import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedProject: Object(null),
    selectedSprint: Object(null),
    selectedCategoryId: 0,
    pageLabel: "",
    rightSideMenuOpen: false,
    updatingItem: Object(null),
    isCreating: true,
    updatingType: "project",
    hasBeenUpdated: false,
    menuButtonType: "menu",
  },
  mutations: {
    selectProject(state, value) {
      state.selectedProject = value;
    },

    selectCategoryId(state, value) {
      state.selectedCategoryId = value;
    },

    selectSprint(state, value) {
      state.selectedSprint = value; 
    },
    
    setPageLabel(state, value) {
      state.pageLabel = value;  
    },

    toggleRightSideMenu(state) {
      state.rightSideMenuOpen = !state.rightSideMenuOpen;
    },

    updateItem(state, value) {
      state.updatingItem = value;
    },

    setCreating(state, value) {
      state.isCreating = value;
    },

    setUpdatingType(state, value) {
      state.updatingType = value;
    },

    setHasBeenUpdated(state, value) {
      state.hasBeenUpdated = value;
    },

    setMenuButtonType(state, value) {
      state.menuButtonType = value;
    }
  },
  actions: {
  }
})
