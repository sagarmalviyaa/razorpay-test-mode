import './globals.css';

export const metadata = {
  title: 'Razorpay Demo - Payment Gateway Integration',
  description: 'Complete Razorpay payment gateway demo with multiple features',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
