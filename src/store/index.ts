import { createStore } from 'vuex'

export default createStore({
  state: {
    isDialogOpenEdit: false, // Estado inicial del diálogo
    isDialogOpenDelete: false,
    isDialogOpenCreate: false,
  },
  getters: {
    // Getter para obtener el estado del diálogo
    isDialogOpenEdit: (state) => state.isDialogOpenEdit,
    isDialogOpenDelete: (state) => state.isDialogOpenDelete,
    isDialogOpenCreate: (state) => state.isDialogOpenCreate,
  },
  mutations: {
    // Mutaciones para abrir y cerrar el diálogo
    OPEN_DIALOG_EDIT(state) {
      state.isDialogOpenEdit = true;
    },
    CLOSE_DIALOG_EDIT(state) {
      state.isDialogOpenEdit = false;
    },
    TOGGLE_DIALOG_EDIT(state) {
      state.isDialogOpenEdit = !state.isDialogOpenEdit;
    },
    OPEN_DIALOG_DELETE(state) {
      state.isDialogOpenDelete = true;
    },
    CLOSE_DIALOG_DELETE(state) {
      state.isDialogOpenDelete = false;
    },
    TOGGLE_DIALOG_DELETE(state) {
      state.isDialogOpenDelete = !state.isDialogOpenDelete;
    },
    OPEN_DIALOG_CREATE(state) {
      state.isDialogOpenCreate = true;
    },
    CLOSE_DIALOG_CREATE(state) {
      state.isDialogOpenCreate = false;
    },
    TOGGLE_DIALOG_CREATE(state) {
      state.isDialogOpenCreate = !state.isDialogOpenCreate;
    },
  },
  actions: {
    // Acciones para manejar la apertura y cierre del diálogo
    openDialogEdit({ commit }) {
      commit('OPEN_DIALOG_EDIT');
    },
    closeDialogEdit({ commit }) {
      commit('CLOSE_DIALOG_EDIT');
    },
    toggleDialogEdit({ commit }) {
      commit('TOGGLE_DIALOG_EDIT');
    },
    openDialogDelete({ commit }) {
      commit('OPEN_DIALOG_DELETE');
    },
    closeDialogDelete({ commit }) {
      commit('CLOSE_DIALOG_DELETE');
    },
    toggleDialogDelete({ commit }) {
      commit('TOGGLE_DIALOG_DELETE');
    },
    openDialogCreate({ commit }) {
      commit('OPEN_DIALOG_CREATE');
    },
    closeDialogCreate({ commit }) {
      commit('CLOSE_DIALOG_CREATE');
    },
    toggleDialogCreate({ commit }) {
      commit('TOGGLE_DIALOG_CREATE');
    },
  },
  modules: {
    // Puedes añadir módulos aquí si es necesario
  }
})
