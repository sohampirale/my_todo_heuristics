'use client';

import { useState, useMemo } from 'react';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  dueDate?: string;
}

const sampleTasks: Task[] = [
  { id: '1', title: 'Complete project proposal', description: 'Write and submit the Q2 project proposal', completed: false, tags: ['work', 'urgent'], dueDate: '2026-03-20' },
  { id: '2', title: 'Review pull requests', description: 'Review pending PRs in the main repo', completed: true, tags: ['work'], dueDate: '2026-03-18' },
  { id: '3', title: 'Buy groceries', description: 'Milk, eggs, bread, vegetables', completed: false, tags: ['personal'], dueDate: '2026-03-16' },
  { id: '4', title: 'Schedule dentist appointment', description: 'Annual checkup', completed: false, tags: ['personal', 'health'], dueDate: '2026-03-25' },
  { id: '5', title: 'Write documentation', description: 'Update API docs for v2.0', completed: false, tags: ['work'], dueDate: '2026-03-22' },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'alphabetical' | 'status'>('date');
  const [showCompleted, setShowCompleted] = useState(true);

  const filtersReset = isSeedEnabled('search', 'filters_reset');
  const missingNoResultsHelp = isSeedEnabled('search', 'missing_no_results_help');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sampleTasks.forEach(task => task.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredTasks = useMemo(() => {
    let results = sampleTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => task.tags.includes(tag));
      const matchesCompleted = showCompleted || !task.completed;
      return matchesSearch && matchesTags && matchesCompleted;
    });

    results = [...results].sort((a, b) => {
      if (sortBy === 'date') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else {
        return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
      }
    });

    return results;
  }, [searchQuery, selectedTags, sortBy, showCompleted]);

  // Seed: filters reset when sorting changes (side effect)
  if (filtersReset && sortBy === 'alphabetical' && selectedTags.length > 0) {
    setSelectedTags([]);
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('date');
    setShowCompleted(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2" data-testid="search-title">
          🔍 Search & Filters
        </h1>
        <p className="text-gray-600">Find tasks quickly with powerful search</p>
      </div>

      {/* Search Bar */}
      <div className="card p-6 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="input-modern pl-12"
              data-testid="search-input"
            />
          </div>
          <SeededButton seedPage="search" type="button" data-testid="search-btn">
            Search
          </SeededButton>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" data-testid="search-filters-title">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h2>
          <SeededButton
            seedPage="search"
            variant="secondary"
            size="sm"
            onClick={handleClearFilters}
            data-testid="search-clear-filters"
          >
            Clear All
          </SeededButton>
        </div>

        {/* Tags Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`badge transition-all ${
                  selectedTags.includes(tag)
                    ? 'badge-primary scale-105 shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                data-testid={`search-tag-${tag}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'date' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
              }`}
              data-testid="search-sort-date"
            >
              📅 Due Date
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'alphabetical' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
              }`}
              data-testid="search-sort-alpha"
            >
              🔤 Alphabetical
            </button>
            <button
              onClick={() => setSortBy('status')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'status' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
              }`}
              data-testid="search-sort-status"
            >
              ✓ Status
            </button>
          </div>
        </div>

        {/* Show Completed Toggle */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <input
            type="checkbox"
            id="show-completed"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2"
            data-testid="search-show-completed"
          />
          <label htmlFor="show-completed" className="text-sm text-gray-700 font-medium">
            Show completed tasks
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between" data-testid="search-results-title">
          <span>Results</span>
          <span className="badge badge-primary">{filteredTasks.length}</span>
        </h2>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12" data-testid="search-no-results">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">No tasks found</p>
            {!missingNoResultsHelp && (
              <div className="text-sm text-gray-600 max-w-md mx-auto">
                <p className="font-medium mb-2">Try:</p>
                <ul className="list-disc list-inside space-y-1 text-left">
                  <li>Using different keywords</li>
                  <li>Removing some filters</li>
                  <li>Checking for typos</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-md hover:border-indigo-200 ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                }`}
                data-testid={`search-result-${task.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {task.dueDate && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md" data-testid={`search-result-due-${task.id}`}>
                          📅 {task.dueDate}
                        </span>
                      )}
                      <div className="flex gap-1">
                        {task.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs badge badge-primary"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.completed ? 'badge badge-success' : 'badge badge-warning'
                  }`}>
                    {task.completed ? '✓ Complete' : '⏳ Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
