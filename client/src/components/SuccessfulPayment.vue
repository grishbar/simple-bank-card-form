<template>
  <div>
    <h2>Платеж успешно совершен</h2>
    <div class="payment-data">
      <div class="payment-data__title">Номер счета:</div>
      <div>{{ currentPayment.paymentBill }}</div>
    </div>
    <div class="payment-data">
      <div class="payment-data__title">Сумма платежа:</div>
      <div>{{ currentPayment.paymentSumm }}</div>
    </div>
    <div class="payment-data">
      <div class="payment-data__title">Держатель карты:</div>
      <div>{{ currentPayment.cardHolder }}</div>
    </div>
    <div class="payment-data">
      <div class="payment-data__title">Дата оплаты:</div>
      <div>{{ currentPayment.operationDate }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SuccesfullPayment',
  computed: mapGetters(['currentPayment']),
};

</script>
