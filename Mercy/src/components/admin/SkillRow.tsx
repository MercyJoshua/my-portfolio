import { useEffect, useState } from 'react';
import { SkillCategory } from '@/types/cms';

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

export default SkillRow;
