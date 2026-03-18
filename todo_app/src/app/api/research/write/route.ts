import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const RESEARCH_DIR = path.join(process.cwd(), 'research');

export async function POST(request: NextRequest) {
  try {
    // Dev-only protection
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
    }

    const body = await request.json();
    const { filename, content } = body;

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid filename' }, { status: 400 });
    }

    if (content === undefined || typeof content !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid content' }, { status: 400 });
    }

    // Security: sanitize filename to prevent path traversal
    let sanitizedFilename = path.basename(filename);
    
    // Ensure .md extension
    if (!sanitizedFilename.endsWith('.md')) {
      sanitizedFilename = sanitizedFilename + '.md';
    }

    const filePath = path.join(RESEARCH_DIR, sanitizedFilename);

    // Verify the file is within research directory
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(RESEARCH_DIR))) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    // Ensure research directory exists
    if (!fs.existsSync(RESEARCH_DIR)) {
      fs.mkdirSync(RESEARCH_DIR, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf-8');

    return NextResponse.json({
      success: true,
      filename: sanitizedFilename,
      path: filePath,
    }, { status: 201 });
  } catch (error) {
    console.error('Error writing research file:', error);
    return NextResponse.json({ error: 'Failed to write research file' }, { status: 500 });
  }
}
