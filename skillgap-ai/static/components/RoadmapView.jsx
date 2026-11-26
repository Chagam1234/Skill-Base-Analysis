function LearningRoadmapView({ roadmap, targetRole, progress, onToggleStep }) {
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
