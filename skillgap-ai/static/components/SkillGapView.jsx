function SkillGapAnalysisView({ gapData, careers, selectedRoleId, onSelectRole }) {
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
