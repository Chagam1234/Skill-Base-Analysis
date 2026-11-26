function ResumeAnalysisView({ onApplyToProfile }) {
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
