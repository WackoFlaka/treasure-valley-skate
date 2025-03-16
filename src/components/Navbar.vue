<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-relative">
    <div class="container position-relative">
      <!-- Logo on the Left (Overlapping Effect) -->
      <router-link class="navbar-brand logo-container" to="/">
        <img src="../assets/logo.png" alt="Treasure Valley Skate" class="logo">
      </router-link>

      <!-- Mobile Toggle Button on the Right -->
      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Menu -->
      <div class="collapse navbar-collapse justify-content-lg-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
      <!--<li class="nav-item"><router-link class="nav-link" to="/parties">Parties</router-link></li> -->
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/schedule">Schedule/Prices</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/lessons">Skating Lessons</router-link></li>
       <!--   <li class="nav-item"><router-link class="nav-link" to="/imagegallery">Image Gallery</router-link></li> -->
          <li class="nav-item"><router-link class="nav-link" to="/contact">Contact</router-link></li>
       <!--   <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Make Logo Larger & Overlapping */
.logo-container {
  position: absolute;
  top: -30px;
  /* Moves the logo upwards */
  left: 0;
  z-index: 1000;
  /* Ensures it stays on top */
}

.logo {
  height: 120px;
  /* Make logo bigger */
  width: auto;
  position: relative;
  z-index: 1001;
  /* Higher than background */
}

nav {
  border-bottom: 2px solid greenyellow;
}

/* Desktop - Align Navbar Items to the Right */
@media (min-width: 992px) {

  .navbar-nav {
    margin-left: auto;
    /* Push menu items to the right */
  }
}

/* Mobile - Ensure Menu Stays Left-Aligned */
@media (max-width: 991px) {
  .navbar-collapse {
    text-align: left;
    padding-top: 80px;
    /* Align menu items to the left */
  }

  .logo {
    height: 100px;
    /* Slightly smaller logo for mobile */
  }

  .logo-container {
    top: -20px;
    /* Adjust overlap for smaller screens */
  }
}
</style>
