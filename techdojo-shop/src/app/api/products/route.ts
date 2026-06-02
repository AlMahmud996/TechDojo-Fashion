import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = {};
    if (category && category !== 'all') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).lean();
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}