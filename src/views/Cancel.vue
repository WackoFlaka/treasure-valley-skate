<template>
  <div class="payment-message cancel">
    <h1>❌ Payment Cancelled</h1>
    <p>Your reservation was not completed. You can try again anytime.</p>
    <router-link to="/" class="btn">Return Home</router-link>
  </div>
</template>

<style scoped>
.payment-message {
  text-align: center;
  padding: 100px 20px;
  color: #fff;
}
.cancel {
  background: #2a2a2a;
}
.btn {
  margin-top: 30px;
  display: inline-block;
  padding: 12px 20px;
  background: #ff4d4d;
  color: #000;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
}
</style>
