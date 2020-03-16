<template>
  <div>
    <input id="navigation-toggle" class="navigation-toggle" type="checkbox" />
    <label class="navigation-button" for="navigation-toggle">
      <span></span>
    </label>
    <div class="navigation">
        <router-link to="#" class="navigation__item">Личный кабинет</router-link>
        <router-link to="/" class="navigation__item">Платежи</router-link>
        <router-link to="/payments-history" class="navigation__item">История платежей</router-link>
        <router-link to="#" class="navigation__item">Настройки</router-link>
        <router-link to="#" class="navigation__item">Выйти</router-link>
    </div>
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

    .navigation-toggle {
      display: none;
    }

    @media (max-width: 960px) {
      .navigation-toggle  {
        opacity: 0;
      }

      .navigation-toggle:checked ~ .navigation-button > span {
        transform: rotate(45deg);
      }

      .navigation-toggle:checked ~ .navigation-button > span::before {
        top: 0;
        transform: rotate(0);
      }

      .navigation-toggle:checked ~ .navigation-button > span::after {
        top: 0;
        transform: rotate(90deg);
      }

      .navigation-toggle:checked ~ .navigation {
        visibility: visible;
        right: 0;
      }

      .navigation-button {
        display: flex;
        align-items: center;
        position: absolute;
        top: 20px;
        right: 20px;
        width: 26px;
        height: 26px;
        cursor: pointer;
        z-index: 12;
        & > span, & > span::before, & > span::after {
          display: block;
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #616161;
          transition-duration: .25s;
        }
        & > span::before {
          content: '';
          top: -8px;
        }
        & > span::after {
          content: '';
          top: 8px;
        }
      }

      .navigation {
        position: fixed;
        visibility: hidden;
        top: 0;
        right: -100%;
        background-color: #1f2229;
        width: 320px;
        height: 100%;
        margin: 0;
        list-style: none;
        transition-duration: .25s;
        z-index: 11;
        &__item {
          transition-duration: .25s;
          &:hover {
            background-color: #CFD8DC;
          }
        }
      }
    }
</style>
