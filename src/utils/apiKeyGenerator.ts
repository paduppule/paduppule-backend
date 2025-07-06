import crypto from 'crypto';

export const generateApiKey = (): string => {
  // Generate a secure random API key
  return crypto.randomBytes(32).toString('hex');
};

export const generateApiKeyWithPrefix = (prefix: string = 'padup'): string => {
  // Generate API key with a prefix for easier identification
  const randomPart = crypto.randomBytes(24).toString('hex');
  return `${prefix}_${randomPart}`;
};

export const validateApiKeyFormat = (apiKey: string): boolean => {
  // Basic validation for API key format
  // You can customize this based on your requirements
  return apiKey.length >= 32 && /^[a-zA-Z0-9_-]+$/.test(apiKey);
}; 