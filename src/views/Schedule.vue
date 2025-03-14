<template>
  <div class="schedule">
    <h1 class="title">Skating Schedule & Admission Prices</h1>
    <p class="subtitle">Check our schedule and pricing details below.</p>

    <!-- Full-Width Skating Schedule -->
    <div class="full-width-section">
      <h2>Weekly Skating Schedule</h2>
      <table>
        <tr v-for="(details, day) in schedule" :key="day">
          <td><strong>{{ day }}</strong></td>
          <td>
            <ul>
              <li v-for="(session, index) in details" :key="index">
                {{ session.time }} - {{ session.price }}
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <!-- Grid Layout for Pricing & Spring Break -->
    <div class="grid-container">
      <div class="grid-item">
        <h2>Admission Prices</h2>
        <ul>
          <li><strong>All Veterans & Seniors (55+):</strong> $10 Admission, $4 Skate Rental</li>
          <li><strong>Home School Skate:</strong> $5 Admission (includes skate rental)</li>
          <li><strong>Roll-over Charge:</strong> $5 to skate into the next session</li>
          <li><strong>Group Rates (20+ People):</strong> $8 Admission, $4 Skate Rentals per person (must be pre-arranged)</li>
        </ul>
        <p>For private events, please call <strong>208-342-1842</strong> to set up your event.</p>
      </div>

      <div class="grid-item">
        <h2>Spring Break Skating</h2>
        <p><strong>Time:</strong> 1PM - 4PM</p>
        <p><strong>Admission:</strong> $7</p>
        <p><strong>Skate Rentals:</strong> $4</p>
        <p>Enjoy special skating hours during Spring Break at a discounted rate!</p>
      </div>
    </div>

    <!-- Enlarged Google Calendar -->
    <div class="calendar-container">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FDenver&showPrint=0&showNav=0&showTabs=0&showCalendars=0&showTz=0&src=amNoYXY1NjAxQGdtYWlsLmNvbQ&color=%23039BE5"
        class="full-calendar"
        frameborder="0"
        scrolling="no">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedule: {
        Monday: [{ time: "6PM - 8:30PM", price: "$12 Admission / $4 Skate Rentals" }],
        Tuesday: [{ time: "Closed", price: "-" }],
        Wednesday: [
          { time: "6PM - 8:30PM", price: "$12 Admission / $4 Skate Rentals" },
          { time: "8:30PM - 10:30PM", price: "$13 Admission / $4 Skate Rentals" }
        ],
        Thursday: [{ time: "6PM - 8:30PM", price: "$12 Admission / $4 Skate Rentals" }],
        Friday: [{ time: "6PM - 8:30PM", price: "$12 Admission / $4 Skate Rentals" }],
        Saturday: [
          { time: "12PM - 1PM", price: '"Skate Lessons" $15 Drop-in Class' },
          { time: "1PM - 3PM", price: "$12 Admission / $4 Skate Rentals" },
          { time: "3PM - 5PM", price: "$12 Admission / $4 Skate Rentals" },
          { time: "6PM - 8:30PM", price: "$12 Admission / $4 Skate Rentals" }
        ],
        Sunday: [
          { time: "1PM - 3PM", price: "$12 Admission / $4 Skate Rentals" },
          { time: "3PM - 5PM", price: "$12 Admission / $4 Skate Rentals" }
        ]
      }
    };
  }
};
</script>

<style scoped>
/* General Styles */
.schedule {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Full-Width Skating Schedule */
.full-width-section {
  max-width: 1000px;
  margin: 0 auto 30px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 10px;
  border: 1px solid #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 1rem;
  margin-bottom: 5px;
}

/* Grid Layout for Pricing & Spring Break */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: auto;
}

.grid-item {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Enlarged Google Calendar */
.calendar-container {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.full-calendar {
  width: 95%;
  height: 700px;
  max-width: 1200px;
  border-radius: 8px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .full-width-section {
    width: 95%;
    margin: 0 auto 20px;
  }

  .full-calendar {
    width: 100%;
    height: 500px;
  }
}
</style>
