<template>
    <form class="payment-form" @submit.prevent="submitForm">
      <div class="payment-form__title">
        Информация по оплате:
      </div>
      <div class="payment-data">
        <div class="payment-data__title">Номер счета:</div>
        <input type="number" placeholder="00000000000000" required
          class="payment-data__input"
          @keypress="preventNotNumbers($event)" />
      </div>
      <div class="payment-data">
      <div class="payment-data__title">Сумма платежа:</div>
        <input type="text" placeholder="0" required class="payment-data__input payment-data__summ"
          @keypress="preventNotNumbers($event)" />
      </div>
      <div class="bank-card__title">
        Данные банковской карты
      </div>
      <div class="bank-card-container">
        <div class="bank-card">
          <div class="bank-card-number">
            <div class="bank-card-number__title">Номер карты</div>
            <input type="text" maxlength="4" @keypress="preventNotNumbers($event)"
              class="bank-card-number__input" required
              v-bind:class="{'wrong-input': isCardNumberIncorrect}" />
            <input type="text" maxlength="4" @keypress="preventNotNumbers($event)"
              class="bank-card-number__input" required
              v-bind:class="{'wrong-input': isCardNumberIncorrect}" />
            <input type="text" maxlength="4" @keypress="preventNotNumbers($event)"
              class="bank-card-number__input" required
              v-bind:class="{'wrong-input': isCardNumberIncorrect}" />
            <input type="text" maxlength="4" @keypress="preventNotNumbers($event)"
              class="bank-card-number__input" required
              v-bind:class="{'wrong-input': isCardNumberIncorrect}"
              @blur="isCardNumberValid" />
          </div>
          <div class="bank-card-date">
            <div class="bank-card-date__title">Срок действия</div>
            <select name="bank-card-date__month" id="" class="bank-card-date__month">
              <option disabled>MM</option>
              <option v-for="n in 12" v-bind:key="n">
                {{(n.toString().length > 1) ? n : '0' + n}}
              </option>
            </select>
            <select name="bank-card-date__year" id="" class="bank-card-date__year">
              <option disabled>YYYY</option>
              <option v-for="n in 12" v-bind:key="n">
                {{new Date().getFullYear() + n - 1}}
              </option>
            </select>
          </div>
          <div class="bank-card-holder">
            <input type="text" placeholder="Держатель карты" required
              class="bank-card-holder__input" @blur="isCardHolderValid"
              v-bind:class="{'wrong-input': isCardHolderIncorrect}"/>
          </div>
        </div>
        <div class="bank-card bank-card_reversed">
          <div class="cvc-code">
            <div class="cvc-code__title">Код CVV2 / CVC2</div>
            <input type="text" name="" id="" maxlength="3" required class="cvc-code__input"
              @keypress="preventNotNumbers($event)" @blur="isCvcCodeValid"
              v-bind:class="{'wrong-input': isCvcCodeIncorrect}" />
          </div>
        </div>
      </div>
      <input type="submit" value="Оплатить" class="payment-form__submit" />
    </form>
</template>

<script>
import api from '@/services/api';
import { mapActions } from 'vuex';

