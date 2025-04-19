<template>
  <div id="app">
    <transition name="fade-to-black">
      <div v-if="showFadeOverlay" class="fade-overlay"></div>
    </transition>

    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar, Footer },
  data() {
    return {
      showFadeOverlay: false
    };
  },
  created() {
    window.addEventListener('start-login-fade', this.triggerFade);
  },
  beforeUnmount() {
    window.removeEventListener('start-login-fade', this.triggerFade);
  },
  methods: {
    triggerFade() {
      this.showFadeOverlay = true;
      setTimeout(() => {
        this.showFadeOverlay = false;
        this.$router.push('/admin');
      }, 2000);
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 0;
}

footer {
  margin: 0;
  padding: 0;
  width: 100%;
}

.fade-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 9999;
}
.fade-to-black-enter-active {
  transition: opacity 1s ease;
}
.fade-to-black-enter-from {
  opacity: 0;
}
.fade-to-black-enter-to {
  opacity: 1;
}
</style>