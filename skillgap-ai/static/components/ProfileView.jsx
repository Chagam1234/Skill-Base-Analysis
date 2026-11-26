function ProfileView({ user, onSave, onUploadResumeClick }) {
  const [formData, setFormData] = React.useState({
    name: user.name || '',
    degree: user.degree || '',
    branch: user.branch || '',
    target_role: user.target_role || 'data-analyst',
    career_goals: user.career_goals || '',
    skills_text: (user.skills || []).map(s => typeof s === 'string' ? s : s.name).join(', '),
    certifications_text: (user.certifications || []).join('\n'),
    projects_text: (user.projects || []).join('\n'),
    interests_text: (user.interests || []).join(', ')
  });
  const [savedStatus, setSavedStatus] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills_text.split(',').map(s => s.trim()).filter(Boolean).map(s => ({
      name: s,
      level: 'Intermediate'
    }));
    const certsArray = formData.certifications_text.split('\n').map(s => s.trim()).filter(Boolean);
    const projArray = formData.projects_text.split('\n').map(s => s.trim()).filter(Boolean);
    const interestsArray = formData.interests_text.split(',').map(s => s.trim()).filter(Boolean);

    onSave({
      name: formData.name,
      degree: formData.degree,
      branch: formData.branch,
      target_role: formData.target_role,
      career_goals: formData.career_goals,
      skills: skillsArray,
      certifications: certsArray,
      projects: projArray,
      interests: interestsArray
    });

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Profile Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your academic credentials, technical skills, and career focus.</p>
        </div>
        <button
          type="button"
          onClick={onUploadResumeClick}
          className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Auto-fill from Resume PDF</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-6">
        {savedStatus && (
          <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium flex items-center gap-2">
            <span>✓ Profile saved and skills recalculated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Degree / Level</label>
            <input 
              type="text"
              value={formData.degree}
              onChange={e => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. B.Tech / B.S."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Branch / Specialization</label>
            <input 
              type="text"
              value={formData.branch}
              onChange={e => setFormData({ ...formData, branch: e.target.value })}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Target Career Role</label>
            <select
              value={formData.target_role}
              onChange={e => setFormData({ ...formData, target_role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="data-analyst">Data Analyst</option>
              <option value="python-developer">Python Developer</option>
              <option value="data-scientist">Data Scientist</option>
              <option value="machine-learning-engineer">Machine Learning Engineer</option>
              <option value="full-stack-developer">Full Stack Developer</option>
              <option value="cloud-devops-engineer">Cloud & DevOps Engineer</option>
              <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Technical Skills (comma-separated)
          </label>
          <input 
            type="text"
            value={formData.skills_text}
            onChange={e => setFormData({ ...formData, skills_text: e.target.value })}
            placeholder="Python, SQL, Excel, Power BI, Statistics, Git"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Certifications (one per line)</label>
            <textarea 
              rows="3"
              value={formData.certifications_text}
              onChange={e => setFormData({ ...formData, certifications_text: e.target.value })}
              placeholder="Coursera Data Analysis with Python&#10;HackerRank SQL Basic"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Projects (one per line)</label>
            <textarea 
              rows="3"
              value={formData.projects_text}
              onChange={e => setFormData({ ...formData, projects_text: e.target.value })}
              placeholder="E-Commerce Sales Analysis in Excel&#10;Customer Churn Classifier"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Career Goals & Aspirations</label>
          <textarea 
            rows="2"
            value={formData.career_goals}
            onChange={e => setFormData({ ...formData, career_goals: e.target.value })}
            placeholder="Tell us what kind of job or internship you want to secure..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            Save Profile & Recalculate
          </button>
        </div>
      </form>
    </div>
  );
}
