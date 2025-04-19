import axios from 'axios';

console.log('BASE URL:', process.env.VUE_APP_API_BASE_URL); // 👈 TEMP debug log

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`,
  withCredentials: true
});

export default {
  getReservations() {
    return api.get('/reservations');
  },
  createReservation(data) {
    return api.post('/reservations', data);
  },
  updateReservation(id, data) {
    return api.put(`/reservations/${id}`, data);
  },
  deleteReservation(id) {
    return api.delete(`/reservations/${id}`);
  },
  login(credentials) {
    return api.post('/login', credentials);
  },
  logout() {
    return api.post('/logout');
  },
  checkAuth() {
    return api.get('/check-auth');
  },
  createUser(data) {
    return api.post('/users', data);
  },
  getUsers() {
    return api.get('/users');
  },
  createCheckoutSession(data) {
    return api.post('/reservations/create-checkout-session', data);
  }
};
