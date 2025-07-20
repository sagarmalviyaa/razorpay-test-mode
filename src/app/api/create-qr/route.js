import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { type, name, usage, amount, description } = await req.json();

    const qrCodeData = {
      type: type || 'upi_qr',
      name,
      usage: usage || 'single_use',
      fixed_amount: amount ? 1 : 0,
      payment_amount: amount ? amount * 100 : undefined,
      description,
      close_by: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours from now
    };

    const qrCode = await razorpay.qrCode.create(qrCodeData);
    
    return NextResponse.json(qrCode);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
