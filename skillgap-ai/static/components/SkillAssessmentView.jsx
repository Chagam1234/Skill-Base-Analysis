function SkillAssessmentView({ onAssessmentFinished }) {
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
