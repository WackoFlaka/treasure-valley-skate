<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="text-center">
        <h1 class="business-name">Treasure Valley Skate</h1>
        <p class="slogan">"Where Fun Meets the Floor!"</p>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section container">
      <h2>Welcome to Treasure Valley Skate!</h2>
      <p>
        Experience the thrill of roller skating at Boise's favorite rink! Whether you're here to skate, party, or just
        have fun, we have something for everyone.
      </p>
    </div>

    <!-- Features Section -->
    <div class="features-section container">
      <div class="row">
        <div class="col-md-3 feature-box">
          <img src="../assets/skating.jpg" alt="Skating" />
          <h3>Public Skating</h3>
          <p>Join us for open skate sessions with great music!</p>
        </div>
        <div class="col-md-3 feature-box">
          <img src="../assets/party.jpg" alt="Parties" />
          <h3>Parties & Events</h3>
          <p>Celebrate birthdays and special events with us.</p>
        </div>
        <div class="col-md-3 feature-box">
          <img src="../assets/arcade.jpg" alt="Arcade" />
          <h3>Arcade & Games</h3>
          <p>Enjoy classic arcade games and prizes!</p>
        </div>
        <div class="col-md-3 feature-box">
          <img src="../assets/food.jpg" alt="Food" />
          <h3>Snack Bar</h3>
          <p>Delicious snacks and drinks to keep you energized.</p>
        </div>
      </div>
    </div>

    <!-- Google Calendar Section -->
    <div class="calendar-section container">
      <h2>Our Schedule</h2>
      <p>Check our open skating times and special events! We will be updating our schedule every week!</p>
      <div class="calendar-wrapper">
        <iframe src="https://calendar.google.com/calendar/embed?src=jchav5601%40gmail.com&ctz=America%2FDenver"
          style="border: 0" width="100%" height="600" frameborder="0" scrolling="no">
        </iframe>
      </div>
    </div>
</div>
    <!-- Call to Action 
    <div class="cta-section">
      <h2>Ready to Skate?</h2>
      <router-link to="/parties" class="btn btn-primary">Book a Party</router-link>
      <router-link to="/contact" class="btn btn-outline-light">Contact Us</router-link>
    </div>
  </div> -->
</template>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../assets/main_bg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.business-name {
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  margin-bottom: 10px;
}

.slogan {
  color: #ffcc00;
  font-size: 1.5rem;
  font-weight: 500;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

/* About Section */
.about-section {
  text-align: center;
  padding: 50px 20px;
}

.about-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Features Section */
.features-section {
  text-align: center;
  padding: 50px 20px;
}

.feature-box {
  text-align: center;
  padding: 20px;
}

.feature-box img {
  width: 400px;
  /* Increase image size */
  height: auto;
  /* Maintain aspect ratio */
  max-width: 100%;
  /* Prevents overflow */
  display: block;
  margin: 0 auto 15px;
  /* Center the image */
}


.feature-box h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

/* Call-to-Action Section */
.cta-section {
  text-align: center;
  padding: 50px;
  background: #ffcc00;
  color: black;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: bold;
}

.cta-section .btn {
  margin: 10px;
}

/* Google Calendar Section */
.calendar-section {
  text-align: center;
  padding: 50px 20px;
  background-color: #f8f9fa;
}

.calendar-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.calendar-wrapper {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .calendar-section iframe {
    height: 400px;
  }
}
</style>
