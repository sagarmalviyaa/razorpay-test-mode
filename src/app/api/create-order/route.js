import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
