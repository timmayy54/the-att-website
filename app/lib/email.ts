import nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// This is a simple email service using Nodemailer
// In production, you would use environment variables for these values
const smtpOptions = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'theattreviews@gmail.com',
    pass: process.env.SMTP_PASSWORD || '', // You'll need to set this in your environment variables
  },
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport(smtpOptions);
  
  if (!process.env.SMTP_PASSWORD) {
    console.warn('SMTP_PASSWORD is not set. Email will not be sent.');
    return { success: false, message: 'Email configuration is incomplete. Please contact the administrator.' };
  }
  
  try {
    const info = await transporter.sendMail({
      from: {
        name: 'TheAttReviews Contact Form',
        address: smtpOptions.auth.user,
      },
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An error occurred while sending the email'
    };
  }
} 