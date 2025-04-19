const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  package: String,
  date: String,
  timeSlot: String,
  name: String,
  phone: String,
  email: String,
  birthdayName: String,
  birthdayAge: Number,
  foodChoice: String,
  payment: String,
  downloaded: Boolean
});

module.exports = mongoose.model('Reservation', reservationSchema);
