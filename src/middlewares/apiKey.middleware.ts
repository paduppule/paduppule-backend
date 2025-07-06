import { Request, Response, NextFunction } from "express";

interface ApiKeyRequest extends Request {
  apiKey?: string;
  apiKeyUser?: string;
}

export const validateApiKey = (req: ApiKeyRequest, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  
  if (!apiKey) {
    res.status(401).json({ message: "API key required" });
    return;
  }

  // Get the API key from environment variables
  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    res.status(500).json({ message: "API key not configured on server" });
    return;
  }

  if (apiKey !== validApiKey) {
    res.status(401).json({ message: "Invalid API key" });
    return;
  }

  // Set API key info in request for potential use
  req.apiKey = apiKey as string;
  req.apiKeyUser = 'api-user'; // You can customize this or get from a database
  
  next();
};

// Optional: Rate limiting for API key requests
export const apiKeyRateLimit = (req: Request, res: Response, next: NextFunction): void => {
  // Basic rate limiting - you can implement more sophisticated rate limiting here
  // For now, just pass through
  next();
}; 