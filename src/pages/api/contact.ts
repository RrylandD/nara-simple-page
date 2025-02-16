import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from "~/env";
import { rateLimit } from '~/lib/rate-limit';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

// Basic input validation
const validateFormData = (data: FormData) => {
  if (!data.name || data.name.length > 100) {
    throw new Error('Name is required and must be less than 100 characters');
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error('Please provide a valid email address');
  }
  if (data.phone && !/^[\d\s-+()]{10,}$/.test(data.phone)) {
    throw new Error('Please provide a valid phone number');
  }
  if (data.message && data.message.length > 1000) {
    throw new Error('Message must be less than 1000 characters');
  }
};

// Sanitize input to prevent XSS
const sanitizeInput = (input: string | undefined): string => {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
};

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Apply rate limiting - 5 requests per minute per IP
    try {
      await limiter.check(res, 5, req.socket.remoteAddress ?? 'anonymous');
    } catch {
      return res.status(429).json({ message: 'Too many requests, please try again later' });
    }

    const formData = req.body as FormData;
    
    // Validate form data
    validateFormData(formData);

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: formData.phone ? sanitizeInput(formData.phone) : 'Not provided',
      address: formData.address ? sanitizeInput(formData.address) : 'Not provided',
      message: formData.message ? sanitizeInput(formData.message) : 'No message provided'
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_ACCESS_KEY,
        from_name: 'NARA Website',
        subject: 'New NARA Signup',
        ...sanitizedData
      })
    });

    const data = await response.json() as Web3FormsResponse;
    
    if (data.success) {
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      throw new Error(data.message ?? 'Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error submitting form'
    });
  }
} 