export default {
  name: 'PaymentForm',
  data() {
    return {
      isCardNumberIncorrect: false, isCvcCodeIncorrect: false, isCardHolderIncorrect: false,
    };
  },
  methods: {
    ...mapActions(['updateCurrentPayment', 'updateIsPaymentDone']),
    preventNotNumbers(event) {
      const theEvent = event || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      const regex = /^\d+$/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) {
          theEvent.preventDefault();
        }
      }
    },
    focusOnNextAfterComplete() {
      // фокусировка на следующем инпуте после заполнения предыдущего
      const bankCardNumberInputs = document.querySelectorAll('.bank-card-number__input');
      for (let i = 0; i < bankCardNumberInputs.length; i += 1) {
        bankCardNumberInputs[i].addEventListener('keyup', () => {
          if (bankCardNumberInputs[i].value.length > 3) {
            if (i !== 3) {
              bankCardNumberInputs[i + 1].focus();
            }
          }
        });
      }
    },
    isCardNumberValid() {
      // валидация введёных данных
      const bankCardNumberInputs = document.querySelectorAll('.bank-card-number__input');
      // если в инпуте для номера карты длинна меньше 4 или записано не число, то форма не валидна
      for (let i = 0; i < bankCardNumberInputs.length; i += 1) {
        if (bankCardNumberInputs[i].value.length !== 4 || !(/^\d+$/.test(bankCardNumberInputs[i].value))) {
          this.isCardNumberIncorrect = true;
          return false;
        }
      }
      this.isCardNumberIncorrect = false;
      return true;
    },
    isCvcCodeValid() {
      const cvcCodeInput = document.querySelector('.cvc-code__input');
      if (cvcCodeInput.value.length !== 3 || !(/^\d+$/.test(cvcCodeInput.value))) {
        this.isCvcCodeIncorrect = true;
        return false;
      }
      this.isCvcCodeIncorrect = false;
      return true;
    },
    isCardHolderValid() {
      const cardHolderInput = document.querySelector('.bank-card-holder__input');
      if (cardHolderInput.value.length < 4 || !(/^[A-Za-z\s]+$/.test(cardHolderInput.value))) {
        this.isCardHolderIncorrect = true;
        return false;
      }
      this.isCardHolderIncorrect = false;
      return true;
    },
    isAllInputsHaveValue() {
      const paymentInputData = document.querySelectorAll('.payment-data__input');
      const bankCardNumberInputs = document.querySelectorAll('.bank-card-number__input');
      const cvvCode = document.querySelector('.cvc-code__input').value.length;
      const cardHolder = document.querySelector('.bank-card-holder__input').value.length;
      let result = true;
      for (let i = 0; i < bankCardNumberInputs.length; i += 1) {
        if (!bankCardNumberInputs[i].value.length) {
          result = false;
        }
        if (i < 2 && !paymentInputData[i].value.length) {
          result = false;
        }
      }
      if (!cvvCode || !cardHolder) {
        result = false;
      }
      return result;
    },
    submitForm() {
      const paymentInputData = document.querySelectorAll('.payment-data__input');
      const bankCardNumberInputs = document.querySelectorAll('.bank-card-number__input');
      const cvvCode = document.querySelector('.cvc-code__input').value;
      const cardHolder = document.querySelector('.bank-card-holder__input').value;
      const cardMonthExpires = document.querySelector('.bank-card-date__month').value;
      const cardYearExpires = document.querySelector('.bank-card-date__year').value;

      let cardNumber = '';
      for (let i = 0; i < bankCardNumberInputs.length; i += 1) {
        cardNumber += bankCardNumberInputs[i].value;
      }
      const paymentSumm = paymentInputData[1].value;
      const paymentBill = paymentInputData[0].value;
      const currentDate = new Date();
      const operationDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      const isCardNumberValid = this.isCardNumberValid();
      const isCvcCodeValid = this.isCvcCodeValid();
      const isCardHolderValid = this.isCardHolderValid();
      const isAllInputsHaveValue = this.isAllInputsHaveValue();
      const isCardInputsValid = isCardNumberValid && isCvcCodeValid && isCardHolderValid
      && isAllInputsHaveValue;
      const currentTransactionData = {
        paymentBill,
        paymentSumm,
        cardNumber,
        cvvCode,
        cardHolder,
        cardMonthExpires,
        cardYearExpires,
        operationDate,
      };
      if (isCardInputsValid) {
        // не самая лучшая обработка пост запроса, нет нормальной обработки,
        // что делать при различных ошибках во время фетча
        api().post('transactions-data/add-transaction', currentTransactionData)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
        this.updateCurrentPayment(currentTransactionData);
        this.updateIsPaymentDone(true);
        // document.location.href = '/payment-result';
        this.$router.push('payment-result');
      }
    },
  },
  mounted() {
    this.focusOnNextAfterComplete();
    // this.addRublesToInput();
  },
};

