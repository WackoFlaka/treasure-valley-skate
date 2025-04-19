const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authenticateToken = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const YOUR_DOMAIN = 'http://localhost:8080';

router.use(bodyParser.raw({ type: 'application/json' }));

router.get('/reservations', authenticateToken, (req, res) => {
  res.json({ message: 'Protected content for admins only.' });
});

// GET all reservations
router.get('/', async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

// POST new reservation
router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.status(201).json(reservation);
});

// PUT update reservation
router.put('/:id', async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// STRIPE CHECKOUT SESSION
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { reservation } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: reservation.package
            },
            unit_amount: reservation.payment === 'Deposit' ? 5000 : getFullAmount(reservation.package)
          },
          quantity: 1
        }
      ],
      success_url: `${YOUR_DOMAIN}/#/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/#/cancel`,
      metadata: reservation
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Something went wrong creating checkout session' });
  }
});


// STRIPE WEBHOOK
router.post('/webhook', async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const data = session.metadata;

    const reservation = new Reservation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      timeSlot: data.timeSlot,
      foodChoice: data.foodChoice,
      package: data.package,
      payment: data.payment,
      birthdayName: data.birthdayName,
      birthdayAge: data.birthdayAge,
      downloaded: false
    });

    await reservation.save();
    await sendReceiptEmail(data.email, reservation);
  }

  res.json({ received: true });
});

async function sendReceiptEmail(to, reservation) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const html = `
    <h2>Thank you for booking with Treasure Valley Skate!</h2>
    <p><strong>Name:</strong> ${reservation.name}</p>
    <p><strong>Package:</strong> ${reservation.package}</p>
    <p><strong>Date:</strong> ${reservation.date}</p>
    <p><strong>Time:</strong> ${reservation.timeSlot}</p>
    <p><strong>Food:</strong> ${reservation.foodChoice}</p>
    <p><strong>Birthday Person:</strong> ${reservation.birthdayName} (Age ${reservation.birthdayAge})</p>
    <p><strong>Payment Option:</strong> ${reservation.payment}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: '🎉 Your Party Reservation Receipt - Treasure Valley Skate',
    html
  });
}

function getFullAmount(packageName) {
  switch (packageName) {
    case 'Mini Skater (Basic)': return 23500;
    case 'Glow Bash (Super)': return 40000;
    case 'Ultimate (Grande)': return 50000;
    default: return 0;
  }
}

module.exports = router;
