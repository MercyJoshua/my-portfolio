import { SiteSettings } from '@/types/cms';

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

export default SettingsPanel;
