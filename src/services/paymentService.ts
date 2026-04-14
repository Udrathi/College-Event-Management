// src/services/paymentService.ts

export const createOrder = async (amount: number, eventId: string) => {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, eventId }),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const res = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  if (!res.ok) throw new Error('Payment verification failed');
  return res.json();
};