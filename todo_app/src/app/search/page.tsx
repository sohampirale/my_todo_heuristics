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

    // Sort results
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
    // This is an intentional UX fault - filters reset unexpectedly
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="search-title">
        Search & Filters
      </h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="search-input"
          />
          <SeededButton seedPage="search" type="button" data-testid="search-btn">
            Search
          </SeededButton>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900" data-testid="search-filters-title">
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
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                data-testid={`search-tag-${tag}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'date' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="search-sort-date"
            >
              Due Date
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'alphabetical' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="search-sort-alpha"
            >
              Alphabetical
            </button>
            <button
              onClick={() => setSortBy('status')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'status' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="search-sort-status"
            >
              Status
            </button>
          </div>
        </div>

        {/* Show Completed Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-completed"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            data-testid="search-show-completed"
          />
          <label htmlFor="show-completed" className="text-sm text-gray-700">
            Show completed tasks
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4" data-testid="search-results-title">
          Results ({filteredTasks.length})
        </h2>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12" data-testid="search-no-results">
            <p className="text-gray-500 mb-4">No tasks found matching your criteria</p>
            {!missingNoResultsHelp && (
              <div className="text-sm text-gray-600">
                <p>Try:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
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
                className={`p-4 rounded-lg border ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                }`}
                data-testid={`search-result-${task.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {task.dueDate && (
                        <span className="text-xs text-gray-500" data-testid={`search-result-due-${task.id}`}>
                          Due: {task.dueDate}
                        </span>
                      )}
                      <div className="flex gap-1">
                        {task.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 text-blue-600 rounded px-2 py-0.5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.completed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {task.completed ? 'Complete' : 'Active'}
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
