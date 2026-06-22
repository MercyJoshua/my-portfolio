import { useEffect, useState } from 'react';
import { SkillCategory } from '@/types/cms';
import SkillRow from '@/components/admin/SkillRow';

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

export default SkillCategoryBlock;
