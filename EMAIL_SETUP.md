# Email Setup for Contact Form

The contact form on TheAttReviews website is configured to send emails using Nodemailer with Gmail SMTP. Follow these steps to set up the email functionality:

## Prerequisites

1. You need a Gmail account (theattreviews@gmail.com)
2. You need to generate an App Password for this account

## Generating an App Password for Gmail

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you need to have this enabled)
4. At the bottom of the page, select "App passwords"
5. Select "Mail" as the app and "Other" as the device (name it "TheAttReviews Website")
6. Click "Generate"
7. Google will display a 16-character password. **Copy this password**

## Setting Up Environment Variables

1. Open the `.env.local` file in the root of your project
2. Replace `your_app_password_here` with the App Password you generated:

```
SMTP_PASSWORD=your_16_character_app_password
```

3. Save the file

## Testing the Contact Form

1. Start the development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out the form and submit
4. You should receive an email at theattreviews@gmail.com

## Troubleshooting

If emails are not being sent:

1. Check the console logs for any error messages
2. Verify that the App Password is correct
3. Make sure the Gmail account doesn't have any security restrictions
4. Check if your Gmail account has reached its sending limits

## Security Notes

- Never commit the `.env.local` file to version control
- The App Password gives access to your Gmail account, so keep it secure
- Consider using a dedicated email service like SendGrid or Mailgun for production 