<template>
  <div class="lessons-page">
    <!-- Hero Section -->
    <div class="hero">
      <video autoplay loop muted playsinline class="hero-video">
        <source src="../assets/skatinglessons.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="hero-overlay">
        <h1 class="hero-title">Skating Lessons</h1>
      </div>
    </div>

    <!-- Lesson Details -->
    <div class="lesson-info container">
      <h2>Learn to Skate with Us!</h2>
      <p>Join our skating lessons to improve your skills and have fun on the rink!</p>
      <div class="lesson-details">
        <p><strong>Price:</strong> $15 for the class</p>
        <p><strong>Time:</strong> Every Saturday from 12PM - 1PM</p>
        <p><strong>Who can join?</strong> All skill levels are welcome!</p>
      </div>
    </div>

    <!-- Skating Techniques & Safety Tips -->
    <div class="techniques-section container">
      <h2>Skating Techniques & Safety Tips</h2>

      <div class="technique">
        <h3>Skate Without Falling</h3>
        <p>Bend your knees so that when you look down at your toes, your knees hide your view of them. This lowers your center of gravity for better balance.</p>
        <p>If you lose balance, stretch your palms forward and land on your wrist guards first, then your knee pads, and finally your elbow pads. These guards help you slide and minimize impact.</p>
        <p>Start skating on a level, smooth surface like a roller rink or an empty parking lot.</p>
      </div>

      <div class="technique">
        <h3>Skate Posture</h3>
        <p>Skating requires a low body position for maximum balance: knees bent, shoulders slightly forward, and hands low and in front.</p>
      </div>

      <div class="technique">
        <h3>Let's Go!</h3>
        <p>Start skating by walking like a duck—heels together and toes pointing outward in a V-shape. Take small steps until you gain balance, then transition into gliding.</p>
        <p>Push from your heels to move forward and avoid putting pressure on your toes, as that will cause you to go backward.</p>
      </div>

      <div class="technique">
        <h3>Stopping Techniques</h3>
        <p>Different stopping techniques help you maintain control:</p>
        <ul>
          <li><strong>Heel Brake:</strong> Glide forward, roll your right skate slightly ahead, and push down hard on the heel brake to stop.</li>
          <li><strong>T-Stop:</strong> Glide on one leg while dragging the other skate perpendicularly behind you, acting as a brake.</li>
          <li><strong>V-Stop:</strong> Form a 'V' shape with both skates pointing inward, applying pressure to slow down.</li>
        </ul>
      </div>

      <div class="technique">
        <h3>Skating Backwards</h3>
        <p>To learn backward skating, shift your weight, push off from your toes, and maintain balance. Practice consistently to master this technique.</p>
      </div>

      <div class="technique">
        <h3>Practice</h3>
        <p>Skating lessons are just 2% of learning—the rest is all about practice!</p>
      </div>

      <div class="technique">
        <h3>Choosing Skates (Inline vs. Quad Skates)</h3>
        <p>The type of skate depends on your skating goals:</p>
        <ul>
          <li><strong>Inline Skates:</strong> Best for speed and outdoor skating, designed for straight-line movement.</li>
          <li><strong>Quad Skates:</strong> More stable, ideal for rink skating and maneuverability.</li>
        </ul>
      </div>

      <div class="technique">
        <h3>Roller Skates Overview</h3>
        <p>Also known as quad skates, these are great for general skating sessions. They offer stability and comfort, making them the preferred choice in roller rinks.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 50vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

/* Lesson Info */
.lesson-info {
  text-align: center;
  padding: 40px 20px;
}

.lesson-details {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: inline-block;
  text-align: left;
  margin-top: 20px;
}

.lesson-details p {
  font-size: 1.2rem;
  margin: 10px 0;
}

/* Skating Techniques Section */
.techniques-section {
  padding: 50px 20px;
  text-align: left;
}

.techniques-section h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 20px;
}

.technique {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.technique h3 {
  font-size: 1.5rem;
  color: #ff6600;
}

.technique p,
.technique ul {
  font-size: 1.2rem;
}

.technique ul {
  padding-left: 20px;
}

.technique ul li {
  margin-bottom: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .lesson-details, .technique {
    width: 100%;
  }
}
</style>
