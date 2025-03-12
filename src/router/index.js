import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Parties from '../views/Parties.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/parties', component: Parties },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
