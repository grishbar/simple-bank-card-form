export default {
  actions: {
    updateCurrentPayment({ commit }, currentPayment) {
      commit('updateCurrentPayment', currentPayment);
    },
    updateIsPaymentDone({ commit }, isPaymentDone) {
      commit('updateIsPaymentDone', isPaymentDone);
    },
  },
  mutations: {
    updateCurrentPayment(state, currentPayment) {
      state.currentPayment = currentPayment;
    },
    updateIsPaymentDone(state, isPaymentDone) {
      state.isPaymentDone = isPaymentDone;
    },
  },
  state: {
    currentPayment: {
      paymentSumm: '0 руб.',
      paymentBill: '000000000000',
      cardNumber: '0000000000000000',
      cvvCode: '000',
      cardHolder: 'name surname',
      cardMonthExpires: '00',
      cardYearExpires: '0000',
      operationDate: '0.0.0000 0:00:00',
      id: 0,
    },
    isPaymentDone: false,
  },
  getters: {
    currentPayment(state) {
      return state.currentPayment;
    },
    isPaymentDone(state) {
      return state.isPaymentDone;
    },
  },
};
