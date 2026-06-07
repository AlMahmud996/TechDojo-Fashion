import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ cart: [] });

    await connectDB();
    const user = await User.findOne({ email: session.user.email })
      .populate('cart.productId').lean();

    return NextResponse.json({ cart: (user as any)?.cart || [] });
  } catch (error: any) {
    console.error('Cart GET error:', error.message);
    return NextResponse.json({ cart: [] });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Cart POST session:', session?.user?.email);

    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { productId, size, action } = body;
    console.log('Cart action:', action, productId, size);

    await connectDB();

    if (action === 'add') {
      const user = await User.findOne({ email: session.user.email });
      const existing = (user as any)?.cart?.find(
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
      console.log('✅ Cart: added', productId, size);
    }

    if (action === 'remove') {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $pull: { cart: { productId, size } } }
      );
      console.log('✅ Cart: removed', productId, size);
    }

    if (action === 'clear') {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { cart: [] } }
      );
      console.log('✅ Cart: cleared');
    }

    const updated = await User.findOne({ email: session.user.email })
      .populate('cart.productId').lean();

    return NextResponse.json({ cart: (updated as any)?.cart || [] });
  } catch (error: any) {
    console.error('Cart POST error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}