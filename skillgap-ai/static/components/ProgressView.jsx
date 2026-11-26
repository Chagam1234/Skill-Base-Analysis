function ProgressTrackingView({ progress, gapData, courses, onToggleSkill, onToggleCourse, onToggleStep }) {
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
