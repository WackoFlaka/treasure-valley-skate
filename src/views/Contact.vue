<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <div class="hero">
      <h1 class="hero-title">Contact Us</h1>
    </div>

    <!-- Contact Information -->
    <div class="contact-info container">
      <h2>Get in Touch</h2>
      <p>Have questions? Reach out to us!</p>
      
      <div class="contact-details">
        <p><strong>📞 Phone:</strong> <a href="tel:208-342-1842">208-342-1842</a></p>
        <p><strong>📧 Email:</strong> <a href="mailto:info@treasurevalleyskate.com">info@treasurevalleyskate.com</a></p>
      </div>

      <p class="notice">
        📌 <strong>Please call us during our hours of operation.</strong> We look forward to assisting you!
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 40vh;
  background: url('../assets/main_bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
}

/* Contact Info */
.contact-info {
  text-align: center;
  padding: 40px 20px;
}

.contact-details {
  font-size: 1.2rem;
  margin: 20px 0;
}

.contact-details a {
  color: #ff6600;
  text-decoration: none;
  font-weight: bold;
}

.notice {
  margin-top: 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}
</style>
