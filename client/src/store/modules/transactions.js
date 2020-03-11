import api from '@/services/api';

export default {
  actions: {
    async fetchTransactions({ commit }) {
      api().get('transactions-data')
        .then((response) => {
          commit('updateTransactions', response.data);
        });
    },
  },
  mutations: {
    updateTransactions(state, transactions) {
      state.transactions = transactions;
    },
    addTransaction(state, newTransaction) {
      state.transactions.unshift(newTransaction);
    },
  },
  state: {
    transactions: [],
  },
  getters: {
    allTransactions(state) {
      return state.transactions;
    },
    transactionsCount(state) {
      return state.transactions.length;
    },
  },
};
