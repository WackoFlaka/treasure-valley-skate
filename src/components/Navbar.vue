<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-relative">
    <div class="container position-relative">
      <router-link class="navbar-brand logo-container" to="/">
        <img src="../assets/logo.png" alt="Treasure Valley Skate" class="logo" />
      </router-link>

      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-lg-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/parties">Parties</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/schedule">Schedule/Prices</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/lessons">Skating Lessons</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/contact">Contact</router-link></li>
          <li class="nav-item" v-if="isLoggedIn">
    <router-link class="nav-link" to="/admin">Admin</router-link>
  </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <button class="btn btn-outline-light ms-3" @click="showLogin = true">Login</button>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-warning ms-1" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div v-if="showLogin" class="login-modal">
    <div class="login-box">
      <span class="close" @click="showLogin = false">&times;</span>
      <h4 class="text-center mb-3">Admin Login</h4>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Username" class="form-control mb-2" required />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" required />
        <button type="submit" class="btn btn-success w-100">Login</button>
        <p class="text-danger mt-2 text-center" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      showLogin: false,
      username: '',
      password: '',
      error: '',
      isLoggedIn: false,
      loggedInUser: ''
    };
  },
  methods: {
    async handleLogin() {
  console.log("Submitting login..."); // 🧪 Check this appears in browser console

  try {
    const res = await api.login({
      username: this.username,
      password: this.password
    });

    console.log("Login successful:", res); // 🧪 Should show the response

    this.showLogin = false;
    this.isLoggedIn = true;

    const user = res.data.username || 'Admin';
    window.dispatchEvent(new CustomEvent('start-login-fade', {
      detail: { username: user }
    }));

    window.dispatchEvent(new Event('auth-changed'));
    this.$router.push('/admin');

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 🧪 This will show if something fails
    this.error = 'Invalid username or password.';
  }
}
,
    async logout() {
      await api.logout();
      this.isLoggedIn = false;
      this.loggedInUser = '';
      window.dispatchEvent(new Event('auth-changed'));
      this.$router.push('/');
    },
    async checkSession() {
      try {
        const res = await api.checkAuth();
        this.isLoggedIn = res.data.loggedIn;
        this.loggedInUser = res.data.username;
      } catch {
        this.isLoggedIn = false;
        this.loggedInUser = '';
      }
    }
  },
  mounted() {
    this.checkSession();
    window.addEventListener('auth-changed', this.checkSession);
  },
  beforeUnmount() {
    window.removeEventListener('auth-changed', this.checkSession);
  }
};
</script>

<style scoped>
.logo-container {
  position: absolute;
  top: -30px;
  left: 0;
  z-index: 1000;
}

.logo {
  height: 120px;
  width: auto;
  position: relative;
  z-index: 1001;
}

nav {
  border-bottom: 2px solid greenyellow;
}

@media (min-width: 992px) {
  .navbar-nav {
    margin-left: auto;
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    text-align: left;
    padding-top: 80px;
  }
  .logo {
    height: 100px;
  }
  .logo-container {
    top: -20px;
  }
}

.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
}
</style>