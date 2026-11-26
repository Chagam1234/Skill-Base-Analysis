function ProjectRecommendationsView({ projects }) {
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
