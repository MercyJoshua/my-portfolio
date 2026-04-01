import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cmsApi, authToken } from '@/lib/cms-api';
import { Project, SiteSettings, SkillCategory, TimelineItem } from '@/types/cms';

const parseList = (value: string) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'timeline' | 'settings'>(
    'projects',
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      authToken.set(token);
      params.delete('token');
      const nextQuery = params.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, []);

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: cmsApi.me,
    retry: false,
    enabled: Boolean(authToken.get()),
  });

  const projectsQuery = useQuery({
    queryKey: ['projects', 'admin'],
    queryFn: cmsApi.getAdminProjects,
    enabled: !!meQuery.data,
  });

  const skillsQuery = useQuery({
    queryKey: ['skills', 'admin'],
    queryFn: cmsApi.getAdminSkills,
    enabled: !!meQuery.data,
  });

  const timelineQuery = useQuery({
    queryKey: ['timeline', 'admin'],
    queryFn: cmsApi.getAdminTimeline,
    enabled: !!meQuery.data,
  });

  const settingsQuery = useQuery({
    queryKey: ['settings', 'admin'],
    queryFn: cmsApi.getAdminSettings,
    enabled: !!meQuery.data,
  });

  const invalidateAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['projects'] }),
      queryClient.invalidateQueries({ queryKey: ['skills'] }),
      queryClient.invalidateQueries({ queryKey: ['timeline'] }),
      queryClient.invalidateQueries({ queryKey: ['settings'] }),
    ]);
  };

  const logoutMutation = useMutation({
    mutationFn: cmsApi.logout,
    onSettled: async () => {
      authToken.clear();
      await queryClient.clear();
      window.location.href = '/admin';
    },
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
    sortOrder: 0,
    isPublished: true,
  });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const createProjectMutation = useMutation({
    mutationFn: () =>
      cmsApi.createProject({
        title: projectForm.title,
        description: projectForm.description,
        imageUrl: projectForm.imageUrl,
        techStack: parseList(projectForm.techStack),
        githubUrl: projectForm.githubUrl,
        demoUrl: projectForm.demoUrl,
        sortOrder: Number(projectForm.sortOrder),
        isPublished: projectForm.isPublished,
      }),
    onSuccess: async () => {
      setProjectForm({
        title: '',
        description: '',
        imageUrl: '',
        techStack: '',
        githubUrl: '',
        demoUrl: '',
        sortOrder: 0,
        isPublished: true,
      });
      await invalidateAll();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<Project, 'id'>> }) =>
      cmsApi.updateProject(id, payload),
    onSuccess: async () => {
      setEditingProjectId(null);
      await invalidateAll();
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: cmsApi.deleteProject,
    onSuccess: invalidateAll,
  });

  const uploadProjectImageMutation = useMutation({
    mutationFn: async () => {
      if (!projectImageFile) {
        throw new Error('Please select an image first');
      }
      return cmsApi.uploadProjectImage(projectImageFile);
    },
    onSuccess: (result) => {
      setProjectForm((prev) => ({ ...prev, imageUrl: result.url }));
      setProjectImageFile(null);
    },
  });

  const [categoryForm, setCategoryForm] = useState({ name: '', sortOrder: 0 });
  const [skillForm, setSkillForm] = useState({
    categoryId: '',
    name: '',
    sortOrder: 0,
  });

  const createCategoryMutation = useMutation({
    mutationFn: () =>
      cmsApi.createSkillCategory({
        name: categoryForm.name,
        sortOrder: Number(categoryForm.sortOrder),
      }),
    onSuccess: async () => {
      setCategoryForm({ name: '', sortOrder: 0 });
      await invalidateAll();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; sortOrder: number } }) =>
      cmsApi.updateSkillCategory(id, payload),
    onSuccess: invalidateAll,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: cmsApi.deleteSkillCategory,
    onSuccess: invalidateAll,
  });

  const createSkillMutation = useMutation({
    mutationFn: () =>
      cmsApi.createSkill({
        categoryId: skillForm.categoryId,
        name: skillForm.name,
        sortOrder: Number(skillForm.sortOrder),
      }),
    onSuccess: async () => {
      setSkillForm({
        categoryId: '',
        name: '',
        sortOrder: 0,
      });
      await invalidateAll();
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        categoryId: string;
        name: string;
        sortOrder: number;
      };
    }) => cmsApi.updateSkill(id, payload),
    onSuccess: invalidateAll,
  });

  const deleteSkillMutation = useMutation({
    mutationFn: cmsApi.deleteSkill,
    onSuccess: invalidateAll,
  });

  const [timelineForm, setTimelineForm] = useState({
    yearLabel: '',
    title: '',
    description: '',
    status: 'completed' as 'completed' | 'current',
    sortOrder: 0,
  });

  const createTimelineMutation = useMutation({
    mutationFn: () =>
      cmsApi.createTimeline({
        yearLabel: timelineForm.yearLabel,
        title: timelineForm.title,
        description: timelineForm.description,
        status: timelineForm.status,
        sortOrder: Number(timelineForm.sortOrder),
      }),
    onSuccess: async () => {
      setTimelineForm({
        yearLabel: '',
        title: '',
        description: '',
        status: 'completed',
        sortOrder: 0,
      });
      await invalidateAll();
    },
  });

  const updateTimelineMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<TimelineItem, 'id'>> }) =>
      cmsApi.updateTimeline(id, payload),
    onSuccess: invalidateAll,
  });

  const deleteTimelineMutation = useMutation({
    mutationFn: cmsApi.deleteTimeline,
    onSuccess: invalidateAll,
  });

  const [resumeUrlForm, setResumeUrlForm] = useState('/resume.pdf');

  useEffect(() => {
    if (settingsQuery.data?.resumeUrl) {
      setResumeUrlForm(settingsQuery.data.resumeUrl);
    }
  }, [settingsQuery.data]);

  const updateSettingsMutation = useMutation({
    mutationFn: () => cmsApi.updateSettings({ resumeUrl: resumeUrlForm }),
    onSuccess: invalidateAll,
  });

  const uploadResumeMutation = useMutation({
    mutationFn: async () => {
      if (!resumeFile) {
        throw new Error('Please select a resume file first');
      }
      return cmsApi.uploadResume(resumeFile);
    },
    onSuccess: (result) => {
      setResumeUrlForm(result.url);
      setResumeFile(null);
    },
  });

  const defaultSkillCategoryId = useMemo(
    () => skillsQuery.data?.[0]?.id ?? '',
    [skillsQuery.data],
  );

  useEffect(() => {
    if (!skillForm.categoryId && defaultSkillCategoryId) {
      setSkillForm((prev) => ({ ...prev, categoryId: defaultSkillCategoryId }));
    }
  }, [defaultSkillCategoryId, skillForm.categoryId]);

  if (!authToken.get()) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">Portfolio CMS Admin</h1>
          <p className="text-gray-400">Sign in with your Google admin account to continue.</p>
          <a
            href={cmsApi.googleLoginUrl}
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-black rounded-lg font-semibold"
          >
            Continue with Google
          </a>
        </div>
      </div>
    );
  }

  if (meQuery.isLoading) {
    return <div className="min-h-screen bg-black text-white p-8">Checking admin session...</div>;
  }

  if (meQuery.isError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">Session Invalid</h1>
          <p className="text-red-400">Please sign in again.</p>
          <button
            onClick={() => {
              authToken.clear();
              window.location.href = '/admin';
            }}
            className="px-6 py-3 bg-gray-700 rounded-lg"
          >
            Reset Session
          </button>
        </div>
      </div>
    );
  }

  const categories: SkillCategory[] = skillsQuery.data ?? [];
  const projects = projectsQuery.data ?? [];
  const timeline = timelineQuery.data ?? [];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Portfolio CMS</h1>
            <p className="text-gray-400 text-sm">Signed in as {meQuery.data?.email}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-cyan-600' : 'bg-gray-800'}`}>Projects</button>
            <button onClick={() => setActiveTab('skills')} className={`px-4 py-2 rounded ${activeTab === 'skills' ? 'bg-cyan-600' : 'bg-gray-800'}`}>Skills</button>
            <button onClick={() => setActiveTab('timeline')} className={`px-4 py-2 rounded ${activeTab === 'timeline' ? 'bg-cyan-600' : 'bg-gray-800'}`}>Timeline</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-cyan-600' : 'bg-gray-800'}`}>Settings</button>
            <button onClick={() => logoutMutation.mutate()} className="px-4 py-2 rounded bg-red-700">Logout</button>
          </div>
        </header>

        {activeTab === 'projects' && (
          <section className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Create Project</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="bg-gray-800 rounded p-2" placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" placeholder="Image URL" value={projectForm.imageUrl} onChange={(e) => setProjectForm((p) => ({ ...p, imageUrl: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" placeholder="GitHub URL" value={projectForm.githubUrl} onChange={(e) => setProjectForm((p) => ({ ...p, githubUrl: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" placeholder="Demo URL" value={projectForm.demoUrl} onChange={(e) => setProjectForm((p) => ({ ...p, demoUrl: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" placeholder="Tech stack (comma separated)" value={projectForm.techStack} onChange={(e) => setProjectForm((p) => ({ ...p, techStack: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" type="number" placeholder="Sort order" value={projectForm.sortOrder} onChange={(e) => setProjectForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
              </div>
              <textarea className="bg-gray-800 rounded p-2 w-full mt-4" rows={3} placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))} />
              <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectImageFile(e.target.files?.[0] || null)}
                  className="text-sm text-gray-300"
                />
                <button
                  className="px-4 py-2 bg-blue-700 rounded"
                  onClick={() => uploadProjectImageMutation.mutate()}
                  type="button"
                >
                  Upload Image
                </button>
                {projectImageFile && <span className="text-xs text-gray-400">{projectImageFile.name}</span>}
              </div>
              <label className="flex items-center gap-2 mt-3 text-sm text-gray-300">
                <input type="checkbox" checked={projectForm.isPublished} onChange={(e) => setProjectForm((p) => ({ ...p, isPublished: e.target.checked }))} />
                Published
              </label>
              <button className="mt-4 px-4 py-2 bg-green-600 rounded" onClick={() => createProjectMutation.mutate()}>Add Project</button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => {
                const editing = editingProjectId === project.id;
                return (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    editing={editing}
                    onEdit={() => setEditingProjectId(project.id)}
                    onCancel={() => setEditingProjectId(null)}
                    onSave={(payload) => updateProjectMutation.mutate({ id: project.id, payload })}
                    onDelete={() => deleteProjectMutation.mutate(project.id)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'skills' && (
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Create Skill Category</h2>
                <input className="bg-gray-800 rounded p-2 w-full mb-3" placeholder="Category name" value={categoryForm.name} onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2 w-full mb-3" type="number" placeholder="Sort order" value={categoryForm.sortOrder} onChange={(e) => setCategoryForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
                <button className="px-4 py-2 bg-green-600 rounded" onClick={() => createCategoryMutation.mutate()}>Add Category</button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Create Skill</h2>
                <select className="bg-gray-800 rounded p-2 w-full mb-3" value={skillForm.categoryId} onChange={(e) => setSkillForm((p) => ({ ...p, categoryId: e.target.value }))}>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <input className="bg-gray-800 rounded p-2 w-full mb-3" placeholder="Skill name" value={skillForm.name} onChange={(e) => setSkillForm((p) => ({ ...p, name: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2 w-full mb-3" type="number" placeholder="Sort order" value={skillForm.sortOrder} onChange={(e) => setSkillForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
                <button className="px-4 py-2 bg-green-600 rounded" onClick={() => createSkillMutation.mutate()}>Add Skill</button>
              </div>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <SkillCategoryBlock
                  key={category.id}
                  category={category}
                  onUpdateCategory={(payload) => updateCategoryMutation.mutate({ id: category.id, payload })}
                  onDeleteCategory={() => deleteCategoryMutation.mutate(category.id)}
                  onUpdateSkill={(id, payload) => updateSkillMutation.mutate({ id, payload })}
                  onDeleteSkill={(id) => deleteSkillMutation.mutate(id)}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'timeline' && (
          <section className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Create Timeline Item</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="bg-gray-800 rounded p-2" placeholder="Year label" value={timelineForm.yearLabel} onChange={(e) => setTimelineForm((p) => ({ ...p, yearLabel: e.target.value }))} />
                <input className="bg-gray-800 rounded p-2" placeholder="Title" value={timelineForm.title} onChange={(e) => setTimelineForm((p) => ({ ...p, title: e.target.value }))} />
                <select className="bg-gray-800 rounded p-2" value={timelineForm.status} onChange={(e) => setTimelineForm((p) => ({ ...p, status: e.target.value as 'completed' | 'current' }))}>
                  <option value="completed">completed</option>
                  <option value="current">current</option>
                </select>
                <input className="bg-gray-800 rounded p-2" type="number" placeholder="Sort order" value={timelineForm.sortOrder} onChange={(e) => setTimelineForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
              </div>
              <textarea className="bg-gray-800 rounded p-2 w-full mt-4" rows={3} placeholder="Description" value={timelineForm.description} onChange={(e) => setTimelineForm((p) => ({ ...p, description: e.target.value }))} />
              <button className="mt-4 px-4 py-2 bg-green-600 rounded" onClick={() => createTimelineMutation.mutate()}>Add Timeline Item</button>
            </div>

            <div className="space-y-4">
              {timeline.map((item) => (
                <TimelineRow
                  key={item.id}
                  item={item}
                  onSave={(payload) => updateTimelineMutation.mutate({ id: item.id, payload })}
                  onDelete={() => deleteTimelineMutation.mutate(item.id)}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'settings' && (
          <SettingsPanel
            settings={settingsQuery.data}
            resumeUrlForm={resumeUrlForm}
            setResumeUrlForm={setResumeUrlForm}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            onUploadResume={() => uploadResumeMutation.mutate()}
            onSave={() => updateSettingsMutation.mutate()}
          />
        )}
      </div>
    </div>
  );
};

type SettingsPanelProps = {
  settings?: SiteSettings;
  resumeUrlForm: string;
  setResumeUrlForm: (value: string) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  onUploadResume: () => void;
  onSave: () => void;
};

const SettingsPanel = ({
  settings,
  resumeUrlForm,
  setResumeUrlForm,
  resumeFile,
  setResumeFile,
  onUploadResume,
  onSave,
}: SettingsPanelProps) => {
  return (
    <section className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
        <p className="text-gray-400 text-sm mb-4">Control global portfolio settings.</p>
        <label className="block text-sm mb-2 text-gray-300">Resume URL</label>
        <input
          className="bg-gray-800 rounded p-2 w-full mb-4"
          placeholder="https://.../resume.pdf or /resume.pdf"
          value={resumeUrlForm}
          onChange={(e) => setResumeUrlForm(e.target.value)}
        />
        <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-300"
          />
          <button className="px-4 py-2 bg-blue-700 rounded" onClick={onUploadResume} type="button">
            Upload Resume File
          </button>
          {resumeFile && <span className="text-xs text-gray-400">{resumeFile.name}</span>}
        </div>
        <button className="px-4 py-2 bg-green-600 rounded" onClick={onSave}>Save Settings</button>
        <p className="text-gray-500 text-xs mt-3">Current saved value: {settings?.resumeUrl || '/resume.pdf'}</p>
      </div>
    </section>
  );
};

type ProjectRowProps = {
  project: Project;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (payload: Partial<Omit<Project, 'id'>>) => void;
  onDelete: () => void;
};

const ProjectRow = ({ project, editing, onEdit, onCancel, onSave, onDelete }: ProjectRowProps) => {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    techStack: project.techStack.join(', '),
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    sortOrder: project.sortOrder,
    isPublished: project.isPublished,
  });

  useEffect(() => {
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      sortOrder: project.sortOrder,
      isPublished: project.isPublished,
    });
  }, [project]);

  if (!editing) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="font-semibold text-lg">{project.title}</p>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-cyan-700 rounded" onClick={onEdit}>Edit</button>
            <button className="px-3 py-1 bg-red-700 rounded" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-cyan-700 rounded-xl p-4 space-y-3">
      <input className="bg-gray-800 rounded p-2 w-full" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
      <textarea className="bg-gray-800 rounded p-2 w-full" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
      <div className="grid md:grid-cols-2 gap-3">
        <input className="bg-gray-800 rounded p-2" value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} />
        <input className="bg-gray-800 rounded p-2" value={form.techStack} onChange={(e) => setForm((p) => ({ ...p, techStack: e.target.value }))} />
        <input className="bg-gray-800 rounded p-2" value={form.githubUrl} onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))} />
        <input className="bg-gray-800 rounded p-2" value={form.demoUrl} onChange={(e) => setForm((p) => ({ ...p, demoUrl: e.target.value }))} />
      </div>
      <div className="flex items-center gap-4">
        <input className="bg-gray-800 rounded p-2 w-28" type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))} />
          Published
        </label>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-700 rounded" onClick={() => onSave({ ...form, techStack: parseList(form.techStack) })}>Save</button>
        <button className="px-3 py-1 bg-gray-700 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

type SkillCategoryBlockProps = {
  category: SkillCategory;
  onUpdateCategory: (payload: { name: string; sortOrder: number }) => void;
  onDeleteCategory: () => void;
  onUpdateSkill: (
    id: string,
    payload: {
      categoryId: string;
      name: string;
      sortOrder: number;
    },
  ) => void;
  onDeleteSkill: (id: string) => void;
};

const SkillCategoryBlock = ({ category, onUpdateCategory, onDeleteCategory, onUpdateSkill, onDeleteSkill }: SkillCategoryBlockProps) => {
  const [name, setName] = useState(category.name);
  const [sortOrder, setSortOrder] = useState(category.sortOrder);

  useEffect(() => {
    setName(category.name);
    setSortOrder(category.sortOrder);
  }, [category]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <input className="bg-gray-800 rounded p-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="bg-gray-800 rounded p-2 w-28" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-700 rounded" onClick={() => onUpdateCategory({ name, sortOrder })}>Save Category</button>
          <button className="px-3 py-1 bg-red-700 rounded" onClick={onDeleteCategory}>Delete Category</button>
        </div>
      </div>

      <div className="space-y-2">
        {category.skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} onUpdate={(payload) => onUpdateSkill(skill.id, payload)} onDelete={() => onDeleteSkill(skill.id)} />
        ))}
      </div>
    </div>
  );
};

type SkillRowProps = {
  skill: SkillCategory['skills'][number];
  onUpdate: (payload: {
    categoryId: string;
    name: string;
    sortOrder: number;
  }) => void;
  onDelete: () => void;
};

const SkillRow = ({ skill, onUpdate, onDelete }: SkillRowProps) => {
  const [form, setForm] = useState({
    categoryId: skill.categoryId,
    name: skill.name,
    sortOrder: skill.sortOrder,
  });

  useEffect(() => {
    setForm({
      categoryId: skill.categoryId,
      name: skill.name,
      sortOrder: skill.sortOrder,
    });
  }, [skill]);

  return (
    <div className="border border-gray-800 rounded-lg p-3 grid md:grid-cols-4 gap-2 items-center">
      <input className="bg-gray-800 rounded p-2" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
      <input className="bg-gray-800 rounded p-2" type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
      <button className="px-3 py-2 bg-green-700 rounded" onClick={() => onUpdate(form)}>Save</button>
      <button className="px-3 py-2 bg-red-700 rounded" onClick={onDelete}>Delete</button>
    </div>
  );
};

type TimelineRowProps = {
  item: TimelineItem;
  onSave: (payload: Partial<Omit<TimelineItem, 'id'>>) => void;
  onDelete: () => void;
};

const TimelineRow = ({ item, onSave, onDelete }: TimelineRowProps) => {
  const [form, setForm] = useState({
    yearLabel: item.yearLabel,
    title: item.title,
    description: item.description,
    status: item.status,
    sortOrder: item.sortOrder,
  });

  useEffect(() => {
    setForm({
      yearLabel: item.yearLabel,
      title: item.title,
      description: item.description,
      status: item.status,
      sortOrder: item.sortOrder,
    });
  }, [item]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="grid md:grid-cols-4 gap-3">
        <input className="bg-gray-800 rounded p-2" value={form.yearLabel} onChange={(e) => setForm((p) => ({ ...p, yearLabel: e.target.value }))} />
        <input className="bg-gray-800 rounded p-2" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
        <select className="bg-gray-800 rounded p-2" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as 'completed' | 'current' }))}>
          <option value="completed">completed</option>
          <option value="current">current</option>
        </select>
        <input className="bg-gray-800 rounded p-2" type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
      </div>
      <textarea className="bg-gray-800 rounded p-2 w-full" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-700 rounded" onClick={() => onSave(form)}>Save</button>
        <button className="px-3 py-1 bg-red-700 rounded" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default AdminPage;
