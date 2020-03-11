<template>
  <div class="navigation">
      <router-link to="#" class="navigation__item">Личный кабинет</router-link>
      <router-link to="/" class="navigation__item">Платежи</router-link>
      <router-link to="/payments-history" class="navigation__item">История платежей</router-link>
      <router-link to="#" class="navigation__item">Настройки</router-link>
      <router-link to="#" class="navigation__item">Выйти</router-link>
  </div>
</template>

<script>

export default {
  name: 'navigation',
};

</script>

<style lang="scss">
    .navigation {
        display: flex;
        flex-direction: column;
        &__item {
            padding: 26px 30px;
            font-size: 18px;
            font-family: "open_sans";
            color: white;
            font-weight: bold;
            text-decoration: none;
            background-color: #1f2229;
            width: 320px;
        }
    }
</style>
