<template>
  <div class="success-wrapper">
    <div class="confetti"></div>
    <div class="popup">
      <h1>🎉 Payment Successful!</h1>
      <p>Thanks for booking your party with us!</p>
      <router-link to="/" class="btn">Return Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Re-trigger confetti animation on page load
    const confetti = document.querySelector('.confetti');
    confetti.classList.remove('animate');
    void confetti.offsetWidth; // trigger reflow
    confetti.classList.add('animate');
  }
};
</script>

<style scoped>
.success-wrapper {
  background: linear-gradient(to bottom, #0f0f0f, #1f1f1f);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  color: #fff;
}

.popup {
  background: #111;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px #00ff99;
  text-align: center;
  animation: scaleIn 0.7s ease forwards;
  z-index: 2;
}

.popup h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.popup p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn {
  background: #00ff99;
  color: #000;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #00cc80;
}

@keyframes scaleIn {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Confetti Animation */
.confetti {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  z-index: 1;
}

.confetti.animate::before,
.confetti.animate::after {
  content: '';
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -50px;
  left: -50vw;
  background-image: radial-gradient(circle, #ff0, #f0f, #0ff, #0f0, #f00);
  background-size: 20px 20px;
  animation: burst 1.2s ease-out forwards;
  opacity: 0.8;
  mask-image: radial-gradient(ellipse, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
}

@keyframes burst {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(600px) scale(1.2);
    opacity: 0;
  }
}
</style>
