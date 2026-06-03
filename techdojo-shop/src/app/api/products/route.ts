import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
const ProductModule: any = require('@/lib/models/Product');
const Product = ProductModule.default || ProductModule;

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const query: any = {};
    if (category && category !== 'all') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).lean();
    console.log('Products fetched:', products.length);
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Products API error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}