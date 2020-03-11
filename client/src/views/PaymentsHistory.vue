<template>
    <PaymentHistory />
</template>

<script>

import PaymentHistory from '@/components/PaymentHistory.vue';

export default {
  name: 'PaymentsHistory',
  components: {
    PaymentHistory,
  },
};

</script>

<style lang="scss">
  .payment-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 960px;
  }
</style>
