import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from "~/env";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address, message } = req.body as FormData;

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
        name,
        email,
        phone: phone ?? 'Not provided',
        address: address ?? 'Not provided',
        message: message ?? 'No message provided'
      })
    });

    const data = await response.json() as Web3FormsResponse;
    
    if (data.success) {
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
} 