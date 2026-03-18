import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const RESEARCH_DIR = path.join(process.cwd(), 'research');

export async function GET() {
  try {
    if (!fs.existsSync(RESEARCH_DIR)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(RESEARCH_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const stats = fs.statSync(path.join(RESEARCH_DIR, file));
        return {
          filename: file,
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
        };
      });

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing research files:', error);
    return NextResponse.json({ error: 'Failed to list research files' }, { status: 500 });
  }
}
