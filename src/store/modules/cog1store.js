export default {
  namespaced: true,
  state: {
    mainTable: [],
  },
  mutations: {
    fetchData(state, payload) {
      state.mainTable = payload;
    },
  },
  actions: {},
  getters: {},
};
