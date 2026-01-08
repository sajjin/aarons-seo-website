import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const runtime = 'nodejs';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

async function sendEmail(formData: ContactFormData): Promise<string> {
  const { name, email, phone, message } = formData;
  const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT || '';

  if (!recipientEmail) {
    throw new Error('CONTACT_EMAIL_RECIPIENT environment variable is not set');
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials are not configured');
  }

  const htmlBody = `
    <html>
      <head></head>
      <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      </body>
    </html>
  `;

  const textBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}
  `;

  const params = {
    Source: process.env.CONTACT_EMAIL_FROM || 'noreply@boostbarnmotorsports.com',
    Destination: {
      ToAddresses: [recipientEmail],
      ReplyToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${name}`,
      },
      Body: {
        Html: {
          Data: htmlBody,
        },
        Text: {
          Data: textBody,
        },
      },
    },
  };

  const command = new SendEmailCommand(params);
  const response = await sesClient.send(command);
  return response.MessageId || '';
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse request body
    const body = await request.json() as ContactFormData;

    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email
    const messageId = await sendEmail(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again later.',
      },
      { status: 500 }
    );
  }
}
