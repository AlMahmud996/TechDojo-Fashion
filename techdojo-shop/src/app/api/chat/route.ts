import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';
import ChatHistory from '@/lib/models/ChatHistory';
import SizeRequest from '@/lib/models/SizeRequest';

export async function POST(req: Request) {
  try {
    console.log('--- Chat API called ---');

    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { message } = await req.json();
    console.log('Message:', message);

    await connectDB();

    // Only fetch 20 products max to save tokens
    const products = await Product.find({}).limit(20).lean();
    const productSummary = products.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      category: p.category,
      price: p.price,
      tags: p.tags,
      sizes: p.sizes
        .filter((s: any) => s.stock > 0)
        .map((s: any) => s.size)
        .join(', ')
    }));

    const user = await User.findOne({ email: session.user.email }).lean();
    const cartItems = (user as any)?.cart || [];

    // Only last 4 messages for context
    const chatHistory = await ChatHistory.findOne({ userId: (user as any)?._id });
    const recentMessages = chatHistory?.messages?.slice(-4) || [];

    const systemPrompt = `You are ShopBot for ShopAssist fashion store.

PRODUCTS:
${productSummary.map(p => `- ${p.name} | ${p.category} | $${p.price} | ID:${p.id} | Sizes:${p.sizes}`).join('\n')}

CART: ${cartItems.length === 0 ? 'Empty' : cartItems.map((i: any) => i.size).join(', ')}

RESPOND ONLY WITH JSON (no markdown):
{"intent":"browse"|"add_to_cart"|"remove_from_cart"|"view_cart"|"checkout"|"size_unavailable"|"general","reply":"message","products":[],"productId":null,"productName":null,"size":null,"action":null}

RULES:
- browse: add up to 5 products to products array with id,name,price,category
- add_to_cart: set productId, productName, size (use exact product ID from list)
- remove_from_cart: set productId, size
- checkout: place the order
- size_unavailable: if size not in available sizes
- Return ONLY the JSON, nothing else`;

    console.log('Calling Groq API...');

    const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 512,
        temperature: 0.1,
        messages: [
          { role: 'system', content: systemPrompt },
          ...recentMessages.map((m: any) => ({
            role: m.role === 'bot' ? 'assistant' : 'user',
            content: m.content
          })),
          { role: 'user', content: message }
        ]
      })
    });

    console.log('Groq response status:', aiResponse.status);

    if (!aiResponse.ok) {
      const err = await aiResponse.json();
      console.error('Groq API error:', JSON.stringify(err));
      return NextResponse.json({ error: 'AI service error' }, { status: 500 });
    }

    const aiData = await aiResponse.json();
    const rawText = aiData.choices?.[0]?.message?.content || '';
    console.log('Groq raw response:', rawText);

    // Parse JSON response
    let parsed: any;
    try {
      const cleaned = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON parse error:', e);
      parsed = {
        intent: 'general',
        reply: "I'm here to help! Try asking me to show products or add items to your cart.",
        products: []
      };
    }

    console.log('Parsed intent:', parsed.intent);

    // Execute DB actions
    if (parsed.intent === 'add_to_cart' && parsed.productId) {
      const freshUser = await User.findOne({ email: session.user.email });
      const existing = (freshUser as any)?.cart?.find(
        (item: any) => item.productId?.toString() === parsed.productId && item.size === parsed.size
      );
      if (existing) {
        await User.findOneAndUpdate(
          { email: session.user.email, 'cart.productId': parsed.productId, 'cart.size': parsed.size },
          { $inc: { 'cart.$.quantity': 1 } }
        );
      } else {
        await User.findOneAndUpdate(
          { email: session.user.email },
          { $push: { cart: { productId: parsed.productId, size: parsed.size, quantity: 1 } } }
        );
      }
      console.log('✅ Added to cart');
    }

    if (parsed.intent === 'remove_from_cart' && parsed.productId) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $pull: { cart: { productId: parsed.productId, size: parsed.size } } }
      );
      console.log('✅ Removed from cart');
    }

    if (parsed.intent === 'checkout') {
      const freshUser = await User.findOne({ email: session.user.email })
        .populate('cart.productId').lean();
      const items = (freshUser as any)?.cart || [];
      if (items.length > 0) {
        const total = items.reduce((sum: number, item: any) =>
          sum + (item.productId?.price || 0) * item.quantity, 0);
        await Order.create({
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
        await User.findOneAndUpdate(
          { email: session.user.email },
          { $set: { cart: [] } }
        );
        console.log('✅ Order placed, total:', total);
      } else {
        parsed.reply = "Your cart is empty! Add some products first. 🛒";
        parsed.intent = 'general';
      }
    }

    if (parsed.intent === 'size_unavailable' && parsed.productId) {
      await SizeRequest.create({
        userId: (user as any)?._id,
        productId: parsed.productId,
        productName: parsed.productName,
        requestedSize: parsed.size
      });
      console.log('✅ Size request created');
    }

    // Save chat history
    await ChatHistory.findOneAndUpdate(
      { userId: (user as any)?._id },
      {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: message, createdAt: new Date() },
              { role: 'bot', content: parsed.reply, createdAt: new Date() }
            ]
          }
        }
      },
      { upsert: true }
    );

    console.log('✅ Chat history saved');
    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error('FULL Chat API error:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ messages: [] });

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const history = await ChatHistory.findOne({ userId: (user as any)?._id });
    return NextResponse.json({ messages: history?.messages || [] });
  } catch (error: any) {
    return NextResponse.json({ messages: [] });
  }
}