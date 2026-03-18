'use client';

import { useState, useEffect } from 'react';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface Task {
  _id?: string;
  id?: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const noConfirmDelete = isSeedEnabled('tasks', 'no_confirm_delete');

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const url = filter !== 'all' ? `/api/tasks?filter=${filter}` : '/api/tasks';
      const res = await fetch(url);
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (res.ok) {
        const data = await res.json();
        setTasks([...tasks, data.task]);
        setNewTaskTitle('');
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t._id === id || t.id === id);
    if (!task) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (res.ok) {
        setTasks(tasks.map(t =>
          (t._id === id || t.id === id) ? { ...t, completed: !task.completed } : t
        ));
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!noConfirmDelete && !confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id && t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleBulkComplete = async () => {
    try {
      const promises = Array.from(selectedTasks).map(id =>
        fetch(`/api/tasks/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: true }),
        })
      );
      await Promise.all(promises);
      
      setTasks(tasks.map(task =>
        selectedTasks.has(task._id || task.id || '') ? { ...task, completed: true } : task
      ));
      setSelectedTasks(new Set());
    } catch (error) {
      console.error('Failed to bulk complete:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (!noConfirmDelete && !confirm('Delete selected tasks?')) {
      return;
    }

    try {
      const promises = Array.from(selectedTasks).map(id =>
        fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      );
      await Promise.all(promises);
      
      setTasks(tasks.filter(task => !selectedTasks.has(task._id || task.id || '')));
      setSelectedTasks(new Set());
    } catch (error) {
      console.error('Failed to bulk delete:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2" data-testid="tasks-title">
          📋 Tasks
        </h1>
        <p className="text-gray-600">Manage your tasks and stay productive</p>
      </div>

      {/* Add Task Form */}
      <div className="card p-6 mb-6">
        <form onSubmit={handleAddTask} className="flex gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="➕ Add a new task..."
            className="input-modern flex-1"
            data-testid="tasks-new-input"
          />
          <SeededButton seedPage="tasks" type="submit" data-testid="tasks-add-btn" disabled={loading}>
            {loading ? '...' : 'Add Task'}
          </SeededButton>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8" data-testid="tasks-loading">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Filters and Bulk Actions */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              data-testid="tasks-filter-all"
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'active' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              data-testid="tasks-filter-active"
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'completed' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50'
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
                ✓ Complete
              </SeededButton>
              <SeededButton
                seedPage="tasks"
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
                data-testid="tasks-bulk-delete"
              >
                🗑 Delete
              </SeededButton>
            </div>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="card overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center" data-testid="tasks-empty">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No tasks found</p>
            <p className="text-gray-400 text-sm mt-1">Add a new task to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTasks.map(task => {
              const taskId = task._id || task.id || '';
              return (
              <div
                key={taskId}
                className={`flex items-center gap-4 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                  task.completed ? 'bg-gray-50' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTasks.has(taskId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTasks(new Set([...selectedTasks, taskId]));
                    } else {
                      const newSet = new Set(selectedTasks);
                      newSet.delete(taskId);
                      setSelectedTasks(newSet);
                    }
                  }}
                  data-testid={`tasks-checkbox-${taskId}`}
                  className="w-5 h-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                />
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(taskId)}
                  data-testid={`tasks-toggle-${taskId}`}
                  className="w-5 h-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                />
                <span className={`flex-1 font-medium ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                }`}>
                  {task.title}
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-testid={`tasks-due-${taskId}`}>
                    📅 {task.dueDate}
                  </span>
                )}
                <button
                  onClick={() => handleDeleteTask(taskId)}
                  className={`text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all ${
                    isSeedEnabled('tasks', 'small_hit_target') ? 'tiny-hit-target' : ''
                  }`}
                  data-testid={`tasks-delete-${taskId}`}
                  aria-label={`Delete task: ${task.title}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );})}
          </div>
        )}
      </div>
    </div>
  );
}
