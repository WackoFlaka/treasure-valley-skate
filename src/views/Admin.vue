<template>
  <div v-show="showIntro" :class="['install-overlay', { 'fade-out': introDone }]">
    <div class="install-inner">
      <h1 class="install-text">Welcome {{ username }}</h1>
      <div class="install-circle"></div>
    </div>
  </div>

  <div class="admin-page" :class="{ 'page-blurred': showIntro }">
    <div class="admin-tabs nav-pills">
      <button @click="currentTab = 'bookings'" :class="{ active: currentTab === 'bookings' }">
        <i class="fas fa-calendar-alt"></i> Bookings
      </button>
      <button @click="currentTab = 'createUser'" :class="{ active: currentTab === 'createUser' }">
        <i class="fas fa-user-plus"></i> Create User
      </button>
      <button @click="currentTab = 'listUsers'" :class="{ active: currentTab === 'listUsers' }">
        <i class="fas fa-users"></i> Admin Users
      </button>
      <button @click="currentTab = 'analytics'" :class="{ active: currentTab === 'analytics' }">
        <i class="fas fa-chart-bar"></i> Analytics
      </button>
      <!-- New Upcoming Parties Tab -->
      <button @click="currentTab = 'upcoming'" :class="{ active: currentTab === 'upcoming' }">
        <i class="fas fa-calendar-check"></i> Upcoming Parties
      </button>
    </div>

    <!-- Bookings Tab -->
    <div v-if="currentTab === 'bookings'" class="bookings-table">
      <h2>Party Bookings</h2>
      <button @click="showAdminBooking = !showAdminBooking" class="admin-tabs-button">
        <i class="fas fa-plus-circle"></i> {{ showAdminBooking ? 'Cancel' : 'Book a Party' }}
      </button>

      <div v-if="showAdminBooking" class="admin-modal">
        <div class="admin-modal-content">
          <span class="close" @click="showAdminBooking = false">&times;</span>
          <h2>Book a Party</h2>
          <form @submit.prevent="adminBookParty">
            <!-- Form Fields remain unchanged -->
            <label>Date:</label>
            <input type="date" v-model="adminParty.date" @change="checkSlots" required />

            <label>Time Slot:</label>
            <select v-model="adminParty.timeSlot" required>
              <option disabled value="">Select Time Slot</option>
              <option v-for="slot in availableTimeSlots" :key="slot" :disabled="roomsAvailable[slot] === 0" :value="slot">
                {{ slot }} - {{ roomsAvailable[slot] === 0 ? 'Fully Booked' : roomsAvailable[slot] + ' rooms left' }}
              </option>
            </select>

            <label>Package:</label>
            <select v-model="adminParty.package" required>
              <option disabled value="">Select Package</option>
              <option>Mini Skater (Basic)</option>
              <option>Glow Bash (Super)</option>
              <option>Ultimate (Grande)</option>
            </select>

            <label>Food Choice:</label>
            <select v-model="adminParty.foodChoice" required>
              <option disabled value="">Select Food</option>
              <option>Pizza</option>
              <option>Hotdogs</option>
              <option>Nachos</option>
            </select>

            <label>Name:</label>
            <input v-model="adminParty.name" type="text" required />

            <label>Phone:</label>
            <input v-model="adminParty.phone" type="tel" required />

            <label>Email:</label>
            <input v-model="adminParty.email" type="email" required />

            <label>Birthday Person's Name:</label>
            <input v-model="adminParty.birthdayName" type="text" />

            <label>Birthday Person's Age:</label>
            <input v-model="adminParty.birthdayAge" type="number" />

            <div class="remaining-slots">
              <strong v-if="remainingSlots !== null">
                {{ remainingSlots }} spot{{ remainingSlots === 1 ? '' : 's' }} left for this date
              </strong>
            </div>

            <button type="submit" :disabled="remainingSlots === 0">
              <i class="fas fa-save"></i> Submit Reservation
            </button>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Package</th>
            <th>Date</th>
            <th>Time</th>
            <th>Food</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in reservations" :key="booking._id">
            <td>{{ booking.name }}</td>
            <td>{{ booking.package }}</td>
            <td>{{ booking.date }}</td>
            <td>{{ booking.timeSlot }}</td>
            <td>{{ booking.foodChoice }}</td>
            <td>
              <button @click="downloadPDF(booking)"><i class="fas fa-file-pdf"></i></button>
              <button @click="editReservation(booking)"><i class="fas fa-edit"></i></button>
              <button @click="deleteReservation(booking._id)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create User Tab -->
    <div v-if="currentTab === 'createUser'" class="create-user-form">
      <h2>Create New Admin User</h2>
      <form @submit.prevent="createUser">
        <input v-model="newUser.username" type="text" placeholder="Username" required>
        <input v-model="newUser.password" type="password" placeholder="Password" required>
        <button type="submit"><i class="fas fa-user-plus"></i> Create</button>
      </form>
    </div>

    <!-- List Users Tab -->
    <div v-if="currentTab === 'listUsers'" class="admin-user-list">
      <h2>All Admin Users</h2>
      <ul>
        <li v-for="user in adminUsers" :key="user._id">
          <i class="fas fa-user"></i> {{ user.username }}
        </li>
      </ul>
    </div>

    <!-- Analytics Tab with More Metrics -->
    <div v-if="currentTab === 'analytics'" class="analytics-tab">
      <h2>Analytics</h2>
      <p>Total Bookings: {{ reservations.length }}</p>
      <p>Upcoming Parties: {{ upcomingParties.length }}</p>
      <p>Past Parties: {{ pastParties.length }}</p>

      <!-- Optionally you could include analytics by package type -->
      <div>
        <h3>Bookings by Package</h3>
        <ul>
          <li v-for="(count, pkg) in bookingsByPackage" :key="pkg">
            {{ pkg }}: {{ count }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Upcoming Parties Tab -->
    <div v-if="currentTab === 'upcoming'" class="upcoming-parties">
      <h2>Upcoming Parties</h2>
      <!-- You could list as a table or a simple list -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Package</th>
            <th>Date</th>
            <th>Time</th>
            <th>Food</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="party in upcomingParties" :key="party._id">
            <td>{{ party.name }}</td>
            <td>{{ party.package }}</td>
            <td>{{ party.date }}</td>
            <td>{{ party.timeSlot }}</td>
            <td>{{ party.foodChoice }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom-right-glitch">Welcome {{ username }}</div>
  </div>
</template>



<script>
import api from '@/services/api';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      // ... existing data properties ...
      showIntro: true,
      introDone: false,
      username: 'Guest',
      currentTab: 'bookings',
      reservations: [],
      adminUsers: [],
      newUser: {
        username: '',
        password: ''
      },
      showAdminBooking: false,
      editingId: null,
      adminParty: {
        date: '',
        timeSlot: '',
        package: '',
        foodChoice: '',
        name: '',
        phone: '',
        email: '',
        birthdayName: '',
        birthdayAge: ''
      },
      availableTimeSlots: [],
      roomsAvailable: {},
      remainingSlots: null,
      availableHours: {
        Saturday: ["1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "6:00 PM - 8:30 PM"],
        Sunday: ["1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
        Monday: ["6:00 PM - 8:30 PM"],
        Wednesday: ["6:00 PM - 8:30 PM"],
        Thursday: ["6:00 PM - 8:30 PM"],
        Friday: ["6:00 PM - 8:30 PM"],
        Tuesday: []
      },
      maxRooms: 3
    };
  },
  computed: {
    // Filter upcoming parties based on today’s date
    upcomingParties() {
      const today = new Date();
      return this.reservations.filter(reservation => {
        // Create a date object from reservation.date
        const reservationDate = new Date(reservation.date + 'T00:00:00');
        return reservationDate >= today;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    // Similarly, for past parties (if needed)
    pastParties() {
      const today = new Date();
      return this.reservations.filter(reservation => {
        const reservationDate = new Date(reservation.date + 'T00:00:00');
        return reservationDate < today;
      });
    },
    // Example computed property to aggregate bookings by package type
    bookingsByPackage() {
      return this.reservations.reduce((acc, booking) => {
        acc[booking.package] = (acc[booking.package] || 0) + 1;
        return acc;
      }, {});
    }
  },
  methods: {
    async loadReservations() {
      const res = await api.getReservations();
      this.reservations = res.data;
    },
    async loadUsers() {
      const res = await api.getUsers();
      this.adminUsers = res.data;
    },
    async deleteReservation(id) {
      if (confirm('Are you sure you want to delete this reservation?')) {
        await api.deleteReservation(id);
        this.loadReservations();
      }
    },
    async createUser() {
      await api.createUser(this.newUser);
      alert('User created!');
      this.newUser.username = '';
      this.newUser.password = '';
      this.loadUsers();
    },
    checkSlots() {
      if (!this.adminParty.date) return;
      const selectedDate = new Date(this.adminParty.date + 'T00:00:00');
      const day = selectedDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Boise' });
      this.availableTimeSlots = this.availableHours[day] || [];
      this.roomsAvailable = {};
      this.availableTimeSlots.forEach(slot => {
        const count = this.reservations.filter(r => r.date === this.adminParty.date && r.timeSlot === slot).length;
        this.roomsAvailable[slot] = Math.max(0, this.maxRooms - count);
      });
      this.remainingSlots = this.availableTimeSlots.reduce((acc, slot) => acc + this.roomsAvailable[slot], 0);
    },
    async adminBookParty() {
      const payload = {
        ...this.adminParty,
        downloaded: false
      };

      if (this.editingId) {
        await api.updateReservation(this.editingId, payload);
        alert('Reservation updated!');
        this.editingId = null;
      } else {
        if (this.remainingSlots === 0) {
          alert('No more rooms available for this date.');
          return;
        }
        await api.createReservation(payload);
        alert('Reservation submitted!');
      }

      this.showAdminBooking = false;
      this.adminParty = {
        date: '', timeSlot: '', package: '', foodChoice: '', name: '', phone: '', email: '', birthdayName: '', birthdayAge: ''
      };
      this.loadReservations();
    },
    editReservation(booking) {
      this.editingId = booking._id;
      this.adminParty = {
        date: booking.date,
        timeSlot: booking.timeSlot,
        package: booking.package,
        foodChoice: booking.foodChoice,
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        birthdayName: booking.birthdayName,
        birthdayAge: booking.birthdayAge
      };
      this.showAdminBooking = true;
      this.checkSlots();
    },
    downloadPDF(booking) {
      const doc = new jsPDF();
      doc.text(`Reservation Details for ${booking.name}`, 10, 10);
      doc.text(`Package: ${booking.package}`, 10, 20);
      doc.text(`Date: ${booking.date}`, 10, 30);
      doc.text(`Time: ${booking.timeSlot}`, 10, 40);
      doc.text(`Food: ${booking.foodChoice}`, 10, 50);
      doc.save(`reservation-${booking._id}.pdf`);
    },
    async checkAuth() {
      try {
        const res = await api.checkAuth();
        if (res.data && res.data.username) {
          this.username = res.data.username;
        }
      } catch {
        this.username = 'Guest';
      }
    }
  },
  mounted() {
    this.checkAuth();
    this.loadReservations();
    this.loadUsers();
    setTimeout(() => {
      this.introDone = true;
    }, 4500);
    setTimeout(() => {
      this.showIntro = false;
    }, 5500);
  }
};
</script>


<style scoped>
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fadeText {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes winBeat {
  0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50%  { transform: translate(-50%, -50%) scale(1.3); opacity: 0.2; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
}
@keyframes glitchText {
  0%, 100% { text-shadow: 0 0 5px #00ffcc; }
  50% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffcc; }
}

.fade-in {
  animation: fadeText 1.2s ease-in-out;
}

.admin-page {
  background: #111;
  color: #fff;
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
}

.admin-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.admin-tabs button {
  background: #222;
  border: 2px solid #444;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.admin-tabs .active,
.admin-tabs button:hover {
  background-color: #00ff99;
  color: #000;
  font-weight: bold;
}

.bookings-table table {
  width: 100%;
  border-collapse: collapse;
  background: #1c1c1c;
}

.bookings-table th, .bookings-table td {
  padding: 12px;
  border: 1px solid #333;
  text-align: center;
}

button {
  margin: 0 4px;
  padding: 5px 10px;
  cursor: pointer;
  background: #444;
  border: none;
  border-radius: 5px;
  color: #fff;
  transition: background 0.2s ease;
}

button:hover {
  background: #666;
}

.create-user-form,
.admin-user-list {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.create-user-form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  border: none;
  background: #222;
  color: white;
}

.create-user-form button {
  background-color: #00ff99;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
}

.admin-user-list ul {
  list-style: none;
  padding: 0;
}

.admin-user-list li {
  padding: 8px;
  background: #222;
  margin: 6px 0;
  border-radius: 4px;
}

.bottom-right-glitch {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 1rem;
  color: #00ffcc;
  animation: glitchText 1.5s infinite;
}

.install-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: opacity 5s ease;
}

.install-overlay.fade-out {
  opacity: 0;
  pointer-events: none;
}

.install-inner {
  text-align: center;
  color: white;
  animation: slideUp 0.8s ease-in;
}

.install-text {
  font-size: 2.5rem;
  margin-bottom: 30px;
  animation: fadeText 1.2s ease-in-out;
}

.install-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: transparent;
  animation: winBeat 1.4s infinite ease-in-out;
}

.page-blurred {
  filter: blur(3px) brightness(0.3);
  pointer-events: none;
  user-select: none;
  transition: filter 0.5s ease-out;
}

.admin-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.admin-modal-content {
  background: #1c1c1c;
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;
  color: white;
  position: relative;
}

.admin-modal-content label {
  display: block;
  margin: 10px 0 4px;
}

.admin-modal-content input,
.admin-modal-content select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #333;
  color: white;
  margin-bottom: 10px;
}

.admin-modal-content .close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
}

.admin-modal-content button {
  background-color: #00ff99;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.remaining-slots {
  color: #00ffcc;
  margin: 10px 0;
  text-align: center;
}

/* Additional styling for the upcoming parties table */
.upcoming-parties table {
  width: 100%;
  border-collapse: collapse;
  background: #1c1c1c;
  margin-top: 20px;
}

.upcoming-parties th, 
.upcoming-parties td {
  padding: 12px;
  border: 1px solid #333;
  text-align: center;
}
</style>

