function DashboardView({ user, gapData, courses, onChangeRole, onViewAllSkills, onViewAllCourses, onStartLearning }) {
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
