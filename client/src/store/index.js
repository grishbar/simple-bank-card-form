import Vue from 'vue';
import Vuex from 'vuex';
import transactions from './modules/transactions';
import successfulPayment from './modules/successfulPayment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    transactions,
    successfulPayment,
  },
});
