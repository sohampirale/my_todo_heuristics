import { NextRequest, NextResponse } from 'next/server';
import { find, insertOne } from '@/lib/mongo';
import { Project } from '@/lib/mongo';

export async function GET() {
  try {
    const projects = await find<Project>('projects');
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, color } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const project: Project = {
      name,
      color: color || 'bg-blue-500',
      createdAt: new Date(),
    };

    const id = await insertOne('projects', project);
    
    return NextResponse.json({ 
      success: true, 
      project: { ...project, _id: id } 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
