'use client';

import { useState } from 'react';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

interface Project {
  id: string;
  name: string;
  color: string;
  tasks: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', color: 'bg-blue-500', tasks: ['Design mockups', 'Implement homepage'] },
    { id: '2', name: 'Mobile App', color: 'bg-green-500', tasks: ['Setup React Native', 'Create login screen'] },
    { id: '3', name: 'Documentation', color: 'bg-purple-500', tasks: ['Write API docs'] },
  ]);
  
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');

  const iconsInconsistent = isSeedEnabled('projects', 'icons_inconsistent');
  const hiddenControls = isSeedEnabled('projects', 'hidden_controls');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      color: colors[Math.floor(Math.random() * colors.length)],
      tasks: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectName('');
  };

  const handleAddTaskToProject = (projectId: string) => {
    if (!newTaskName.trim()) return;
    
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, tasks: [...project.tasks, newTaskName] }
        : project
    ));
    setNewTaskName('');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    if (selectedProject === projectId) {
      setSelectedProject(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="projects-title">
        Projects
      </h1>

      {/* Create Project Form */}
      <form onSubmit={handleCreateProject} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="projects-new-input"
          />
          <SeededButton seedPage="projects" type="submit" data-testid="projects-create-btn">
            Create Project
          </SeededButton>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" data-testid="projects-list-title">
              All Projects
            </h2>
            <div className="space-y-2">
              {projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                    selectedProject === project.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  data-testid={`project-item-${project.id}`}
                >
                  <div className={`w-4 h-4 rounded ${project.color}`} data-testid={`project-color-${project.id}`} />
                  <span className="flex-1 text-gray-900">{project.name}</span>
                  <span className="text-sm text-gray-500">{project.tasks.length} tasks</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                    className={`text-red-500 hover:text-red-700 ${
                      hiddenControls ? 'hidden-on-hover' : ''
                    }`}
                    data-testid={`project-delete-${project.id}`}
                    aria-label={`Delete project: ${project.name}`}
                  >
                    {iconsInconsistent ? (
                      <span className="text-xs">Delete</span>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                
                return (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-6 h-6 rounded ${project.color}`} />
                      <h2 className="text-xl font-semibold text-gray-900" data-testid="project-detail-title">
                        {project.name}
                      </h2>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 mb-3">Tasks in this project</h3>
                    
                    <div className="space-y-2 mb-4">
                      {project.tasks.length === 0 ? (
                        <p className="text-gray-500 text-sm" data-testid="project-no-tasks">
                          No tasks yet
                        </p>
                      ) : (
                        project.tasks.map((task, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
                            data-testid={`project-task-${index}`}
                          >
                            <div
                              className={`w-1 h-4 cursor-move ${hiddenControls ? 'hidden-on-hover' : ''}`}
                              style={{ touchAction: 'none' }}
                              data-testid={`project-task-drag-${index}`}
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
                              </svg>
                            </div>
                            <span className="flex-1 text-gray-900">{task}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTaskToProject(project.id);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Add task to this project..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="project-add-task-input"
                      />
                      <SeededButton seedPage="projects" type="submit" data-testid="project-add-task-btn">
                        Add Task
                      </SeededButton>
                    </form>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500" data-testid="project-select-prompt">
                Select a project to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
