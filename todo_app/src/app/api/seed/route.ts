import { NextRequest, NextResponse } from 'next/server';
import { getDb, updateOne, insertOne, Seed } from '@/lib/mongo';

export async function GET() {
  try {
    const seeds = await getDb().then(db => db.collection<Seed>('seeds').find({}).toArray());
    
    // Convert to key-value format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seedConfig: Record<string, any> = {};
    for (const seed of seeds) {
      const [page, flag] = seed.key.split('.');
      if (!seedConfig[page]) {
        seedConfig[page] = {};
      }
      seedConfig[page][flag] = seed.value;
    }
    
    return NextResponse.json(seedConfig);
  } catch (error) {
    console.error('Error fetching seeds:', error);
    return NextResponse.json({ error: 'Failed to fetch seeds' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Dev-only protection
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
    }

    const body = await request.json();
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const updates: Array<Promise<unknown>> = [];

    // Process each page's seeds
    for (const [page, flags] of Object.entries(body)) {
      if (page === 'mode') continue;
      
      if (typeof flags !== 'object') continue;
      
      for (const [flag, value] of Object.entries(flags as Record<string, boolean>)) {
        const key = `${page}.${flag}`;
        
        updates.push(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updateOne('seeds', { key } as any, { 
            $set: { 
              key, 
              value: Boolean(value), 
              updatedAt: new Date() 
            } 
          }).then(async (updated) => {
            if (!updated) {
              await insertOne('seeds', {
                key,
                value: Boolean(value),
                updatedAt: new Date(),
              } as unknown as Seed);
            }
          })
        );
      }
    }

    await Promise.all(updates);

    return NextResponse.json({ success: true, updated: body });
  } catch (error) {
    console.error('Error updating seeds:', error);
    return NextResponse.json({ error: 'Failed to update seeds' }, { status: 500 });
  }
}
