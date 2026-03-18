'use client';

import { useState } from 'react';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
}

export default function CalendarPage() {
  const [view, setView] = useState<'day' | 'week'>('week');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 15));
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: 'Team meeting', date: '2026-03-15', time: '10:00' },
    { id: '2', title: 'Project deadline', date: '2026-03-18', time: '17:00' },
    { id: '3', title: 'Code review', date: '2026-03-16', time: '14:00' },
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const noSpinner = isSeedEnabled('calendar', 'no_spinner');
  const ambiguousTimepicker = isSeedEnabled('calendar', 'ambiguous_timepicker');

  const getDaysInWeek = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handlePrevWeek = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
      setIsLoading(false);
    }, 500);
  };

  const handleNextWeek = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
      setIsLoading(false);
    }, 500);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: currentDate.toISOString().split('T')[0],
      time: newEventTime || undefined,
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setNewEventTime('');
  };

  const formatTime = (time?: string) => {
    if (!time) return '';
    if (ambiguousTimepicker) {
      return time;
    }
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const days = getDaysInWeek();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="calendar-title">
        Calendar
      </h1>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SeededButton
              seedPage="calendar"
              variant="secondary"
              size="sm"
              onClick={handlePrevWeek}
              data-testid="calendar-prev-week"
            >
              ← Previous
            </SeededButton>
            <SeededButton
              seedPage="calendar"
              variant="secondary"
              size="sm"
              onClick={handleNextWeek}
              data-testid="calendar-next-week"
            >
              Next →
            </SeededButton>
            <h2 className="text-lg font-semibold text-gray-900" data-testid="calendar-current-week">
              Week of {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-md text-sm ${
                view === 'day' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="calendar-view-day"
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-md text-sm ${
                view === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid="calendar-view-week"
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && !noSpinner && (
        <div className="flex justify-center mb-4" data-testid="calendar-loading">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {view === 'week' ? (
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div
                key={index}
                className="border rounded-lg p-2 min-h-32"
                data-testid={`calendar-day-${index}`}
              >
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-gray-500">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-semibold ${
                    day.toDateString() === new Date().toDateString() ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                </div>
                <div className="space-y-1">
                  {getEventsForDay(day).map(event => (
                    <div
                      key={event.id}
                      className="text-xs bg-blue-100 text-blue-600 rounded px-2 py-1 cursor-pointer hover:bg-blue-200"
                      data-testid={`calendar-event-${event.id}`}
                    >
                      {event.title}
                      {event.time && <div className="text-gray-500">{formatTime(event.time)}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4" data-testid="calendar-day-view-title">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <div className="space-y-2">
              {getEventsForDay(currentDate).map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 bg-blue-50 rounded-md"
                  data-testid={`calendar-day-event-${event.id}`}
                >
                  <div className="text-sm font-medium text-gray-500">
                    {formatTime(event.time)}
                  </div>
                  <div className="flex-1 text-gray-900">{event.title}</div>
                </div>
              ))}
              {getEventsForDay(currentDate).length === 0 && (
                <p className="text-gray-500 text-center py-8" data-testid="calendar-no-events">
                  No events for this day
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Event Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" data-testid="calendar-create-title">
          Create Event
        </h3>
        <form onSubmit={handleCreateEvent} className="flex gap-4">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Event title"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="calendar-event-input"
          />
          <input
            type="time"
            value={newEventTime}
            onChange={(e) => setNewEventTime(e.target.value)}
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              ambiguousTimepicker ? 'w-24' : ''
            }`}
            data-testid="calendar-time-input"
          />
          <SeededButton seedPage="calendar" type="submit" data-testid="calendar-create-btn">
            Add Event
          </SeededButton>
        </form>
      </div>
    </div>
  );
}
