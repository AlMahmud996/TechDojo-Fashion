import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email)
      return NextResponse.json({ cart: [] });

    await connectDB();
    const user = await User.findOne({ email: session.user.email })
      .populate('cart.productId').lean();

    return NextResponse.json({ cart: user?.cart || [] });
  } catch (error: any) {
    console.error('Cart GET error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId, size, action } = await req.json();
    await connectDB();

    if (action === 'add') {
      const user = await User.findOne({ email: session.user.email });
      const existing = user?.cart?.find(
        (item: any) => item.productId?.toString() === productId && item.size === size
      );
      if (existing) {
        await User.findOneAndUpdate(
          { email: session.user.email, 'cart.productId': productId, 'cart.size': size },
          { $inc: { 'cart.$.quantity': 1 } }
        );
      } else {
        await User.findOneAndUpdate(
          { email: session.user.email },
          { $push: { cart: { productId, size, quantity: 1 } } }
        );
      }
    }

    if (action === 'remove') {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $pull: { cart: { productId, size } } }
      );
    }

    if (action === 'clear') {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { cart: [] } }
      );
    }

    const updated = await User.findOne({ email: session.user.email })
      .populate('cart.productId').lean();

    return NextResponse.json({ cart: updated?.cart || [] });
  } catch (error: any) {
    console.error('Cart POST error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}