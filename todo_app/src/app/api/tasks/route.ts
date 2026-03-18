import { NextRequest, NextResponse } from 'next/server';
import { find, insertOne } from '@/lib/mongo';
import { Task } from '@/lib/mongo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');
    const projectId = searchParams.get('projectId');

    const query: Record<string, unknown> = {};
    
    if (projectId) {
      query.projectId = projectId;
    }

    const tasks = await find<Task>('tasks', query);

    // Apply client-side filter if needed (for completed/active)
    let filteredTasks = tasks;
    if (filter === 'active') {
      filteredTasks = tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter(t => t.completed);
    }

    return NextResponse.json({ tasks: filteredTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, dueDate, projectId, tags } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const task: Task = {
      title,
      description: description || '',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completed: false,
      projectId: projectId || '',
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const id = await insertOne('tasks', task);
    
    return NextResponse.json({ 
      success: true, 
      task: { ...task, _id: id } 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
