import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Parties from '../views/Parties.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import Lessons from '../views/Lessons.vue';
import ImageGallery from '../views/ImageGallery.vue';
import Schedule from '../views/Schedule.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/parties', component: Parties },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/lessons', component: Lessons },
  { path: '/imagegallery', component: ImageGallery },
  { path: '/schedule', component: Schedule }
];

const router = createRouter({
  history: createWebHashHistory(), // ✅ Must use hash mode for GitHub Pages
  routes
});

export default router;
