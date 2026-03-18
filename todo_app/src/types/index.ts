export interface Task {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  projectId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id?: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface SeedFlags {
  mode: 'lite' | 'full';
  home?: Record<string, boolean>;
  auth?: Record<string, boolean>;
  tasks?: Record<string, boolean>;
  task?: Record<string, boolean>;
  projects?: Record<string, boolean>;
  calendar?: Record<string, boolean>;
  search?: Record<string, boolean>;
  settings?: Record<string, boolean>;
  onboarding?: Record<string, boolean>;
}

export interface User {
  _id?: string;
  email: string;
  name?: string;
  createdAt: string;
}
