# EmailJS Setup Guide for Fingalogy Contact Form

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email account
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template configuration:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
You have received a new message from the Fingalogy website contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the Fingalogy website contact form.
```

4. Set the "To Email" to: **info@fingalogy.com**
5. Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Update Configuration
Open `assets/js/main.js` and replace these values in the ContactForm class:

```javascript
this.config = {
  publicKey: 'YOUR_PUBLIC_KEY',    // Replace with your Public Key
  serviceId: 'YOUR_SERVICE_ID',     // Replace with your Service ID
  templateId: 'YOUR_TEMPLATE_ID'    // Replace with your Template ID
};
```

## Step 6: Test
1. Save the file and push to GitHub
2. Deploy to Cloud Run
3. Test the contact form on your website
4. Check if you receive the email at info@fingalogy.com

## Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Make sure EmailJS service is active
- Check EmailJS dashboard for delivery status
- Free plan limit: 200 emails/month

## Security Note
The Public Key is safe to expose in client-side code. EmailJS handles rate limiting and spam protection automatically.
