const axios = require('axios');
require('dotenv').config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE = "https://api.paystack.co";

async function testPaystackKey() {
  try {
    console.log('Testing Paystack API key...');
    console.log('Secret key:', PAYSTACK_SECRET ? 'Present' : 'Missing');
    
    if (!PAYSTACK_SECRET) {
      console.error('❌ PAYSTACK_SECRET_KEY is not set in .env file');
      return;
    }

    // Test the key by making a simple API call
    const response = await axios.get(`${PAYSTACK_BASE}/transaction/totals`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      }
    });

    console.log('✅ Paystack API key is valid!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Paystack API key test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testPaystackKey(); 