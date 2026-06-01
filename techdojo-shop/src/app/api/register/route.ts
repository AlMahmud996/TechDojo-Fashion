import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log('Register attempt:', { name, email });

    if (!name || !email || !password)
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });

    if (password.length < 6)
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });

    await connectDB();
    console.log('DB connected');

    const exists = await User.findOne({ email });
    if (exists)
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, cart: [] });
    console.log('User created:', user._id);

    return NextResponse.json({ success: true, message: 'Account created successfully' });
  } catch (error: any) {
    console.error('Register error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}