<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero">
      <h1 class="hero-title">About</h1>
    </div>

    <!-- Tabs Section -->
    <div class="tabs-container container">
      <ul class="tabs">
        <li :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">Info</li>
        <li :class="{ active: activeTab === 'rules' }" @click="activeTab = 'rules'">Rules</li>
      </ul>

      <div class="tab-content">
        <!-- Info Tab -->
        <div v-if="activeTab === 'info'">
          <p>
            Conveniently located on State St., the communities of Meridian, Boise, Eagle, Kuna, and Star can soon enjoy
            skating fun, play games, and enjoy the unique experience and awesome fun that Treasure Valley Skate and
            Family Fun Center will provide. We look forward to seeing you soon.
          </p>

          <!-- Information Sections -->
          <div class="info-sections">
            <div class="info-section">
              <img src="../assets/IMG_5597.jpg" alt="Our Shop">
              <h3>Our Shop</h3>
              <p>Our shop offers high-quality skates, protective gear, and accessories to enhance your skating experience.</p>
            </div>
            <div class="info-section">
              <img src="../assets/IMG_5596.jpg" alt="Snackbar">
              <h3>Snackbar</h3>
              <p>Enjoy a variety of snacks and beverages at our snackbar, perfect for refueling between skating sessions.</p>
            </div>
            <div class="info-section">
              <img src="../assets/IMG_5613.jpg" alt="Live DJ">
              <h3>Live DJ</h3>
              <p>Experience the best skating vibes with our live DJ, playing great music to keep you moving on the rink.</p>
            </div>
            <div class="info-section">
              <img src="../assets/newarcade.jpg" alt="Arcade">
              <h3>Arcade</h3>
              <p>Take a break from skating and enjoy classic arcade games with friends and family.</p>
            </div>
          </div>
        </div>

        <!-- Rules Tab -->
        <div v-if="activeTab === 'rules'">
          <ul>
            <li>1 - SKATE AT YOUR OWN RISK</li>
            <li>2 - NO SMOKING, NO Vapes, NO E-Cigarettes!</li>
            <li>3 - NO FOUL LANGUAGE!</li>
            <li>4 - NO GUM CHEWING!</li>
            <li>5 - FOOD & BEVERAGE ITEMS CANNOT BE BROUGHT INTO THE BUILDING.</li>
            <li>6 - NO In & Out privileges or loitering around the building.</li>
            <li>7 - NO outside alcoholic beverages or drugs.</li>
            <li>8 - All patrons must be neatly groomed.</li>
            <li>9 - All skates must be clean and in good repair.</li>
            <li>10 - Fast, reckless, or unsafe skating is not permitted.</li>
            <li>11 - No sitting on railings, walls, tables, or counters.</li>
            <li>12 - All rental skates require socks.</li>
            <li>13 - When the session is over, return skates properly.</li>
            <li>14 - All personal belongings must be stored in lockers.</li>
            <li>15 - Food and drinks must be kept in the snack bar area.</li>
            <li>16 - Parents may be spectators only; all others must pay admission.</li>
            <li>17 - Management reserves the right to inspect belongings.</li>
            <li>18 - Please report all accidents to management.</li>
            <li>19 - Patrons must follow all posted and verbal rules.</li>
            <li>20 - Parents are responsible for their children’s actions.</li>
            <li>21 - Management reserves the right to refuse entrance.</li>
            <li>22 - All persons entering assume all risk of accidents and injury.</li>
            <li>23 - Patrons must conduct themselves respectfully.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'info'
    };
  }
};
</script>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 50vh;
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

/* Tabs */
.tabs-container {
  text-align: center;
  padding: 40px 20px;
}

.tabs {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.tabs li {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.tabs li.active {
  border-bottom: 3px solid #ff6600;
  font-weight: bold;
}

.tab-content {
  text-align: left;
  max-width: 800px;
  margin: auto;
}

/* Info Sections */
.info-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.info-section {
  text-align: center;
  width: 45%;
  max-width: 400px;
}

.info-section img {
  width: 100%;
  height: 80%;
  border-radius: 8px;
}

.info-section h3 {
  margin-top: 10px;
  font-size: 1.2rem;
}

.info-section p {
  font-size: 1rem;
  margin-top: 5px;
  margin-bottom: 7rem;
}

/* Responsive */
@media (max-width: 768px) {
  .info-sections {
    flex-direction: column;
    align-items: center;
  }
  .info-section {
    width: 100%;
  }
}
</style>