</script>

<style lang="scss">

  .bank-card {
    position: relative;
  }

  .payment-data {
    display: flex;
    margin-bottom: 15px;
  }
/* объединить одинаковые шрифты в один класс */
  .payment-data__title {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(132, 148, 171);
    width: 160px;
  }

  .payment-data__input {
    background-color: transparent;
    border: none;
  }

  .payment-data__summ::after {
    content: 'руб.';
    position: absolute;
    right: 10px;
  }

  .payment-form__title {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(132, 148, 171);
    margin-bottom: 20px;
  }

  .bank-card__title {
    font-size: 19px;
    font-family: "open_sans";
    color: rgb(56, 61, 67);
    font-weight: bold;
    margin-bottom: 25px;
  }

  .bank-card-number__title {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(132, 148, 171);
    margin-bottom: 7px;
  }

  .bank-card-date__title {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(132, 148, 171);
    margin-top: 16px;
    margin-bottom: 7px;
  }

  .bank-card-number__input {
    height: 40px;
    width: 65px;
    border: 1px solid rgb(228, 233, 238);
    margin-right: 10px;
    font-size: 16px;
    font-family: "Arial";
    box-sizing: border-box;
    padding-left: 12px;
  }

  .bank-card-container {
    position: relative;
  }

  .bank-card {
    position: relative;
    padding: 15px;
    padding-top: 20px;
    border: 1px solid rgb(228, 233, 238);
    border-radius: 10px;
    width: 350px;
    height: 235px;
    background-color: #f7f8f8;
    z-index: 10;
  }

  .bank-card-holder__input {
    width: 100%;
    height: 40px;
    border: 1px solid rgb(228, 233, 238);
    padding-left: 10px;
    font-size: 16px;
    font-family: "Arial";
  }

  .bank-card-holder__input::placeholder {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(190, 198, 207);
  }

  .bank-card-date {
    margin-bottom: 10px;
  }

  .bank-card-date__month {
    height: 40px;
    padding-right: 30px;
    padding-left: 10px;
    background-color: white;
    border: 1px solid rgb(228, 233, 238);
    border-radius: 0;
    background-image: url('../../public/select-arrow.png');
    background-position: 75% center;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  .bank-card-date__year {
    height: 40px;
    padding-right: 30px;
    padding-left: 10px;
    background-color: white;
    border: 1px solid rgb(228, 233, 238);
    border-radius: 0;
    background-image: url('../../public/select-arrow.png');
    background-position: 83% center;
    background-repeat: no-repeat;
  }

  .cvc-code {
    position: absolute;
    top: 85px;
    right: 30px;
  }

  .cvc-code__title {
    font-size: 16px;
    font-family: "Arial";
    color: rgb(132, 148, 171);
  }

  .cvc-code__input {
    width: 130px;
    height: 40px;
    border: 1px solid rgb(228, 233, 238);
    padding-left: 10px;
    font-size: 16px;
    font-family: "Arial";
  }

  .bank-card_reversed {
    position: absolute;
    z-index: 9;
    left: 200px;
    top: 20px;
  }

  .bank-card_reversed::after {
    content: '';
    height: 40px;
    width: 100%;
    position: absolute;
    top: 25px;
    left: 0;
    background-color: #e4e9ee;
  }

  .payment-form__submit {
    background-color: #0059bd;
    font-size: 14px;
    font-family: "open_sans";
    color: rgb(255, 255, 255);
    font-weight: bold;
    width: 130px;
    height: 40px;
    border-radius: 20px;
    margin-top: 40px;
  }

  .wrong-input {
    border-color: red;
  }
</style>
