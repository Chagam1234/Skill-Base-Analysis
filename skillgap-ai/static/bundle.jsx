// Consolidated SkillGap AI Frontend Bundle
// --- START static/components/DashboardView.jsx ---
﻿function DashboardView({ user, gapData, courses, onChangeRole, onViewAllSkills, onViewAllCourses, onStartLearning }) {
  if (!gapData) return null;

  const {
    target_role_title,
    total_skills_required,
    user_skills_count,
    overall_match_percentage,
    matched_skills_count,
    matched_skills_pct,
    partial_skills_count,
    partial_skills_pct,
    missing_skills_count,
    missing_skills_pct,
    details = [],
    roadmap = []
  } = gapData;

  const tableRows = details.slice(0, 5);
  const dashCourses = courses.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {/* Card 1: Target Role */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Target Role</span>
            <span className="text-lg font-bold text-slate-900 block truncate">{target_role_title}</span>
            <button 
              onClick={onChangeRole}
              className="text-xs text-indigo-600 font-semibold hover:underline mt-0.5 inline-block"
            >
              Change Role
            </button>
          </div>
        </div>

        {/* Card 2: Total Skills Required */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Skills Required</span>
            <span className="text-2xl font-bold text-slate-900 block">{total_skills_required}</span>
          </div>
        </div>

        {/* Card 3: Your Current Skills */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Your Current Skills</span>
            <span className="text-2xl font-bold text-slate-900 block">{user_skills_count}</span>
          </div>
        </div>

        {/* Card 4: Overall Skill Match */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div className="w-full">
            <span className="text-xs text-slate-500 font-medium block">Overall Skill Match</span>
            <span className="text-2xl font-bold text-slate-900 block">{overall_match_percentage}%</span>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-700" 
                style={{ width: `${overall_match_percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Skill Gap Overview & Skill Gap Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Skill Gap Overview */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <h2 className="text-base font-bold text-slate-900 mb-4">Skill Gap Overview</h2>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto py-2">
            {/* Donut Chart SVG matching screenshot */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="12"
                  strokeDasharray={`${(matched_skills_pct * 2.387).toFixed(1)} 240`}
                  strokeDashoffset="0"
                />
                <circle 
                  cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="12"
                  strokeDasharray={`${(partial_skills_pct * 2.387).toFixed(1)} 240`}
                  strokeDashoffset={`-${(matched_skills_pct * 2.387).toFixed(1)}`}
                />
                <circle 
                  cx="50" cy="50" r="38" fill="none" stroke="#F43F5E" strokeWidth="12"
                  strokeDasharray={`${(missing_skills_pct * 2.387).toFixed(1)} 240`}
                  strokeDashoffset={`-${((matched_skills_pct + partial_skills_pct) * 2.387).toFixed(1)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900 leading-none">{overall_match_percentage}%</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Match</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="text-slate-600 font-medium">Matched Skills</span>
                <span className="font-bold text-slate-900 ml-auto pl-4">{matched_skills_count} ({matched_skills_pct}%)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                <span className="text-slate-600 font-medium">Partial Skills</span>
                <span className="font-bold text-slate-900 ml-auto pl-4">{partial_skills_count} ({partial_skills_pct}%)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                <span className="text-slate-600 font-medium">Missing Skills</span>
                <span className="font-bold text-slate-900 ml-auto pl-4">{missing_skills_count} ({missing_skills_pct}%)</span>
              </div>
            </div>
          </div>

          {/* Light Purple Tip Card */}
          <div className="mt-5 bg-indigo-50/70 border border-indigo-100/80 rounded-xl p-3.5 flex items-start gap-3">
            <div className="text-indigo-600 mt-0.5 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-950">
                You are missing {missing_skills_count} important skills.
              </p>
              <p className="text-[11px] text-indigo-700/80 mt-0.5">
                Focus on high priority skills to improve your match.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Gap Details Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Skill Gap Details</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 font-semibold">
                    <th className="pb-3 font-semibold">Skill</th>
                    <th className="pb-3 font-semibold">Required Level</th>
                    <th className="pb-3 font-semibold">Your Level</th>
                    <th className="pb-3 font-semibold text-right">Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {tableRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 font-semibold text-slate-900">{row.skill}</td>
                      <td className="py-3 text-slate-500">{row.required_level}</td>
                      <td className="py-3 text-slate-500">{row.your_level}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          row.gap === 'No Gap' 
                            ? 'badge-no-gap' 
                            : row.gap === 'Medium' 
                            ? 'badge-medium' 
                            : 'badge-high'
                        }`}>
                          {row.gap}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 text-right">
            <button 
              onClick={onViewAllSkills}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
            >
              <span>View All Skills</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Learning Roadmap Horizontal Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-5">Recommended Learning Roadmap</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {roadmap.slice(0, 4).map((step, idx) => (
            <div key={idx} className="relative bg-slate-50/80 rounded-xl p-4 border border-slate-100 hover:border-indigo-200 transition-all">
              <div className="absolute -top-2.5 left-3 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {step.step || idx + 1}
              </div>

              <div className="mt-2 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                  {idx === 0 && <span className="text-emerald-600 font-bold text-xs">XLS</span>}
                  {idx === 1 && <span className="text-amber-500 font-bold text-xs">PBI</span>}
                  {idx === 2 && <span className="text-blue-500 font-bold text-xs">STAT</span>}
                  {idx === 3 && <span className="text-purple-600 font-bold text-xs">ADV</span>}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Level: <span className="text-slate-600 font-medium">{step.level}</span></p>
                  <p className="text-[11px] text-slate-400">Duration: <span className="text-slate-600 font-medium">{step.duration}</span></p>
                </div>
              </div>
            </div>
          ))}

          {/* Next Step Action Card */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between h-full">
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">Next Step</span>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Start learning Excel to build a strong base.
              </p>
            </div>
            <button 
              onClick={onStartLearning}
              className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs shadow-indigo-200 transition-colors text-center"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Courses for You */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Recommended Courses for You</h2>
          <button 
            onClick={onViewAllCourses}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            View All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashCourses.map(course => (
            <div key={course.id} className="border border-slate-100 hover:border-indigo-200 rounded-xl p-4 bg-slate-50/40 hover:bg-white transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center">
                    {course.title[0]}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate" title={course.title}>
                    {course.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>{course.provider}</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    ★ {course.rating}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  course.level === 'Beginner' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {course.level}
                </span>
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-600 font-semibold hover:underline"
                >
                  Enroll
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- END static/components/DashboardView.jsx ---

// --- START static/components/ProfileView.jsx ---
﻿function ProfileView({ user, onSave, onUploadResumeClick }) {
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

// --- END static/components/ProfileView.jsx ---

// --- START static/components/ResumeAnalysisView.jsx ---
﻿function ResumeAnalysisView({ onApplyToProfile }) {
  const [file, setFile] = React.useState(null);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleUpload = async (pdfFile) => {
    if (!pdfFile) return;
    setAnalyzing(true);
    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());

      if (res && res.parsed) {
        setResult(res.parsed);
      }
    } catch (e) {
      alert('Error analyzing resume. Please upload a valid PDF.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">AI Resume NLP Extractor</h2>
        <p className="text-xs text-slate-500 mt-0.5">Upload your resume in PDF format to automatically extract skills, education, and credentials.</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            handleUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`bg-white border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragActive ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-200'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-800">
          {file ? file.name : 'Drag and drop your PDF resume here, or browse'}
        </p>
        <p className="text-xs text-slate-400 mt-1">Supports PDF files up to 10MB</p>

        <label className="mt-4 inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs">
          <span>Choose File</span>
          <input 
            type="file" 
            accept=".pdf"
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      {analyzing && (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
          <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-600 font-medium">Running NLP pattern recognition & skill extraction...</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Extracted Candidate Details</h3>
              <p className="text-xs text-slate-400">Review NLP extractions before syncing with profile</p>
            </div>
            <button 
              onClick={() => onApplyToProfile(result)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Apply to My Profile &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Detected Name</span>
              <p className="p-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium">{result.name}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Detected Email</span>
              <p className="p-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium">{result.email}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-slate-700 block mb-1">Extracted Education</span>
              <p className="p-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium">{result.education.join(', ')}</p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-700 text-xs block mb-2">Detected Technical Skills ({result.skills.length})</span>
            <div className="flex flex-wrap gap-2">
              {result.skills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {result.certifications && result.certifications.length > 0 && (
            <div>
              <span className="font-semibold text-slate-700 text-xs block mb-1">Detected Certifications</span>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {result.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- END static/components/ResumeAnalysisView.jsx ---

// --- START static/components/SkillAssessmentView.jsx ---
﻿function SkillAssessmentView({ onAssessmentFinished }) {
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/assessment/questions')
      .then(r => r.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  const handleSelect = (qid, optIndex) => {
    setAnswers(prev => ({ ...prev, [qid]: optIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      if (!confirm('You have unanswered questions. Are you sure you want to submit?')) return;
    }
    const res = await fetch('/api/assessment/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    }).then(r => r.json());

    setResults(res);
    setSubmitted(true);
    onAssessmentFinished();
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading assessment module...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Interactive Skill & Aptitude Assessment</h2>
        <p className="text-xs text-slate-500 mt-0.5">Benchmark your technical capabilities, problem-solving, and communication skills.</p>
      </div>

      {!submitted ? (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Answered: {Object.keys(answers).length} of {questions.length} questions</span>
            <div className="w-48 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(Object.keys(answers).length / Math.max(questions.length, 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {q.category} &bull; {q.skill}
                </span>
                <span className="text-xs text-slate-400 font-medium">Question {idx + 1}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900">{q.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-1 ring-indigo-600' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-300 inline-flex items-center justify-center text-[10px] mr-2 font-bold">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-right pt-2">
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Submit Assessment & Calculate Scores
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-6">
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-extrabold mb-2">
              {results.overall_score}%
            </div>
            <h3 className="text-lg font-bold text-slate-900">Assessment Completed!</h3>
            <p className="text-xs text-slate-500">Your score has been updated in your profile dashboard.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 block">Technical Score</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">{results.technical_score}%</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 block">Aptitude & Logic</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">{results.aptitude_score}%</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 block">Soft Skills</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">{results.soft_score}%</span>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="w-full py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold"
          >
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}

// --- END static/components/SkillAssessmentView.jsx ---

// --- START static/components/SkillGapView.jsx ---
﻿function SkillGapAnalysisView({ gapData, careers, selectedRoleId, onSelectRole }) {
  const [filter, setFilter] = React.useState('all');

  if (!gapData) return null;

  const filtered = gapData.details.filter(d => {
    if (filter === 'matched') return d.gap === 'No Gap';
    if (filter === 'partial') return d.gap === 'Medium';
    if (filter === 'missing') return d.gap === 'High';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Skill Gap Analysis</h2>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive benchmark against industry required proficiencies.</p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Target Role:</span>
          <select 
            value={selectedRoleId}
            onChange={(e) => onSelectRole(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {careers.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'all', label: `All Skills (${gapData.total_skills_required})` },
          { id: 'matched', label: `Matched (${gapData.matched_skills_count})` },
          { id: 'partial', label: `Partial (${gapData.partial_skills_count})` },
          { id: 'missing', label: `Missing / High Gap (${gapData.missing_skills_count})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === tab.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold text-slate-900">{item.skill}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  item.gap === 'No Gap' ? 'badge-no-gap' : item.gap === 'Medium' ? 'badge-medium' : 'badge-high'
                }`}>
                  {item.gap}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">{item.category}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Required</span>
                <span className="font-semibold text-slate-800">{item.required_level}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Your Level</span>
                <span className="font-semibold text-slate-800">{item.your_level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- END static/components/SkillGapView.jsx ---

// --- START static/components/CareerView.jsx ---
﻿function CareerRecommendationsView({ careers, currentTargetRole, onSetTargetRole }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Career Recommendations</h2>
        <p className="text-xs text-slate-500 mt-0.5">Semantic-similarity match ranked against real industry requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {careers.map((career) => {
          const isTarget = career.id === currentTargetRole;
          return (
            <div 
              key={career.id}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                isTarget ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-slate-100 hover:border-slate-200'
              } shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block">{career.category}</span>
                    <h3 className="text-lg font-bold text-slate-900">{career.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-indigo-600 leading-none block">{career.match_percentage}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Match</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{career.short_description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {career.top_skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{career.avg_salary}</span>
                {isTarget ? (
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Current Target Role
                  </span>
                ) : (
                  <button
                    onClick={() => onSetTargetRole(career.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    Set as Target Role &rarr;
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- END static/components/CareerView.jsx ---

// --- START static/components/RoadmapView.jsx ---
﻿function LearningRoadmapView({ roadmap, targetRole, progress, onToggleStep }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Personalized Learning Roadmap for {targetRole}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Follow this structured path to close your skill gaps sequentially.</p>
      </div>

      <div className="space-y-4">
        {roadmap.map((step, idx) => {
          const isDone = (progress.completed_roadmap_steps || []).includes(step.step || idx + 1);
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  isDone ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {isDone ? '✓' : step.step || idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                      {step.level}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ⏱ {step.duration}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(step.topics || []).map((t, tIdx) => (
                      <span key={tIdx} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onToggleStep(step.step || idx + 1)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  isDone 
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                }`}
              >
                {isDone ? 'Completed' : 'Mark Stage Done'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- END static/components/RoadmapView.jsx ---

// --- START static/components/CoursesView.jsx ---
﻿function CoursesView({ courses, progress, onToggleCourse }) {
  const [search, setSearch] = React.useState('');
  const [levelFilter, setLevelFilter] = React.useState('All');

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recommended Courses & Certifications</h2>
          <p className="text-xs text-slate-500 mt-0.5">Curated learning programs from Coursera, Udemy, and edX targeting your gaps.</p>
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="text"
            placeholder="Search skill or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          <select
            value={levelFilter}
            onChange={e => setLevelFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(course => {
          const isDone = (progress.completed_courses || []).includes(course.id);
          return (
            <div key={course.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400">{course.provider}</span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    ★ {course.rating}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{course.title}</h3>
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">⏱ {course.duration}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleCourse(course.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
                      isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isDone ? '✓ Completed' : 'Mark Done'}
                  </button>
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                  >
                    Enroll
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- END static/components/CoursesView.jsx ---

// --- START static/components/ProjectsView.jsx ---
﻿function ProjectRecommendationsView({ projects }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Recommended Real-World Projects</h2>
        <p className="text-xs text-slate-500 mt-0.5">Build these portfolio projects to develop missing skills and strengthen your resume.</p>
      </div>

      <div className="space-y-5">
        {projects.map(proj => (
          <div key={proj.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {proj.difficulty} &bull; ~{proj.estimated_hours} Hours
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{proj.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{proj.summary}</p>

            <div>
              <span className="text-xs font-bold text-slate-900 block mb-1.5">Core Implementation Steps:</span>
              <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                {proj.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Ready-to-Paste Resume Bullet Points:
              </span>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {proj.resume_bullets.map((b, bi) => (
                  <li key={bi} className="font-mono text-[11px] text-slate-700">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- END static/components/ProjectsView.jsx ---

// --- START static/components/ChatbotView.jsx ---
﻿function CareerChatbotView({ user, gapData }) {
  const [messages, setMessages] = React.useState([
    {
      sender: 'ai',
      text: `Hello ${(user.name || 'Learner').split(' ')[0]}! I am your AI Career Counselor. I've reviewed your skills and identified your key gaps for ${gapData?.target_role_title || 'your target role'}. How can I assist you today?`,
      suggestions: [
        "Which career is best for me?",
        "What skills should I learn for Data Science?",
        "How can I improve my Python skills?",
        "What project should I build?",
        "Am I ready for a software developer job?"
      ]
    }
  ]);
  const [input, setInput] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      }).then(r => r.json());

      setMessages([...newMsgs, {
        sender: 'ai',
        text: res.reply,
        suggestions: res.suggestions
      }]);
    } catch (e) {
      setMessages([...newMsgs, {
        sender: 'ai',
        text: 'Sorry, I encountered an issue generating advice. Please try again.'
      }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[680px] flex flex-col bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
          AI
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Career Guidance Mentor</h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Profile-aware & Active
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100 shadow-2xs'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Suggestions chips */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s, si) => (
                    <button
                      key={si}
                      onClick={() => handleSend(s)}
                      className="text-[11px] bg-white text-indigo-600 border border-indigo-200 rounded-full px-2.5 py-1 font-medium hover:bg-indigo-50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-3 border border-slate-100 text-xs text-slate-500">
              Generating tailored career guidance...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
      >
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask: 'Which career is best for me?', 'What project should I build?'"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// --- END static/components/ChatbotView.jsx ---

// --- START static/components/ProgressView.jsx ---
﻿function ProgressTrackingView({ progress, gapData, courses, onToggleSkill, onToggleCourse, onToggleStep }) {
  if (!gapData) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Career Competency Progress Tracker</h2>
        <p className="text-xs text-slate-500 mt-0.5">Track and update your learning milestones in real time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <span className="text-xs text-slate-400 font-medium block">Completed Skills</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{progress.completed_skills.length}</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <span className="text-xs text-slate-400 font-medium block">Completed Courses</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{progress.completed_courses.length}</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <span className="text-xs text-slate-400 font-medium block">Roadmap Milestones</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{progress.completed_roadmap_steps.length} of {gapData.roadmap.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Interactive Skills Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {gapData.details.map((item, idx) => {
            const isCompleted = (progress.completed_skills || []).includes(item.skill);
            return (
              <label 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isCompleted ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-semibold' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input 
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onToggleSkill(item.skill)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="truncate">{item.skill}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- END static/components/ProgressView.jsx ---

// --- START static/components/AuthView.jsx ---
function AuthView({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = React.useState('ananya@example.com');
  const [loginPassword, setLoginPassword] = React.useState('demo');

  // Register form state
  const [regName, setRegName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  const [regDegree, setRegDegree] = React.useState('B.Tech');
  const [regBranch, setRegBranch] = React.useState('Computer Science');
  const [regRole, setRegRole] = React.useState('data-analyst');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed. Please check your credentials.');
      }

      onLoginSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          degree: regDegree,
          branch: regBranch,
          target_role: regRole
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed. Please try again.');
      }

      onLoginSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ananya@example.com', password: 'demo' })
      });
      const data = await res.json();
      if (data.user && data.token) {
        onLoginSuccess(data.user, data.token);
      }
    } catch (err) {
      setError('Unable to load demo profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">SkillGap AI</h1>
          <p className="text-sm text-slate-500 mt-1">Smart Career Benchmarking & Learning Roadmap Platform</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100/80 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                !isRegister 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                isRegister 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {!isRegister ? (
            /* --- SIGN IN FORM --- */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <p className="text-[11px] text-center text-slate-400 mb-2.5">Or explore immediately with pre-loaded data</p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200/60 transition flex items-center justify-center gap-2"
                >
                  <span>⚡ 1-Click Demo Login (Ananya Sharma)</span>
                </button>
              </div>
            </form>
          ) : (
            /* --- SIGN UP (REGISTER) FORM --- */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
                  <select
                    value={regDegree}
                    onChange={(e) => setRegDegree(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc">B.Sc Computer Science</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MCA">MCA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                  <select
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Tech</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Electronics & Comm.">ECE</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Career Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                >
                  <option value="data-analyst">Data Analyst</option>
                  <option value="software-engineer">Software Engineer / SDE</option>
                  <option value="data-scientist">Data Scientist</option>
                  <option value="machine-learning-engineer">Machine Learning Engineer</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="full-stack-developer">Full Stack Developer</option>
                  <option value="cloud-devops-engineer">Cloud & DevOps Engineer</option>
                  <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account & Start</span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-6">
          SkillGap AI &bull; Personalized Career Guidance & Skill Intelligence
        </p>
      </div>
    </div>
  );
}

// --- END static/components/AuthView.jsx ---

// --- START static/app.jsx ---
function App() {
  const [authToken, setAuthToken] = React.useState(() => localStorage.getItem('skillgap_token') || '');
  const [user, setUser] = React.useState(() => {
    try {
      const saved = localStorage.getItem('skillgap_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [gapData, setGapData] = React.useState(null);
  const [careers, setCareers] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [progress, setProgress] = React.useState({
    completed_skills: [],
    completed_courses: [],
    completed_roadmap_steps: []
  });
  const [loading, setLoading] = React.useState(false);
  const [showRoleModal, setShowRoleModal] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'Welcome to SkillGap!', desc: 'Target role benchmark loaded.', time: 'Just now' },
    { id: 2, title: 'Curated Courses Ready', desc: 'Interactive roadmaps tailored to your profile.', time: '1 hr ago' },
    { id: 3, title: 'Skill Assessment Available', desc: 'Test technical & aptitude proficiencies.', time: '2 hrs ago' }
  ]);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const getHeaders = () => {
    return {
      'Authorization': `Bearer ${authToken || 'demo-ananya'}`,
      'X-User-Id': user?.id || 'demo-ananya',
      'Content-Type': 'application/json'
    };
  };

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('skillgap_token', token);
    localStorage.setItem('skillgap_user', JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('skillgap_token');
    localStorage.removeItem('skillgap_user');
    setAuthToken('');
    setUser(null);
    setGapData(null);
    setActiveTab('dashboard');
  };

  React.useEffect(() => {
    if (authToken && user) {
      fetchUserData();
    }
  }, [authToken]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const headers = {
        'Authorization': `Bearer ${authToken || 'demo-ananya'}`,
        'X-User-Id': user?.id || 'demo-ananya'
      };
      const [uRes, aRes, cRes, courRes, projRes, pRes] = await Promise.all([
        fetch('/api/profile', { headers }).then(r => r.json()),
        fetch('/api/analysis', { headers }).then(r => r.json()),
        fetch('/api/careers', { headers }).then(r => r.json()),
        fetch('/api/courses', { headers }).then(r => r.json()),
        fetch('/api/projects', { headers }).then(r => r.json()),
        fetch('/api/progress', { headers }).then(r => r.json())
      ]);
      if (uRes) setUser(uRes);
      if (aRes) setGapData(aRes);
      if (cRes) setCareers(cRes);
      if (courRes) setCourses(courRes);
      if (projRes) setProjects(projRes);
      if (pRes && pRes.progress) setProgress(pRes.progress);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (roleId) => {
    try {
      const headers = getHeaders();
      await fetch('/api/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ target_role: roleId })
      });
      const newAnalysis = await fetch(`/api/analysis?role=${roleId}`, { headers }).then(r => r.json());
      setGapData(newAnalysis);
      setUser(prev => ({ ...prev, target_role: roleId }));
      setShowRoleModal(false);
    } catch (e) {
      console.error('Error changing role:', e);
    }
  };

  const toggleProgressItem = async (type, itemId) => {
    try {
      const headers = getHeaders();
      const res = await fetch('/api/progress/toggle', {
        method: 'POST',
        headers,
        body: JSON.stringify({ type, item_id: String(itemId) })
      }).then(r => r.json());
      if (res && res.progress) {
        setProgress(res.progress);
      }
    } catch (e) {
      console.error('Error toggling progress:', e);
    }
  };

  if (!authToken || !user) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading && !gapData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading SkillGap Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNav 
          user={user} 
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView 
              user={user} 
              gapData={gapData} 
              courses={courses} 
              onChangeRole={() => setShowRoleModal(true)}
              onViewAllSkills={() => setActiveTab('skill-gap')}
              onViewAllCourses={() => setActiveTab('courses')}
              onStartLearning={() => setActiveTab('roadmap')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView 
              user={user} 
              onSave={async (updatedData) => {
                await fetch('/api/profile', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updatedData)
                });
                fetchUserData();
              }}
              onUploadResumeClick={() => setActiveTab('resume')}
            />
          )}

          {activeTab === 'resume' && (
            <ResumeAnalysisView 
              onApplyToProfile={async (extracted) => {
                await fetch('/api/profile', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    skills: extracted.skills.map(s => ({ name: s, level: 'Intermediate' })),
                    degree: extracted.education[0] || user.degree,
                    certifications: extracted.certifications
                  })
                });
                fetchUserData();
                setActiveTab('dashboard');
              }}
            />
          )}

          {activeTab === 'assessment' && (
            <SkillAssessmentView 
              onAssessmentFinished={() => {
                fetchUserData();
              }}
            />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapAnalysisView 
              gapData={gapData}
              careers={careers}
              selectedRoleId={user.target_role}
              onSelectRole={handleRoleChange}
            />
          )}

          {activeTab === 'careers' && (
            <CareerRecommendationsView 
              careers={careers} 
              currentTargetRole={user.target_role}
              onSetTargetRole={(roleId) => handleRoleChange(roleId)}
            />
          )}

          {activeTab === 'roadmap' && (
            <LearningRoadmapView 
              roadmap={gapData?.roadmap || []}
              targetRole={gapData?.target_role_title || 'Data Analyst'}
              progress={progress}
              onToggleStep={(stepNum) => toggleProgressItem('step', stepNum)}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView 
              courses={courses}
              progress={progress}
              onToggleCourse={(cid) => toggleProgressItem('course', cid)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectRecommendationsView 
              projects={projects}
            />
          )}

          {activeTab === 'chatbot' && (
            <CareerChatbotView 
              user={user}
              gapData={gapData}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressTrackingView 
              progress={progress}
              gapData={gapData}
              courses={courses}
              onToggleSkill={(s) => toggleProgressItem('skill', s)}
              onToggleCourse={(c) => toggleProgressItem('course', c)}
              onToggleStep={(st) => toggleProgressItem('step', st)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView user={user} />
          )}
        </main>
      </div>

      {showRoleModal && (
        <ChangeRoleModal 
          careers={careers}
          currentRoleId={user.target_role}
          onSelectRole={handleRoleChange}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'profile', label: 'My Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'resume', label: 'Resume Analysis', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'assessment', label: 'Skill Assessment', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'careers', label: 'Career Paths', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 'courses', label: 'Recommended Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'projects', label: 'Project Ideas', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'chatbot', label: 'AI Career Chatbot', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'progress', label: 'Progress Tracking', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="8" r="3" />
              <circle cx="15" cy="15" r="3" />
              <circle cx="7" cy="16" r="2.5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight block">SkillGap</span>
            <span className="text-[11px] font-medium text-slate-400 block -mt-1 tracking-wider uppercase">Analysis System</span>
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-indigo-50/80 text-indigo-600 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function TopNav({ user, notifications, showNotifications, setShowNotifications, onLogout }) {
  const firstName = (user.name || 'User').split(' ')[0];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Welcome, {firstName}! <span>👋</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          Find your skill gaps and grow your career.
        </p>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-semibold text-slate-900 text-sm">Notifications</span>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">3 New</span>
            </div>
            <div className="divide-y divide-slate-50 mt-2">
              {notifications.map(n => (
                <div key={n.id} className="py-2.5">
                  <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {(user.name || 'U')[0]}
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-sm font-semibold text-slate-900 leading-none">{user.name || 'User'}</span>
            <span className="block text-xs text-slate-400 mt-1 font-medium capitalize">{user.target_role ? user.target_role.replace(/-/g, ' ') : 'Member'}</span>
          </div>
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function SettingsView({ user }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-5">
      <h2 className="text-lg font-bold text-slate-900">Application Settings</h2>
      
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
          <div>
            <span className="font-semibold text-slate-900 block">Database Storage</span>
            <span className="text-slate-500">SQLite Database with dynamic SQLAlchemy compatibility</span>
          </div>
          <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">Connected</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
          <div>
            <span className="font-semibold text-slate-900 block">AI Engine</span>
            <span className="text-slate-500">Scikit-learn TF-IDF + Cosine Similarity & NLP</span>
          </div>
          <span className="text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full">Active</span>
        </div>
      </div>
    </div>
  );
}

function ChangeRoleModal({ careers, currentRoleId, onSelectRole, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Select Target Career Role</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
        </div>
        <p className="text-xs text-slate-500">Choosing a new target role instantly re-computes your skill gaps and roadmap.</p>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {careers.map(c => {
            const isSelected = c.id === currentRoleId;
            return (
              <button
                key={c.id}
                onClick={() => onSelectRole(c.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold' 
                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <span className="block font-bold">{c.title}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">{c.category} &bull; {c.total_skills} skills</span>
                </div>
                <span className="text-xs font-bold text-indigo-600">{c.match_percentage}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// --- END static/app.jsx ---

