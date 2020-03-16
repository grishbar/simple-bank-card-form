<template>
    <table class="payments-history">
        <tr class="payments-history__head">
            <th class="payments-history__head-cell">Bill</th>
            <th class="payments-history__head-cell">Summ</th>
            <th class="payments-history__head-cell">Transaction date</th>
        </tr>
        <tr class="payments-history__row" v-for="transaction in allTransactions"
          :key="transaction.id">
            <td>{{ transaction.paymentBill }}</td>
            <td>{{ transaction.paymentSumm }}</td>
            <td>{{ transaction.operationDate }}</td>
        </tr>
    </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PaymentHistoryTable',
  computed: mapGetters(['allTransactions', 'transactionsCount']),
  methods: mapActions(['fetchTransactions']),
  async mounted() {
    // this.$store.dispatch("fetchPosts");
    this.fetchTransactions();
  },
};

</script>

<style lang="scss">
  .payments-history {
    font-size: 19px;
    font-family: "open_sans";
    color: rgb(56, 61, 67);
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  table,tr,th,td {
    padding: 5px;
    border: 1px solid black;
    border-spacing: 0;
    border-collapse: collapse;
  }
  th {
    background-color: #1f2229;
    font-size: 14px;
    font-family: "open_sans";
    color: white;
    font-weight: bold;
  }
</style>
