import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const RESEARCH_DIR = path.join(process.cwd(), 'research');

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('file');

    if (!filename) {
      return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
    }

    // Security: sanitize filename to prevent path traversal
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(RESEARCH_DIR, sanitizedFilename);

    // Verify the file is within research directory
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(RESEARCH_DIR))) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);

    return NextResponse.json({
      filename: sanitizedFilename,
      content,
      lastModified: stats.mtime.toISOString(),
    });
  } catch (error) {
    console.error('Error reading research file:', error);
    return NextResponse.json({ error: 'Failed to read research file' }, { status: 500 });
  }
}
