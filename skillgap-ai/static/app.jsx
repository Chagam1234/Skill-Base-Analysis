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
