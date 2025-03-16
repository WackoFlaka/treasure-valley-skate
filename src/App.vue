<template>
  <div id="app">
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
  components: { Navbar, Footer }
};
</script>

<style>
/* Ensure full page height without extra space */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

/* App Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures content fills the page */
}

/* Ensures content fills space & footer stays at the bottom */
.main-content {
  flex: 1;
  padding-bottom: 0; /* Prevents extra space below */
}

/* Footer Styling */
footer {
  margin: 0;
  padding: 0;
  width: 100%;
}

</style>
