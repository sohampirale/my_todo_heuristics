'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  tags: string[];
}

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  
  const [task, setTask] = useState<Task>({
    id: taskId,
    title: 'Sample Task',
    description: 'This is a sample task description.',
    dueDate: '2026-03-20',
    completed: false,
    tags: ['work', 'urgent'],
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<string[]>(['Task created', 'Updated description']);

  const saveAffordanceConfusing = isSeedEnabled('task', 'save_affordance_confusing');
  const nonstandardDate = isSeedEnabled('task', 'nonstandard_date_format');

  const formatDueDate = (date: string) => {
    if (nonstandardDate) {
      return date.replace(/-/g, '');
    }
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSave = () => {
    setTask({
      ...task,
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
          data-testid="task-back-btn"
        >
          ← Back to Tasks
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          {isEditing ? (
            <div className="flex-1">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-2xl font-bold border-b-2 border-blue-500 focus:outline-none mb-2"
                data-testid="task-edit-title"
              />
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900" data-testid="task-title">
              {task.title}
            </h1>
          )}
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <SeededButton
                  seedPage="task"
                  seedFlag="save_affordance_confusing"
                  variant={saveAffordanceConfusing ? 'secondary' : 'primary'}
                  onClick={handleSave}
                  data-testid="task-save-btn"
                >
                  Save
                </SeededButton>
                <SeededButton
                  seedPage="task"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  data-testid="task-cancel-btn"
                >
                  Cancel
                </SeededButton>
              </>
            ) : (
              <SeededButton
                seedPage="task"
                variant="secondary"
                onClick={() => setIsEditing(true)}
                data-testid="task-edit-btn"
              >
                Edit
              </SeededButton>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              data-testid="task-edit-description"
            />
          ) : (
            <p className="text-gray-900" data-testid="task-description">
              {task.description}
            </p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Due Date</h2>
          {isEditing ? (
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="task-edit-due-date"
            />
          ) : (
            <p className="text-gray-900" data-testid="task-due-date">
              {formatDueDate(task.dueDate)}
            </p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2" data-testid="task-tags">
            {task.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            data-testid="task-completed-checkbox"
          />
          <label className="text-gray-700">Mark as complete</label>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="task-comments-title">
          Comments
        </h2>
        
        <div className="space-y-3 mb-6">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-md"
              data-testid={`task-comment-${index}`}
            >
              <p className="text-gray-700">{comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="task-comment-input"
          />
          <SeededButton seedPage="task" type="submit" data-testid="task-comment-submit">
            Add Comment
          </SeededButton>
        </form>
      </div>
    </div>
  );
}
