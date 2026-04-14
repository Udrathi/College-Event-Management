const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, eventId } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `event_${eventId}_${Date.now()}`,
    });
    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
}