export default {
  namespaced: true,
  state: {
    ddl: [],
    mainTable: [],
    sel_data: {},
    edit_id: 0,
    change_data: 0,
  },
  mutations: {
    fetchData(state, payload) {
      state.mainTable = payload;
    },
    fetchDdl(state, payload) {
      state.ddl = payload;
    },
    changeData(state, payload) {
      state.change = payload;
    },
    serData(state, payload) {
      state.sel_data = payload;
      state.edit_id = payload.id;
    },
    addData(state, payload) {
      state.edit_id = payload;
    },
  },
  actions: {},
  getters: {},
};
