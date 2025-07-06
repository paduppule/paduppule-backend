const crypto = require('crypto');

function generateApiKey(prefix = 'padup') {
  const randomPart = crypto.randomBytes(24).toString('hex');
  return `${prefix}_${randomPart}`;
}

function generateSimpleApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Generate different types of API keys
console.log('=== API Key Generator ===\n');

console.log('1. Simple API Key (64 characters):');
console.log(generateSimpleApiKey());
console.log();

console.log('2. Prefixed API Key (padup_):');
console.log(generateApiKey('padup'));
console.log();

console.log('3. Custom Prefixed API Key (test_):');
console.log(generateApiKey('test'));
console.log();

console.log('=== Instructions ===');
console.log('1. Copy one of the generated keys above');
console.log('2. Add it to your .env file: API_KEY=your_generated_key');
console.log('3. Use it in requests with header: x-api-key: your_generated_key');
console.log('4. Keep this key secure and don\'t share it publicly');
console.log();

console.log('=== Example Usage ===');
console.log('curl -H "x-api-key: your_generated_key" http://localhost:4000/api/admin/system-info'); 