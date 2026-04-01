import { AdminUser, Project, SiteSettings, SkillCategory, TimelineItem } from '@/types/cms';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const tokenStorageKey = 'cms_auth_token';

export const authToken = {
  get: () => localStorage.getItem(tokenStorageKey),
  set: (token: string) => localStorage.setItem(tokenStorageKey, token),
  clear: () => localStorage.removeItem(tokenStorageKey),
};

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
};

type UploadResponse = {
  url: string;
  relativePath: string;
  filename: string;
  size: number;
  mimeType: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = authToken.get();

  if (options.auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function upload(path: string, file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const headers: Record<string, string> = {};
  const token = authToken.get();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Upload failed');
  }

  return response.json() as Promise<UploadResponse>;
}

export const cmsApi = {
  getProjects: () => request<Project[]>('/projects'),
  getTimeline: () => request<TimelineItem[]>('/timeline'),
  getSkills: () => request<SkillCategory[]>('/skills'),

  getAdminProjects: () => request<Project[]>('/projects/admin', { auth: true }),
  getAdminTimeline: () => request<TimelineItem[]>('/timeline/admin', { auth: true }),
  getAdminSkills: () => request<SkillCategory[]>('/skills/admin', { auth: true }),
  getPublicSettings: () => request<SiteSettings>('/settings/public'),
  getAdminSettings: () => request<SiteSettings>('/settings/admin', { auth: true }),

  createProject: (payload: Omit<Project, 'id'>) =>
    request<Project>('/projects', { method: 'POST', body: payload, auth: true }),
  updateProject: (id: string, payload: Partial<Omit<Project, 'id'>>) =>
    request<Project>(`/projects/${id}`, { method: 'PATCH', body: payload, auth: true }),
  deleteProject: (id: string) =>
    request<{ message: string }>(`/projects/${id}`, { method: 'DELETE', auth: true }),

  createSkillCategory: (payload: { name: string; sortOrder: number }) =>
    request('/skill-categories', { method: 'POST', body: payload, auth: true }),
  updateSkillCategory: (id: string, payload: Partial<{ name: string; sortOrder: number }>) =>
    request(`/skill-categories/${id}`, {
      method: 'PATCH',
      body: payload,
      auth: true,
    }),
  deleteSkillCategory: (id: string) =>
    request(`/skill-categories/${id}`, { method: 'DELETE', auth: true }),

  createSkill: (payload: {
    categoryId: string;
    name: string;
    sortOrder: number;
  }) => request('/skills', { method: 'POST', body: payload, auth: true }),
  updateSkill: (
    id: string,
    payload: Partial<{
      categoryId: string;
      name: string;
      sortOrder: number;
    }>,
  ) => request(`/skills/${id}`, { method: 'PATCH', body: payload, auth: true }),
  deleteSkill: (id: string) => request(`/skills/${id}`, { method: 'DELETE', auth: true }),
  updateSettings: (payload: { resumeUrl: string }) =>
    request<SiteSettings>('/settings', { method: 'PATCH', body: payload, auth: true }),
  uploadProjectImage: (file: File) => upload('/uploads/project-image', file),
  uploadResume: (file: File) => upload('/uploads/resume', file),

  createTimeline: (payload: Omit<TimelineItem, 'id'>) =>
    request<TimelineItem>('/timeline', { method: 'POST', body: payload, auth: true }),
  updateTimeline: (id: string, payload: Partial<Omit<TimelineItem, 'id'>>) =>
    request<TimelineItem>(`/timeline/${id}`, { method: 'PATCH', body: payload, auth: true }),
  deleteTimeline: (id: string) =>
    request<{ message: string }>(`/timeline/${id}`, { method: 'DELETE', auth: true }),

  me: () => request<AdminUser>('/auth/me', { auth: true }),
  logout: () => request<{ message: string }>('/auth/logout', { method: 'POST', auth: true }),
  googleLoginUrl: `${API_BASE}/auth/google`,
};
