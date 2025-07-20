<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Razorpay Integration Demo - Next.js Payment Gateway

A comprehensive Next.js application demonstrating complete Razorpay payment gateway integration with modern UI design and extensive testing capabilities.

## 🚀 Features

### Payment Processing

- **Standard Payment Integration** - Complete payment flow with order creation and verification
- **QR Code Payments** - Generate dynamic QR codes for UPI and Bharat QR
- **Refund Management** - Process full and partial refunds with real-time tracking
- **Payment History** - View recent transactions with detailed information
- **Multiple Payment Methods** - Support for Cards, UPI, Net Banking, and Wallets


### Modern UI/UX

- **Responsive Design** - Mobile-first approach with modern CSS
- **Gradient Backgrounds** - Beautiful visual aesthetics
- **Interactive Elements** - Smooth animations and hover effects
- **Card-based Layout** - Clean, organized component structure
- **Professional Typography** - Inter font with proper hierarchy


### Testing Environment

- **Comprehensive Test Credentials** - Cards, UPI, amounts, banks, wallets
- **Success/Failure Scenarios** - Complete test coverage for all scenarios
- **Real-time Debugging** - Console logging and error handling
- **Test Mode Integration** - Full Razorpay test environment support


## 📁 Project Structure

```
razorpay-demo/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create-order/
│   │   │   │   └── route.js
│   │   │   ├── create-qr/
│   │   │   │   └── route.js
│   │   │   ├── fetch-payments/
│   │   │   │   └── route.js
│   │   │   ├── refund/
│   │   │   │   └── route.js
│   │   │   └── verify-payment/
│   │   │       └── route.js
│   │   ├── components/
│   │   │   ├── PaymentCard.js
│   │   │   ├── PaymentList.js
│   │   │   ├── QRCode.js
│   │   │   ├── RefundCard.js
│   │   │   └── TestCredentials.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── lib/
│       └── razorpay.js
├── .env.local
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```


## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repository-url>
cd razorpay-demo
npm install
```


### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=rzp_test_your_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

**Get your test keys from:**

1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **API Keys**
3. Switch to **Test Mode**
4. Generate/Copy your Test Key ID and Secret

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Tailwind CSS Setup

The project uses Tailwind CSS for utility classes. Configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


### Next.js Configuration

Basic Next.js setup in `next.config.mjs` for optimal performance.

## 💳 Test Credentials

### Success Cards

| Card Type | Number | CVV | Expiry |
| :-- | :-- | :-- | :-- |
| Visa | `4111 1111 1111 1111` | Any 3 digits | Any future date |
| Mastercard | `5555 5555 5555 4444` | Any 3 digits | Any future date |
| American Express | `3782 8224 6310 005` | Any 4 digits | Any future date |
| Rupay | `6074 6956 5590 3456` | Any 3 digits | Any future date |

### Failure Cards

| Scenario | Number | Result |
| :-- | :-- | :-- |
| Generic Failure | `4000 0000 0000 0002` | Payment will fail |
| Insufficient Funds | `4000 0000 0000 9995` | Insufficient balance |
| Expired Card | `4000 0000 0000 0069` | Card expired |
| Processing Error | `4000 0000 0000 0119` | Processing failure |

### UPI Test IDs

| Type | UPI ID | Result |
| :-- | :-- | :-- |
| Success | `success@razorpay` | Payment succeeds |
| Failure | `failure@razorpay` | Payment fails |
| Test PayTM | `test@paytm` | PayTM test UPI |
| Test PhonePe | `test@phonepe` | PhonePe test UPI |

### Amount-based Testing

| Amount | Result |
| :-- | :-- |
| ₹1.00 | Always succeeds |
| ₹2.00 | Always fails |
| ₹3.00 | Payment pending |
| ₹100.00 | Success with receipt |

## 🛠️ API Routes

### Payment Flow

1. **Create Order** - `POST /api/create-order`
2. **Verify Payment** - `POST /api/verify-payment`
3. **Process Refund** - `POST /api/refund`
4. **Fetch Payments** - `GET /api/fetch-payments`
5. **Create QR Code** - `POST /api/create-qr`

### Example API Usage

```javascript
// Create Order
const order = await fetch('/api/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 500,
    currency: 'INR'
  })
});

// Process Refund
const refund = await fetch('/api/refund', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    payment_id: 'pay_xxxxxxxxxx',
    amount: 250
  })
});
```


## 🎨 Component Overview

### PaymentCard

- Standard payment processing
- Multiple payment methods
- Real-time payment verification
- Modern gradient button design


### RefundCard

- Full and partial refunds
- Payment ID validation
- Error handling and success feedback
- Direct refund processing


### QRCode

- Dynamic QR code generation
- UPI and Bharat QR support
- Single-use and multiple-use options
- Download and share functionality


### PaymentList

- Recent transaction history
- Date/time display in IST
- Direct refund actions
- Copy payment IDs
- Status-based filtering


### TestCredentials

- Comprehensive test data
- Categorized credentials (Cards, UPI, Amounts)
- One-click copying
- Success/failure scenarios
- Interactive tab navigation


## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly buttons**
- **Optimized table displays**
- **Accessible typography**


### Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`


## 🔒 Security Features

- **Environment variables** for API keys
- **Payment signature verification**
- **Server-side validation**
- **Error handling** for edge cases
- **Test mode isolation**


## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```


### Environment Variables for Production

Update `.env.local` with live keys for production:

```env
RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=rzp_live_your_live_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
```

**⚠️ Important:** Never commit `.env.local` to version control.

## 📊 Key Features Breakdown

| Feature | Status | Description |
| :-- | :-- | :-- |
| ✅ Payment Processing | Complete | Full payment flow with verification |
| ✅ QR Code Generation | Complete | Dynamic QR codes for payments |
| ✅ Refund Management | Complete | Full/partial refund processing |
| ✅ Transaction History | Complete | Detailed payment tracking |
| ✅ Test Environment | Complete | Comprehensive testing setup |
| ✅ Modern UI | Complete | Professional design system |
| ✅ Responsive Layout | Complete | Mobile-optimized interface |
| ✅ Error Handling | Complete | Robust error management |

## 🐛 Troubleshooting

### Common Issues

**Payment fails with "key_id is mandatory"**

- Check if `.env.local` exists in root directory
- Verify environment variable names are correct
- Restart development server after adding env vars

**Refund not working**

- Ensure payment ID starts with `pay_`
- Only captured payments can be refunded
- Check payment exists in your Razorpay account

**QR Code generation fails**

- Verify QR code parameters are valid
- Check network connectivity
- Ensure proper API key permissions


### Debug Mode

Enable debug logging by adding to your API routes:

```javascript
console.log('Debug info:', {
  keyExists: !!process.env.RAZORPAY_KEY_ID,
  secretExists: !!process.env.RAZORPAY_KEY_SECRET
});
```


## 📝 Scripts

| Command | Description |
| :-- | :-- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📋 Dependencies

### Core Dependencies

- `next` - React framework
- `react` - UI library
- `razorpay` - Payment gateway SDK


### Dev Dependencies

- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips for Production

1. **Switch to live keys** when ready for production
2. **Enable webhooks** for real-time payment updates
3. **Implement proper logging** for monitoring
4. **Add rate limiting** for API endpoints
5. **Set up monitoring** for payment failures
6. **Regular backup** of transaction data

## 📞 Support

For Razorpay specific issues:

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For application issues:

- Check console logs for errors
- Verify environment variables
- Test with provided credentials
- Review API responses

**Built with ❤️ using Next.js and Razorpay**

*This demo provides a complete foundation for integrating Razorpay payments into your production applications.*

