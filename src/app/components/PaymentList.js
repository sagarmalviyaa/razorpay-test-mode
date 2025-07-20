'use client';

import { useState, useEffect } from 'react';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fetch-payments?count=10&skip=0');
      const data = await response.json();
      setPayments(data.items || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const formatAmount = (amount) => {
    return (amount / 100).toFixed(2);
  };

  // Separate functions for date and time
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      captured: 'badge-success',
      failed: 'badge-danger',
      pending: 'badge-warning',
    };
    
    return (
      <span className={`badge ${statusStyles[status] || 'badge-secondary'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    const icons = {
      card: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      upi: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[method] || icons.card;
  };

  const handleRefund = async (paymentId, amount) => {
    const refundAmount = prompt(`Enter refund amount for ${paymentId} (Max: ₹${amount}):`);
    if (refundAmount) {
      try {
        const response = await fetch('/api/refund', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payment_id: paymentId,
            amount: parseFloat(refundAmount),
          }),
        });
        const result = await response.json();
        if (result.success) {
          alert('Refund processed successfully!');
          fetchPayments(); // Refresh the list
        } else {
          alert('Refund failed: ' + result.error);
        }
      } catch (error) {
        alert('Refund error occurred');
      }
    }
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <div className="flex-1">
          <h3 className="card-title">Recent Payments</h3>
          <p className="card-description">View and manage payment transactions</p>
        </div>
        <button
          onClick={fetchPayments}
          disabled={loading}
          className="btn-action btn-action-outline"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="card-content-container">
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="spinner mx-auto mb-2"></div>
            Loading payments...
          </div>
        ) : payments.length > 0 ? (
          <div className="modern-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <div className="table-cell-id" title={payment.id}>
                        {payment.id}
                      </div>
                    </td>
                    <td>
                      <div className="table-cell-method">
                        {getMethodIcon(payment.method)}
                        <span>{payment.method || 'Card'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell-amount">
                        ₹{formatAmount(payment.amount)}
                      </div>
                    </td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      <div className="date-time-stack">
                        <div className="date-part">
                          {formatDate(payment.created_at)}
                        </div>
                        <div className="time-part">
                          {formatTime(payment.created_at)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell-actions">
                        <button
                          onClick={() => navigator.clipboard.writeText(payment.id)}
                          className="btn-action btn-action-primary"
                          title="Copy Payment ID"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9h4" />
                          </svg>
                          Copy
                        </button>
                        {payment.status === 'captured' && (
                          <button
                            onClick={() => handleRefund(payment.id, formatAmount(payment.amount))}
                            className="btn-action btn-action-danger"
                            title="Process Refund"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No payments found
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
