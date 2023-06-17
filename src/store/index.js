import { createStore } from 'vuex';
import idc from './IDC/index.js';
export default createStore({
  namespaced: true,
  modules: {
    idc,
  },
});
