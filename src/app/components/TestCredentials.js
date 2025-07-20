'use client';

import { useState } from 'react';

const TestCredentials = () => {
  const [copiedText, setCopiedText] = useState('');
  const [activeSection, setActiveSection] = useState('cards');

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const testCredentials = {
    cards: {
      success: [
        { label: 'Visa Success', number: '4111 1111 1111 1111', network: 'visa' },
        { label: 'Mastercard Success', number: '5555 5555 5555 4444', network: 'mastercard' },
        { label: 'American Express', number: '3782 8224 6310 005', network: 'amex', cvv: '4 digits' },
        { label: 'Rupay Success', number: '6074 6956 5590 3456', network: 'rupay' },
      ],
      failure: [
        { label: 'Generic Failure', number: '4000 0000 0000 0002', reason: 'Payment will fail' },
        { label: 'Insufficient Funds', number: '4000 0000 0000 9995', reason: 'Insufficient balance' },
        { label: 'Expired Card', number: '4000 0000 0000 0069', reason: 'Card expired' },
        { label: 'Processing Error', number: '4000 0000 0000 0119', reason: 'Processing failure' },
      ],
    },
    upi: {
      success: [
        { label: 'Success UPI', id: 'success@razorpay', reason: 'Payment will succeed' },
        { label: 'Test PayTM', id: 'test@paytm', reason: 'PayTM test UPI' },
        { label: 'Test PhonePe', id: 'test@phonepe', reason: 'PhonePe test UPI' },
        { label: 'Test GPay', id: 'test@gpay', reason: 'Google Pay test UPI' },
      ],
      failure: [
        { label: 'Failure UPI', id: 'failure@razorpay', reason: 'Payment will fail' },
        { label: 'Invalid UPI', id: 'invalid@upi', reason: 'Invalid UPI ID' },
        { label: 'Timeout UPI', id: 'timeout@razorpay', reason: 'Payment will timeout' },
      ]
    },
    amounts: [
      { amount: '₹1.00', result: 'Always succeeds', color: 'success' },
      { amount: '₹2.00', result: 'Always fails', color: 'danger' },
      { amount: '₹3.00', result: 'Payment pending', color: 'warning' },
      { amount: '₹100.00', result: 'Success with receipt', color: 'success' },
    ],
  };

  const sections = [
    { id: 'cards', label: 'Cards', icon: '💳' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'amounts', label: 'Amounts', icon: '💰' },
  ];

  const CredentialRow = ({ item, type, copyKey }) => (
    <div className="credential-row-modern">
      <div className="credential-info-modern">
        <div className="credential-label-modern">{item.label}</div>
        <div className="credential-value-modern">
          {item.number || item.id || item.amount}
        </div>
        {item.reason && (
          <div className="credential-reason-modern">{item.reason}</div>
        )}
      </div>
      <button
        onClick={() => copyToClipboard(item[copyKey] || item.label, `${type}-${item.label}`)}
        className={`copy-btn-modern ${copiedText === `${type}-${item.label}` ? 'copied' : ''}`}
      >
        {copiedText === `${type}-${item.label}` ? (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9h4" />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <div className="modern-card">
      <div className="card-header">
        <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div>
          <h3 className="card-title">Test Credentials</h3>
          <p className="card-description">Complete test data for all payment scenarios</p>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="btn-group">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`btn-tab ${activeSection === section.id ? 'active' : ''}`}
          >
            <span className="tab-emoji">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="tab-content">
        {activeSection === 'cards' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Success Cards
              </h4>
              <div className="space-y-2">
                {testCredentials.cards.success.map((card, index) => (
                  <CredentialRow key={index} item={card} type="card-success" copyKey="number" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Failure Cards
              </h4>
              <div className="space-y-2">
                {testCredentials.cards.failure.map((card, index) => (
                  <CredentialRow key={index} item={card} type="card-failure" copyKey="number" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'upi' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Success UPI IDs
              </h4>
              <div className="space-y-2">
                {testCredentials.upi.success.map((upi, index) => (
                  <CredentialRow key={index} item={upi} type="upi-success" copyKey="id" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Failure UPI IDs
              </h4>
              <div className="space-y-2">
                {testCredentials.upi.failure.map((upi, index) => (
                  <CredentialRow key={index} item={upi} type="upi-failure" copyKey="id" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'amounts' && (
          <div>
            <h4 className="font-semibold text-purple-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Amount-Based Testing
            </h4>
            <div className="space-y-2">
              {testCredentials.amounts.map((amount, index) => (
                <div key={index} className="credential-row-modern">
                  <div className="credential-info-modern">
                    <div className="credential-label-modern font-mono text-lg">{amount.amount}</div>
                    <div className="credential-reason-modern">{amount.result}</div>
                  </div>
                  <span className={`badge badge-${amount.color}`}>
                    {amount.color.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="alert alert-info mt-6">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Test Info</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Expiry:</strong> Any future date (12/25)</li>
              <li>• <strong>CVV:</strong> Any 3 digits (123)</li>
              <li>• <strong>Name:</strong> Any name works</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCredentials;
