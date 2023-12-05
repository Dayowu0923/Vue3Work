import { createStore } from "vuex";
import cog1store from "./modules/cog1store.js";

export default createStore({
  state: {
    counter: 0,
    loginchk: 0,
    token: "",
    mainPer: [],
    subPer: [],
  },
  getters: {},
  mutations: {
    UserChk(state, payload) {
      state.mainPer = payload.mainPer;
      state.subPer = payload.subPer;
      state.token = payload.token;
      localStorage.setItem("token", JSON.stringify(payload.token));
      localStorage.setItem("mainPer", JSON.stringify(payload.mainPer));
      localStorage.setItem("subPer", JSON.stringify(payload.subPer));
      localStorage.setItem("userPermissions", JSON.stringify(payload));
    },
    UserChkNone(state) {
      state.mainPer = "";
      state.subPer = "";
      state.token = "";
      localStorage.setItem("token", "");
      localStorage.setItem("mainPer", "");
      localStorage.setItem("subPer", "");
      localStorage.setItem("userPermissions", "");
    },
  },
  actions: {
    initializeStore({ commit }) {
      const storedPermissions = localStorage.getItem("userPermissions");
      if (storedPermissions) {
        commit("UserChk", JSON.parse(storedPermissions));
      }
    },
  },
  modules: {
    cog1store,
  },
});
