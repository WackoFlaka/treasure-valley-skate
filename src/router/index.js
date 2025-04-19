import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Parties from '../views/Parties.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import Lessons from '../views/Lessons.vue';
import ImageGallery from '../views/ImageGallery.vue';
import Schedule from '../views/Schedule.vue';
import Admin from '@/views/Admin.vue';
import Success from '@/views/Success.vue';
import Cancel from '@/views/Cancel.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/parties', component: Parties },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/lessons', component: Lessons },
  { path: '/imagegallery', component: ImageGallery },
  { path: '/schedule', component: Schedule },
  { path: '/admin', component: Admin },
  { path: '/success', name: 'Success', component: Success },
  { path: '/cancel', name: 'Cancel', component: Cancel },
  { path: '/:catchAll(.*)', redirect: '/' }, // ✅ Proper 404 redirect fix
  {
    path: '/admin',
    component: Admin,
    beforeEnter: async (to, from, next) => {
      try {
        const res = await fetch('http://localhost:3000/api/reservations', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.status === 200) {
          next(); // ✅ token valid
        } else {
          next('/'); // 🚫 send to home or login
        }
      } catch {
        next('/');
      }
    }
  }

];

const router = createRouter({
  history: createWebHashHistory(), // ✅ Must use hash mode for GitHub Pages
  routes
});

export default router;
