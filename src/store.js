import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedProjectId: 0,
    selectedSprintId: 0,
    selectedCategoryId: 0,
    pageLabel: "",
    rightSideMenuOpen: false,
  },
  mutations: {
    selectProjectId(state, value) {
      state.selectedProjectId = value;
    },

    selectCategoryId(state, value) {
      state.selectedCategoryId = value;
    },

    selectSprintId(state, value) {
      state.selectedSprintId = value; 
    },
    
    setPageLabel(state, value) {
      state.pageLabel = value;
    },

    toggleRightSideMenu(state) {
      state.rightSideMenuOpen = !state.rightSideMenuOpen;
    },
  },
  actions: {
  }
})
