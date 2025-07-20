import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { payment_id, amount, notes } = await req.json();

    // Validate payment_id
    if (!payment_id) {
      return NextResponse.json(
        { success: false, error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Check if payment_id format is correct
    if (!payment_id.startsWith('pay_')) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID format' },
        { status: 400 }
      );
    }

    const refundData = {
      amount: amount ? Math.round(amount * 100) : undefined, // Convert to paisa and ensure integer
      notes: notes || { reason: 'Refund requested' },
    };

    console.log('Attempting refund for:', payment_id, 'Amount:', refundData.amount);

    const refund = await razorpay.payments.refund(payment_id, refundData);
    
    return NextResponse.json({
      success: true,
      refund: refund,
      message: 'Refund processed successfully'
    });
  } catch (error) {
    console.error('Refund error:', error);
    
    // Handle specific Razorpay errors
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.error?.description || error.message,
        code: error.statusCode
      }, { status: error.statusCode });
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
