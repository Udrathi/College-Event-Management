// src/services/paymentService.ts
// Uses relative URLs — works with Vercel Serverless Functions (api/ folder)
// No backend URL needed, no localhost, works in production automatically
 
export const createOrder = async (amount: number, eventId: string) => {
  const res = await fetch(`/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, eventId }),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json(); // { orderId, amount }
};
 
export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const res = await fetch(`/api/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  if (!res.ok) throw new Error('Payment verification failed');
  return res.json(); // { success: true }
};
 