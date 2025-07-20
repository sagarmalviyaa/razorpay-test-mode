'use client';

import { useState } from 'react';

const QRCodeCard = () => {
  const [qrData, setQrData] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Demo QR Payment',
    amount: '100',
    description: 'QR Code Payment for Demo',
    usage: 'single_use',
    type: 'upi_qr'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateQR = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          name: formData.name,
          amount: parseFloat(formData.amount),
          description: formData.description,
          usage: formData.usage,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setQrData(result);
      } else {
        setError(result.error || 'Failed to create QR code');
      }
    } catch (error) {
      console.error('QR creation error:', error);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const downloadQR = () => {
    if (qrData?.image_url) {
      const link = document.createElement('a');
      link.href = qrData.image_url;
      link.download = `qr-code-${qrData.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQR = async () => {
    if (navigator.share && qrData) {
      try {
        await navigator.share({
          title: 'Payment QR Code',
          text: `Payment QR Code for ${formData.name}`,
          url: qrData.image_url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="modern-card">
      <div className="card-header">
        <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11a2 2 0 100-4H6a2 2 0 100 4h12zM8 21l4-7 4 7M8 21l-2-4 2-4M16 21l2-4-2-4" />
        </svg>
        <div>
          <h3 className="card-title">QR Code Payment</h3>
          <p className="card-description">Generate dynamic QR codes for instant payments</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!qrData ? (
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">QR Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="upi_qr">UPI QR Code</option>
              <option value="bharat_qr">Bharat QR Code</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">QR Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter QR code name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount (INR)</label>
            <div className="input-with-icon">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter amount"
                min="1"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Usage Type</label>
            <select
              name="usage"
              value={formData.usage}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="single_use">Single Use</option>
              <option value="multiple_use">Multiple Use</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="Enter description for the QR code"
            />
          </div>

          <button
            onClick={handleCreateQR}
            disabled={loading || !formData.name || !formData.amount}
            className="btn btn-primary btn-full"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Generating QR Code...
              </>
            ) : (
              <>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create QR Code
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="qr-container">
          <div className="mb-4">
            <img
              src={qrData.image_url}
              alt="QR Code"
              className="qr-image mx-auto"
            />
          </div>
          
          <div className="qr-info space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status:</span>
              <span className={`badge ${qrData.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                {qrData.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">QR ID:</span>
              <span className="text-sm font-mono text-gray-600">{qrData.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-sm font-semibold">₹{formData.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Usage:</span>
              <span className="text-sm">{formData.usage.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <button
              onClick={downloadQR}
              className="btn btn-primary flex-1"
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            
            {navigator.share && (
              <button
                onClick={shareQR}
                className="btn btn-secondary flex-1"
              >
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
            )}
            
            <button
              onClick={() => {
                setQrData(null);
                setError(null);
              }}
              className="btn btn-outline flex-1"
            >
              Create New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeCard;
