<template>
  <div class="parties">
    <div class="hero">
      <h1 class="title">Celebrate Your Party with Us!</h1>
      <p class="subtitle">Choose the perfect party package for an unforgettable experience.</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="(packageItem, index) in partyPackages" :key="index">
          <div class="card party-card">
            <img :src="packageItem.image" class="card-img-top" :alt="packageItem.name">
            <div class="card-body">
              <h3 class="card-title">{{ packageItem.name }}</h3>
              <p class="card-text">{{ packageItem.description }}</p>
              <h4 class="price">{{ packageItem.price }}</h4>
              <ul>
                <li v-for="(feature, fIndex) in packageItem.features" :key="fIndex">✅ {{ feature }}</li>
              </ul>
              <button class="btn btn-primary" @click="openBookingForm(packageItem)">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Book a Party - {{ selectedPackage?.name }}</h2>

        <label>Select a Date:</label>
        <input type="date" v-model="bookingData.date" @change="updateAvailableTimes">

        <label>Select a Time Slot:</label>
        <select v-model="bookingData.timeSlot">
          <option v-for="slot in availableTimeSlots" :key="slot" :value="roomsAvailable[slot] === 0 ? '' : slot" :disabled="roomsAvailable[slot] === 0">
            {{ slot }} - {{ roomsAvailable[slot] === 0 ? 'Fully Booked' : roomsAvailable[slot] + ' rooms left' }}
          </option>
        </select>

        <label>Name:</label>
        <input v-model="bookingData.name" type="text" required>

        <label>Phone:</label>
        <input v-model="bookingData.phone" type="tel" required>

        <label>Email:</label>
        <input v-model="bookingData.email" type="email" required>

        <label>Birthday Person's Name:</label>
        <input v-model="bookingData.birthdayName" type="text">

        <label>Birthday Person's Age:</label>
        <input v-model="bookingData.birthdayAge" type="number">

        <label>Food Choice:</label>
        <select v-model="bookingData.foodChoice">
          <option value="Pizza">Pizza</option>
          <option value="Hotdogs">Hotdogs</option>
          <option value="Nachos">Nachos</option>
        </select>

        <label>Payment:</label>
        <select v-model="bookingData.payment">
          <option v-for="option in paymentOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <button class="btn btn-success" :disabled="roomsAvailable[bookingData.timeSlot] === 0 || !bookingData.timeSlot" @click="submitBooking">
          Submit Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      showModal: false,
      selectedPackage: null,
      reservations: [],
      bookingData: {
        date: '',
        timeSlot: '',
        name: '',
        phone: '',
        email: '',
        birthdayName: '',
        birthdayAge: '',
        foodChoice: 'Pizza',
        payment: 'Deposit'
      },
      availableTimeSlots: [],
      roomsAvailable: {},
      partyPackages: [
        {
          name: "Mini Skater (Basic)",
          image: require('../assets/arcade.jpg'),
          description: "A perfect intro party for your young skaters!",
          price: "$235",
          deposit: 50,
          fullPayment: 235,
          features: [
            "10 Admission + Rentals",
            "Basic Decorations",
            "Choose one main dish (pizza, hotdogs, or nachos)",
            "Ice Cream Cups",
            "Bring your own cake & Balloons (optional)",
            "80 minutes for room"
          ]
        },
        {
          name: "Glow Bash (Super)",
          image: require('../assets/arcade.jpg'),
          description: "A glowing party experience with extras for everyone!",
          price: "$400",
          deposit: 50,
          fullPayment: 400,
          features: [
            "20 Admission + Rentals",
            "Glow Bracelets",
            "Choose one main dish (pizza, hotdogs, or nachos)",
            "Ice Cream Cups",
            "Bring your own cake & Balloons (optional)",
            "Upgraded Decorations",
            "80 minutes for room"
          ]
        },
        {
          name: "Ultimate (Grande)",
          image: require('../assets/arcade.jpg'),
          description: "Our most premium party experience with all the fun included.",
          price: "$500",
          deposit: 50,
          fullPayment: 500,
          features: [
            "30 Admission + Rentals",
            "Glow Toys for all",
            "Choose one main dish (pizza, hotdogs, or nachos)",
            "Ice Cream Cups",
            "Bring your own cake & Balloons (optional)",
            "80 minutes for room"
          ]
        }
      ],
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
    paymentOptions() {
      if (!this.selectedPackage) return [];
      return [
        { label: `Deposit ($${this.selectedPackage.deposit})`, value: "Deposit" },
        { label: `Full Amount ($${this.selectedPackage.fullPayment})`, value: "Full Amount" }
      ];
    }
  },
  methods: {
    async loadReservations() {
      const res = await api.getReservations();
      this.reservations = res.data;
    },
    openBookingForm(packageItem) {
      this.selectedPackage = packageItem;
      this.showModal = true;
      this.bookingData = {
        date: '', timeSlot: '', name: '', phone: '', email: '',
        birthdayName: '', birthdayAge: '', foodChoice: 'Pizza', payment: 'Deposit'
      };
    },
    updateAvailableTimes() {
      const selectedDate = new Date(this.bookingData.date + 'T00:00:00');
      const day = selectedDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Boise' });
      this.availableTimeSlots = this.availableHours[day] || [];

      // reset room availability
      this.roomsAvailable = {};
      this.availableTimeSlots.forEach(slot => {
        const count = this.reservations.filter(r => r.date === this.bookingData.date && r.timeSlot === slot).length;
        this.roomsAvailable[slot] = Math.max(0, this.maxRooms - count);
      });
    },
    async submitBooking() {
  const reservation = {
    ...this.bookingData,
    package: this.selectedPackage.name,
    downloaded: false
  };

  try {
    const res = await api.createCheckoutSession({ reservation });
    if (res.data && res.data.url) {
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } else {
      alert('Something went wrong creating the checkout session.');
    }
  } catch (err) {
    console.error('Stripe error:', err);
    alert('Payment could not be processed.');
  }
}
  },
  created() {
    this.loadReservations();
  }
};
</script>

<style scoped>
/* Hero Section with Background Image */
.hero {
  background: url('../assets/main_bg.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;
  padding: 100px 20px;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.title {
  font-size: 3rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 10px;
}

/* Party Packages Section */
.container {
  padding: 50px 20px;
}

.party-card {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-bottom: 30px;
}

.party-card:hover {
  transform: scale(1.05);
}

.party-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 10px;
}

.price {
  font-size: 1.5rem;
  color: #ff4500;
  font-weight: bold;
  margin: 10px 0;
}

.party-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 10px;
}

.party-card li {
  font-size: 1rem;
  margin-bottom: 5px;
}

.btn {
  width: 100%;
  margin-top: 15px;
}

/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
}

.error-message {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>
