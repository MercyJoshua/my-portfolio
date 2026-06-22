import { useEffect, useState } from 'react';
import { Project } from '@/types/cms';

const parseList = (value: string) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

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

export default ProjectRow;
