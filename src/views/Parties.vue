<template>
  <div class="parties">
    <!-- Hero Section with Background Image -->
    <div class="hero">
      <h1 class="title">Celebrate Your Party with Us!</h1>
      <p class="subtitle">Choose the perfect party package for an unforgettable experience.</p>
    </div>

    <!-- Party Packages Section -->
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
                <li v-for="(feature, fIndex) in packageItem.features" :key="fIndex">
                  ✅ {{ feature }}
                </li>
              </ul>
              <button class="btn btn-primary" @click="openBookingForm(packageItem)">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Book a Party - {{ selectedPackage?.name }}</h2>

        <!-- Date Selection -->
        <label for="date">Select a Date:</label>
        <input type="date" id="date" v-model="bookingData.date" @change="updateAvailableTimes">

        <!-- Time Slot Selection -->
        <label for="timeSlot">Select a Time Slot:</label>
        <select id="timeSlot" v-model="bookingData.timeSlot" :disabled="availableTimeSlots.length === 0">
          <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
            {{ slot }} ({{ roomsAvailable[slot] }} rooms left)
          </option>
        </select>

        <!-- User Details -->
        <label>Name:</label>
        <input type="text" v-model="bookingData.name" required>

        <label>Phone:</label>
        <input type="tel" v-model="bookingData.phone" required>

        <label>Email:</label>
        <input type="email" v-model="bookingData.email" required>

        <label>Birthday Person's Name:</label>
        <input type="text" v-model="bookingData.birthdayName" required>

        <label>Birthday Person's Age:</label>
        <input type="number" v-model="bookingData.birthdayAge" required>

        <!-- Food Choice -->
        <label>Food Choice:</label>
        <select v-model="bookingData.foodChoice">
          <option value="Pizza">Pizza</option>
          <option value="Hotdogs">Hotdogs</option>
          <option value="Nachos">Nachos</option>
        </select>

        <!-- Payment Option with Computed Amounts -->        
        <label>Payment:</label>
        <select v-model="bookingData.payment">
          <option v-for="option in paymentOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <button class="btn btn-success" :disabled="roomsAvailable[bookingData.timeSlot] === 0" @click="submitBooking">
          Submit Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      selectedPackage: null,
      bookingData: {
        date: "",
        timeSlot: "",
        name: "",
        phone: "",
        email: "",
        birthdayName: "",
        birthdayAge: "",
        foodChoice: "Pizza",
        payment: "Deposit", // Default, will be replaced by computed options
      },
      availableTimeSlots: [],
      roomsAvailable: {},
      reservations: [],
      partyPackages: [
        {
          name: "Basic Party Package",
          image: require('../assets/arcade.jpg'),
          description: "A simple yet fun skating party for your group.",
          price: "$150",
          deposit: 50,
          fullPayment: 150,
          features: ["2-hour skating session", "Reserved party table", "10 skate rentals"]
        },
        {
          name: "Deluxe Party Package",
          image: require('../assets/arcade.jpg'),
          description: "More fun with extra perks and decorations.",
          price: "$250",
          deposit: 75,
          fullPayment: 250,
          features: ["3-hour skating session", "Decorated party area", "15 skate rentals", "Pizza & drinks included"]
        },
        {
          name: "Ultimate Party Package",
          image: require('../assets/arcade.jpg'),
          description: "The best skating party experience with VIP treatment!",
          price: "$350",
          deposit: 100,
          fullPayment: 350,
          features: ["4-hour skating session", "VIP party room", "20 skate rentals", "Full meal package", "Party host included"]
        }
      ],
      // Available hours for each day
      availableHours: {
        Monday: ["6:00 PM - 8:30 PM"],
        Tuesday: [],
        Wednesday: ["6:00 PM - 8:30 PM"],
        Thursday: ["6:00 PM - 8:30 PM"],
        Friday: ["6:00 PM - 8:30 PM"],
        Saturday: ["1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "6:00 PM - 8:30 PM"],
        Sunday: ["1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"]
      },
      maxRooms: 3,
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
    openBookingForm(packageItem) {
      this.selectedPackage = packageItem;
      this.showModal = true;
      // Reset booking fields
      this.bookingData.date = "";
      this.bookingData.timeSlot = "";
      this.bookingData.name = "";
      this.bookingData.phone = "";
      this.bookingData.email = "";
      this.bookingData.birthdayName = "";
      this.bookingData.birthdayAge = "";
      this.bookingData.foodChoice = "Pizza";
      this.bookingData.payment = "Deposit";
      this.availableTimeSlots = [];
      this.roomsAvailable = {};
      this.loadReservations();
    },
    updateAvailableTimes() {
  if (!this.bookingData.date) return;
  // Append "T00:00:00" to force local time interpretation
  const selectedDate = new Date(this.bookingData.date + "T00:00:00");
  const options = { weekday: "long", timeZone: "America/Boise" };
  const dayOfWeek = selectedDate.toLocaleDateString("en-US", options);
  this.availableTimeSlots = this.availableHours[dayOfWeek] || [];
  this.availableTimeSlots.forEach(slot => {
    this.roomsAvailable[slot] = this.maxRooms - this.countBookedRooms(this.bookingData.date, slot);
  });
},
    countBookedRooms(date, timeSlot) {
      return this.reservations.filter(res => res.date === date && res.timeSlot === timeSlot).length;
    },
    submitBooking() {
      if (!this.bookingData.date || !this.bookingData.timeSlot || this.roomsAvailable[this.bookingData.timeSlot] === 0) {
        alert("Please select a valid and available time slot.");
        return;
      }
      const reservation = {
        ...this.bookingData,
        package: this.selectedPackage.name
      };
      this.reservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
      alert("Reservation submitted! The admin will confirm soon.");
      this.showModal = false;
    },
    loadReservations() {
      const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
      this.reservations = savedReservations;
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
