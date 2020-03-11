import Vue from 'vue';
import VueRouter from 'vue-router';
import Payment from '../views/Payment.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Payment',
    component: Payment,
  },
  {
    path: '/payment-result',
    name: 'PaymentResult',
    component: () => import('../views/PaymentResult.vue'),
    beforeEnter: (to, from, next) => {
      console.log(store.state.successfulPayment.isPaymentDone);
      if (store.state.successfulPayment.isPaymentDone) {
        next();
        console.log(store.state.successfulPayment);
        store.dispatch('updateIsPaymentDone');
      } else {
        next('/');
      }
    },
  },
  {
    path: '/payments-history',
    name: 'PaymentsHistory',
    component: () => import('../views/PaymentsHistory.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
