import { createStore } from "vuex";
import cog1store from "./modules/cog1store.js";
import cogitemstore from "./modules/cogitemstore.js";
export default createStore({
  state: {
    pagecount: 10,
    loginchk: 0,
    token: "",
    mainPer: [],
    subPer: [],
    routename: "",
  },
  getters: {
    MainTitle: (state) => {
      if (state.subPer.length > 0 && state.routename != "login") {
        let main = state.subPer.find(
          (item) => item.menuPath === state.routename
        );
        let re = state.mainPer.find((item) => item.menuId === main.menuLastId);
        return re.menu;
      } else return "";
    },
    SubTitle: (state) => {
      if (state.subPer.length > 0 && state.routename != "login") {
        let re = state.subPer.find((item) => item.menuPath === state.routename);
        return re.menu;
      } else return "";
    },
  },
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
    SetRouteName(state, name) {
      state.routename = name;
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
    cogitemstore,
  },
});
