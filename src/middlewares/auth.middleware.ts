import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string;
  apiKey?: string;
  apiKeyUser?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Check for API key first
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  
  if (apiKey) {
    const validApiKey = process.env.API_KEY;
    
    if (!validApiKey) {
      res.status(500).json({ message: "API key not configured on server" });
      return;
    }

    if (apiKey === validApiKey) {
      req.apiKey = apiKey as string;
      req.apiKeyUser = 'api-user';
      req.user = 'api-user'; // Set user for compatibility
      next();
      return;
    }
  }

  // Fall back to JWT token authentication
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized - JWT token or API key required" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
    return;
  }
};

// JWT-only authentication (for endpoints that require user login)
export const requireJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "JWT token required" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
    return;
  }
};

// API key-only authentication (for external integrations)
export const requireApiKey = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  
  if (!apiKey) {
    res.status(401).json({ message: "API key required" });
    return;
  }

  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    res.status(500).json({ message: "API key not configured on server" });
    return;
  }

  if (apiKey !== validApiKey) {
    res.status(401).json({ message: "Invalid API key" });
    return;
  }

  req.apiKey = apiKey as string;
  req.apiKeyUser = 'api-user';
  req.user = 'api-user';
  next();
};
