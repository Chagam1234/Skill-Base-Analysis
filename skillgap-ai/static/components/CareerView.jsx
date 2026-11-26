function CareerRecommendationsView({ careers, currentTargetRole, onSetTargetRole }) {
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
