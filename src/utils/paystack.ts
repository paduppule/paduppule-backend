import axios from "axios";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE = "https://api.paystack.co";

export const initializeTransaction = async (email: string, amount: number, metadata: object) => {
  const response = await axios.post(`${PAYSTACK_BASE}/transaction/initialize`, {
    email,
    amount: amount * 100, // Paystack uses kobo
    metadata
  }, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json"
    }
  });

  return response.data.data; // contains `authorization_url`, `reference`, etc.
};

export const verifyTransaction = async (reference: string) => {
  const response = await axios.get(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json"
    }
  });

  return response.data.data;
};
