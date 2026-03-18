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
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="card p-8 mb-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-0">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-white" data-testid="home-title">
            Welcome to TodoApp
          </h1>
          <p className="text-lg text-indigo-100 mb-6 max-w-2xl">
            Manage your tasks, projects, and schedule all in one beautiful place. 
            Stay organized and boost your productivity.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <SeededButton
              seedPage="home"
              seedFlag="ambiguous_cta"
              onClick={handleQuickAdd}
              className="bg-white text-indigo-600 hover:bg-indigo-50 border-0"
              data-testid="home-quick-add-btn"
            >
              {ambiguousCta ? 'Do It' : '✨ Create Task'}
            </SeededButton>
            
            <Link href="/projects">
              <SeededButton 
                seedPage="home" 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                data-testid="home-projects-btn"
              >
                📁 View Projects
              </SeededButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/tasks" className="card p-6 hover-lift animate-fade-in animate-delay-100" data-testid="home-tasks-card">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tasks</h2>
          <p className="text-gray-600 mb-4">View and manage all your tasks with ease</p>
          <span className="text-indigo-600 font-medium flex items-center gap-1">
            Go to Tasks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="card p-6 hover-lift animate-fade-in animate-delay-200" data-testid="home-projects-card">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600 mb-4">Organize tasks into projects</p>
          <span className="text-indigo-600 font-medium flex items-center gap-1">
            Go to Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/calendar" className="card p-6 hover-lift animate-fade-in animate-delay-300" data-testid="home-calendar-card">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Calendar</h2>
          <p className="text-gray-600 mb-4">Schedule and plan ahead</p>
          <span className="text-indigo-600 font-medium flex items-center gap-1">
            Go to Calendar
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="card p-6 mt-8 animate-fade-in animate-delay-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-3xl font-bold text-indigo-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Tasks Today</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Projects</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
            <div className="text-3xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Upcoming</div>
          </div>
        </div>
      </div>

      <SeededModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="✨ Quick Add Task"
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
              className="input-modern"
              placeholder="What needs to be done?"
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
