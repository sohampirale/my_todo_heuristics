import { NextRequest, NextResponse } from 'next/server';
import { insertOne } from '@/lib/mongo';
import { Event } from '@/lib/mongo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, action, meta } = body;

    if (!page || typeof page !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid page' }, { status: 400 });
    }

    if (!action || typeof action !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid action' }, { status: 400 });
    }

    const event: Event = {
      page,
      action,
      timestamp: new Date(),
      meta: meta || {},
    };

    await insertOne('events', event);

    return NextResponse.json({ success: true, eventId: event._id });
  } catch (error) {
    console.error('Error logging event:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}
