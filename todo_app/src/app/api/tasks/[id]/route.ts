import { NextRequest, NextResponse } from 'next/server';
import { findOne, updateOne, deleteOne } from '@/lib/mongo';
import { Task } from '@/lib/mongo';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const task = await findOne<Task>('tasks', { _id: new ObjectId(id) });
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateFields.title = body.title;
    if (body.description !== undefined) updateFields.description = body.description;
    if (body.completed !== undefined) updateFields.completed = body.completed;
    if (body.dueDate !== undefined) updateFields.dueDate = new Date(body.dueDate);
    if (body.projectId !== undefined) updateFields.projectId = body.projectId;
    if (body.tags !== undefined) updateFields.tags = body.tags;

    const updated = await updateOne('tasks', { _id: new ObjectId(id) }, { $set: updateFields });
    
    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const task = await findOne<Task>('tasks', { _id: new ObjectId(id) });
    
    return NextResponse.json({ 
      success: true, 
      task 
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const deleted = await deleteOne('tasks', { _id: new ObjectId(id) });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
