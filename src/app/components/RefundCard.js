'use client';

import { useState } from 'react';

const RefundCard = () => {
  const [paymentId, setPaymentId] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRefund = async () => {
    if (!paymentId.trim()) {
      alert('Please enter a payment ID');
      return;
    }

    // Validate payment ID format
    if (!paymentId.startsWith('pay_')) {
      alert('Invalid payment ID format. Payment ID should start with "pay_"');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('Sending refund request for:', paymentId);
      
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_id: paymentId.trim(),
          amount: refundAmount ? parseFloat(refundAmount) : undefined,
          notes: { reason: 'Customer requested refund' },
        }),
      });

      const result = await response.json();
      console.log('Refund response:', result);

      if (result.success) {
        setResult({
          type: 'success',
          message: `Refund processed successfully! Refund ID: ${result.refund.id}`
        });
        // Don't clear the form immediately - let user see the result
      } else {
        setResult({
          type: 'error',
          message: result.error || 'Refund failed'
        });
      }
    } catch (error) {
      console.error('Refund error:', error);
      setResult({
        type: 'error',
        message: 'Network error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setPaymentId('');
    setRefundAmount('');
    setResult(null);
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <div>
          <h3 className="card-title">Process Refund</h3>
          <p className="card-description">Refund payments using payment ID</p>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Payment ID *</label>
        <input
          type="text"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          className="form-input"
          placeholder="pay_xxxxxxxxxx"
        />
        <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>
          Format: pay_ followed by alphanumeric characters
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Refund Amount (INR)</label>
        <input
          type="number"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
          className="form-input"
          placeholder="Leave empty for full refund"
          step="0.01"
          min="0"
        />
        <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>
          Optional: Leave empty for full refund
        </small>
      </div>

      {result && (
        <div className={`alert ${result.type === 'success' ? 'alert-info' : 'alert-warning'}`} style={{ marginBottom: '1rem' }}>
          <strong>{result.type === 'success' ? 'Success:' : 'Error:'}</strong> {result.message}
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleRefund}
          disabled={loading || !paymentId.trim()}
          className="btn btn-danger"
          style={{ flex: 1 }}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Processing...
            </>
          ) : (
            'Process Refund'
          )}
        </button>
        
        <button
          onClick={clearForm}
          className="btn btn-secondary"
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default RefundCard;
