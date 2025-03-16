<template>
  <footer class="footer">
    <div class="container">
      <p class="trademark">© 2025 Treasure Valley Skate. All rights reserved.</p>
      <div class="social-links">
        <a href="https://www.instagram.com/skate.treasurevalley/" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/treasurevalleyskate/" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #222;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.trademark {
  margin-bottom: 10px;
  font-size: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-links a {
  font-size: 24px;
  color: white;
  transition: color 0.3s ease-in-out;
}

.social-links a:hover {
  color: #ff6600;
}
</style>
