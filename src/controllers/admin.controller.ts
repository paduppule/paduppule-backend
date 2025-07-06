import { Request, Response } from "express";
import { generateApiKey, generateApiKeyWithPrefix } from "../utils/apiKeyGenerator";

export const generateNewApiKey = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prefix } = req.body;
    
    let apiKey: string;
    if (prefix) {
      apiKey = generateApiKeyWithPrefix(prefix);
    } else {
      apiKey = generateApiKey();
    }

    res.json({
      message: "API key generated successfully",
      apiKey,
      instructions: [
        "Add this API key to your .env file as API_KEY=your_generated_key",
        "Use this key in requests with header: x-api-key: your_generated_key",
        "Keep this key secure and don't share it publicly"
      ]
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate API key", error: err });
  }
};

export const getSystemInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      apiKeyConfigured: !!process.env.API_KEY,
      jwtConfigured: !!process.env.JWT_SECRET,
      paystackConfigured: !!process.env.PAYSTACK_SECRET_KEY
    };

    res.json({
      message: "System information retrieved",
      systemInfo
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get system info", error: err });
  }
}; 