'use client';

import { useState } from 'react';
import { loadRazorpayScript } from '@/lib/razorpay';

const PaymentCard = () => {
  const [amount, setAmount] = useState('500');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'INR',
        }),
      });

      const order = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Demo Store',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyResponse.json();
          if (result.success) {
            alert('Payment successful!');
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <div>
          <h3 className="card-title">Standard Payment</h3>
          <p className="card-description">Process payments using various payment methods</p>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Amount (INR)</label>
        <div className="input-with-icon">
          <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            placeholder="Enter amount"
          />
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !amount}
        className="btn btn-primary btn-full"
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </div>
  );
};

export default PaymentCard;
