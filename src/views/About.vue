<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-overlay">
        <h1 class="hero-title">About</h1>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="tabs">
      <button @click="selectedTab = 'info'" :class="{ active: selectedTab === 'info' }">Info</button>
      <button @click="selectedTab = 'rules'" :class="{ active: selectedTab === 'rules' }">Rules</button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Info Tab -->
      <div v-if="selectedTab === 'info'">
        <h2>Welcome to Treasure Valley Skate!</h2>
        <p>
          Conveniently located on State St., the communities of Meridian, Boise, Eagle, Kuna, and Star can soon enjoy
          skating fun, play games, and experience the unique fun that Treasure Valley Skate and Family Fun Center provides.
        </p>
        <p>We look forward to seeing you soon.</p>

        <!-- Additional Info Sections -->
        <div class="info-sections">
          <div class="info-box">
            <h3>Our Shop</h3>
            <p>Find high-quality roller skates, accessories, and fun skating merchandise at our pro shop.</p>
          </div>
          <div class="info-box">
            <h3>Live DJ</h3>
            <p>Enjoy music mixed by our in-house DJ, keeping the energy high and the fun rolling!</p>
          </div>
          <div class="info-box">
            <h3>Snackbar</h3>
            <p>Recharge with delicious snacks and drinks at our snackbar, featuring crowd-favorite treats.</p>
          </div>
          <div class="info-box">
            <h3>Arcade Machines</h3>
            <p>Take a break from skating and enjoy classic and modern arcade games with friends and family.</p>
          </div>
          <div class="info-box">
            <h3>Events</h3>
            <p>We host exciting themed skate nights, private parties, and community events. Stay tuned for upcoming fun!</p>
          </div>
        </div>
      </div>

      <!-- Rules Tab -->
      <div v-if="selectedTab === 'rules'">
        <h2>Skating Rules</h2>
        <p>These rules apply to everyone to ensure a fun and safe skating experience.</p>
        <ul class="rules-list">
          <li v-for="(rule, index) in rules" :key="index">
            <strong>{{ index + 1 }} -</strong> {{ rule }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "info",
      rules: [
        "SKATE AT YOUR OWN RISK",
        "NO SMOKING, NO Vapes, NO E-Cigarettes!",
        "NO FOUL LANGUAGE!",
        "NO GUM CHEWING!",
        "FOOD & BEVERAGE ITEMS CAN NOT BE BROUGHT INTO THE BUILDING.",
        "NO In & Out privileges or loitering around the building. When you leave, you leave. Person will have to pay admission again for re-entry.",
        "NO outside alcoholic beverages or drugs, or anyone under the influence of alcohol or drugs.",
        "All patrons will be neatly groomed, no revealing clothes, clothes should be neat and clean.",
        "All inline and quad skates must be clean and in good repair. NO MISSING WHEELS OR SHARP EDGES!",
        "Fast, reckless, tag playing, or skating in an unsafe manner that may jeopardize the safety of others will not be permitted.",
        "No sitting on railings, walls, tables or counters.",
        "All persons renting skates must wear socks (Socks may be purchased for $4).",
        "When skate session is over, tuck laces inside the rental skates and return them to the skate room.",
        "All shoes, coats, purses, and personal belongings must be placed in a locker or unlocked wall locker. Items may not be kept at snack bar tables. Treasure Valley Skate is not responsible for any lost or stolen items.",
        "All food and drink are to be kept in the snack bar area.",
        "Parents may be spectators only. Everyone else entering the building must pay admission.",
        "Management reserves the right to inspect lockers, skate cases, backpacks, or similar items when entering, while in the building, or leaving the building.",
        "Please report all accidents to management.",
        "Patrons must follow all posted and verbal rules and instructions.",
        "Parents will be held responsible for the actions of their children.",
        "Management reserves the right to refuse entrance to anyone for any reason.",
        "All persons entering the building assume all risk regarding accidents and injury.",
        "Patrons will conduct themselves at all times as ladies and gentlemen."
      ]
    };
  }
};
</script>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 300px;
  background: url("../assets/main_bg.jpg") no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: 3rem;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

/* Tabs Navigation */
.tabs {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.tabs button {
  background: #ddd;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.tabs button.active {
  background: #ff4500;
  color: white;
}

/* Tab Content */
.tab-content {
  max-width: 900px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

/* Info Sections */
.info-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.info-box {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 280px;
}

.info-box h3 {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

/* Rules List */
.rules-list {
  text-align: left;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: auto;
}

.rules-list li {
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.4;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .info-box {
    width: 100%;
  }

  .rules-list {
    padding: 15px;
  }
}
</style>
