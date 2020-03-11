<template>
    <PaymentForm />
</template>

<script>

import PaymentForm from '@/components/PaymentForm.vue';

export default {
  name: 'Payment',
  components: {
    PaymentForm,
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
