function CoursesView({ courses, progress, onToggleCourse }) {
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
