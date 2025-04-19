const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb+srv://Wacko:Joaquin80@cluster0.vweqi8h.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('jC2011105602', 10);
  const user = new User({
    username: 'Wacko',
    password: hashedPassword
  });
  await user.save();
  console.log('Admin user created!');
  mongoose.disconnect();
};

createAdmin();
