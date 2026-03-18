import { NextRequest, NextResponse } from 'next/server';
import { insertOne } from '@/lib/mongo';
import { Run } from '@/lib/mongo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, artifacts } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 });
    }

    const run: Run = {
      name,
      createdAt: new Date(),
      artifacts: artifacts || [],
    };

    const id = await insertOne('runs', run);

    return NextResponse.json({ 
      success: true, 
      runId: id,
      run: { ...run, _id: id }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating run:', error);
    return NextResponse.json({ error: 'Failed to create run' }, { status: 500 });
  }
}
