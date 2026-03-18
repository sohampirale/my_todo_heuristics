'use client';

import { useState } from 'react';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', completed: false, dueDate: '2026-03-20' },
    { id: '2', title: 'Review pull requests', completed: true, dueDate: '2026-03-18' },
    { id: '3', title: 'Write documentation', completed: false, dueDate: '2026-03-22' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const noConfirmDelete = isSeedEnabled('tasks', 'no_confirm_delete');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    if (!noConfirmDelete && !confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleBulkComplete = () => {
    setTasks(tasks.map(task => 
      selectedTasks.has(task.id) ? { ...task, completed: true } : task
    ));
    setSelectedTasks(new Set());
  };

  const handleBulkDelete = () => {
    if (!noConfirmDelete && !confirm('Delete selected tasks?')) {
      return;
    }
    setTasks(tasks.filter(task => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="tasks-title">
        Tasks
      </h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="tasks-new-input"
          />
          <SeededButton seedPage="tasks" type="submit" data-testid="tasks-add-btn">
            Add Task
          </SeededButton>
        </div>
      </form>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'all' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="tasks-filter-all"
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'active' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="tasks-filter-active"
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'completed' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="tasks-filter-completed"
            >
              Completed
            </button>
          </div>

          {selectedTasks.size > 0 && (
            <div className="flex gap-2">
              <SeededButton
                seedPage="tasks"
                variant="secondary"
                size="sm"
                onClick={handleBulkComplete}
                data-testid="tasks-bulk-complete"
              >
                Complete Selected
              </SeededButton>
              <SeededButton
                seedPage="tasks"
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
                data-testid="tasks-bulk-delete"
              >
                Delete Selected
              </SeededButton>
            </div>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow-md divide-y">
        {filteredTasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500" data-testid="tasks-empty">
            No tasks found
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 ${
                task.completed ? 'bg-gray-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTasks.has(task.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTasks(new Set([...selectedTasks, task.id]));
                  } else {
                    const newSet = new Set(selectedTasks);
                    newSet.delete(task.id);
                    setSelectedTasks(newSet);
                  }
                }}
                data-testid={`tasks-checkbox-${task.id}`}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                data-testid={`tasks-toggle-${task.id}`}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </span>
              {task.dueDate && (
                <span className="text-sm text-gray-500" data-testid={`tasks-due-${task.id}`}>
                  Due: {task.dueDate}
                </span>
              )}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={`text-red-500 hover:text-red-700 focus:outline-none ${
                  isSeedEnabled('tasks', 'small_hit_target') ? 'tiny-hit-target' : 'p-2'
                }`}
                data-testid={`tasks-delete-${task.id}`}
                aria-label={`Delete task: ${task.title}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
