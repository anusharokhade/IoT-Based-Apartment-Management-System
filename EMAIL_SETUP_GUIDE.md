# Email Alert Configuration Guide

To enable email alerts for gas leaks, follow these steps:

## 1. Enable Gmail 2-Step Verification
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** (follow prompts)

## 2. Generate Gmail App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer**
3. Google will generate a **16-character password**
4. Copy this password (you'll use it next)

## 3. Configure Environment Variables
1. Open `.env` file in the project root:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (paste the 16-character password)
   ```

2. Replace `your-email@gmail.com` with your Gmail address

3. Replace `xxxx xxxx xxxx xxxx` with the app password (keep the spaces)

## 4. Set Owner Email for Alerts
When users log in, store their email in browser localStorage:
```javascript
localStorage.setItem('ownerEmail', ownerEmail);
localStorage.setItem('ownerName', ownerName);
localStorage.setItem('flatno', flatno);
```

This is typically done in the LoginPage.js component.

## 5. Test Email Alerts
1. Start the backend: `node backEnd/index.js`
2. Go to Gas Sensor dashboard
3. Wait for gas level to reach >= 7 ppm
4. You should receive:
   - Browser pop-up alert
   - Email notification to ownerEmail

## Troubleshooting

### Email not sending
- Check `.env` file has correct EMAIL_USER and EMAIL_PASSWORD
- Verify 2-Step Verification is enabled on Gmail account
- Ensure app password is from 2024+ (older passwords may not work)
- Check backend console for error messages

### Browser alert not showing
- Ensure browser notifications are enabled
- Check browser console for JavaScript errors

## Email Template
The email includes:
- Gas level reading (ppm)
- Alert timestamp
- Flat number
- Emergency instructions
- Call-to-action to evacuate and contact emergency services
