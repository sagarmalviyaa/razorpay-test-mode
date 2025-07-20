import PaymentCard from './components/PaymentCard';
import RefundCard from './components/RefundCard';
import PaymentList from './components/PaymentList';
import QRCodeCard from './components/QRCode';
import TestCredentials from './components/TestCredentials';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="header-title">Razorpay Integration Demo</h1>
            <p className="header-subtitle">
              Complete payment gateway integration with multiple features and test scenarios
            </p>
            <div className="test-mode-badge">
              🧪 Test Mode Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 mb-6">
          <PaymentCard />
          <RefundCard />
          <QRCodeCard />
          <PaymentList />
        </div>
        <TestCredentials />
      </div>
    </div>
  );
}