export type TimelineStatus = 'completed' | 'current';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface Skill {
  id: string;
  name: string;
  sortOrder: number;
  categoryId: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  sortOrder: number;
  skills: Skill[];
}

export interface TimelineItem {
  id: string;
  yearLabel: string;
  title: string;
  description: string;
  status: TimelineStatus;
  sortOrder: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

export interface SiteSettings {
  id: string;
  resumeUrl: string;
}
