import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const user = await User.findOne({ email: session.user.email })
      .populate('cart.productId').lean();

    const items = (user as any)?.cart || [];

    if (items.length === 0)
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const total = items.reduce((sum: number, item: any) =>
      sum + (item.productId?.price || 0) * item.quantity, 0);

    const order = await Order.create({
      userId: (user as any)?._id,
      items: items.map((item: any) => ({
        productId: item.productId?._id,
        name: item.productId?.name,
        size: item.size,
        price: item.productId?.price,
        quantity: item.quantity
      })),
      total,
      status: 'placed'
    });

    // Clear cart after order
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { cart: [] } }
    );

    console.log('✅ Order placed:', order._id, 'Total:', total);
    return NextResponse.json({ success: true, orderId: order._id, total });

  } catch (error: any) {
    console.error('Checkout error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}