<template>
  <div class="payment-container">
    <Navigation />
    <div class="main-content-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
};
</script>

<style lang="scss">
  @font-face {
      font-family: 'open_sans';
      src: url('../public/fonts/OpenSans-Bold-webfont.woff') format('woff'),
           url('../public/fonts/OpenSans-Bold-webfont.ttf') format('truetype');
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: 'open_sans';
      src: url('../public/fonts/OpenSans-normal-webfont.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  body {
    background-color: #101114;
    margin: 0;
  }

  .main-content-container {
    width: 640px;
    background-color: #f7f8f8;
    padding: 50px 30px;
  }

  @media (max-width: 960px) {
    .main-content-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

</style>
