'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SeededButton, SeededModal } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  
  const ambiguousCta = isSeedEnabled('home', 'ambiguous_cta');

  const handleQuickAdd = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick add task:', taskTitle);
    setTaskTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="home-title">
          Welcome to TodoApp
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your tasks, projects, and schedule all in one place.
        </p>
        
        <div className="flex gap-4">
          <SeededButton
            seedPage="home"
            seedFlag="ambiguous_cta"
            onClick={handleQuickAdd}
            data-testid="home-quick-add-btn"
          >
            {ambiguousCta ? 'Do It' : 'Create Task'}
          </SeededButton>
          
          <Link href="/projects">
            <SeededButton seedPage="home" variant="secondary" data-testid="home-projects-btn">
              View Projects
            </SeededButton>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2" data-testid="home-tasks-card">
            Tasks
          </h2>
          <p className="text-gray-600 mb-4">View and manage all your tasks</p>
          <Link href="/tasks" className="text-blue-600 hover:underline">
            Go to Tasks →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2" data-testid="home-projects-card">
            Projects
          </h2>
          <p className="text-gray-600 mb-4">Organize tasks into projects</p>
          <Link href="/projects" className="text-blue-600 hover:underline">
            Go to Projects →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2" data-testid="home-calendar-card">
            Calendar
          </h2>
          <p className="text-gray-600 mb-4">Schedule and plan ahead</p>
          <Link href="/calendar" className="text-blue-600 hover:underline">
            Go to Calendar →
          </Link>
        </div>
      </div>

      <SeededModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Add Task"
        seedPage="home"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              data-testid="quick-add-input"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <SeededButton
              seedPage="home"
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              data-testid="quick-add-cancel"
            >
              Cancel
            </SeededButton>
            <SeededButton
              seedPage="home"
              type="submit"
              data-testid="quick-add-submit"
            >
              Add Task
            </SeededButton>
          </div>
        </form>
      </SeededModal>
    </div>
  );
}
