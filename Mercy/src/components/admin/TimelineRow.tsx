import { useEffect, useState } from 'react';
import { TimelineItem } from '@/types/cms';

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

export default TimelineRow;
