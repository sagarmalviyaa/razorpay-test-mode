import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get('count')) || 10;
    const skip = parseInt(searchParams.get('skip')) || 0;

    const payments = await razorpay.payments.all({
      count,
      skip,
    });
    
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
