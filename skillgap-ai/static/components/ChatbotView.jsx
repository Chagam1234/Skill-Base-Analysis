function CareerChatbotView({ user, gapData }) {
  const [messages, setMessages] = React.useState([
    {
      sender: 'ai',
      text: `Hello ${(user.name || 'Learner').split(' ')[0]}! I am your AI Career Counselor. I've reviewed your skills and identified your key gaps for ${gapData?.target_role_title || 'your target role'}. How can I assist you today?`,
      suggestions: [
        "Which career is best for me?",
        "What skills should I learn for Data Science?",
        "How can I improve my Python skills?",
        "What project should I build?",
        "Am I ready for a software developer job?"
      ]
    }
  ]);
  const [input, setInput] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      }).then(r => r.json());

      setMessages([...newMsgs, {
        sender: 'ai',
        text: res.reply,
        suggestions: res.suggestions
      }]);
    } catch (e) {
      setMessages([...newMsgs, {
        sender: 'ai',
        text: 'Sorry, I encountered an issue generating advice. Please try again.'
      }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[680px] flex flex-col bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
          AI
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Career Guidance Mentor</h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Profile-aware & Active
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100 shadow-2xs'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Suggestions chips */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s, si) => (
                    <button
                      key={si}
                      onClick={() => handleSend(s)}
                      className="text-[11px] bg-white text-indigo-600 border border-indigo-200 rounded-full px-2.5 py-1 font-medium hover:bg-indigo-50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-3 border border-slate-100 text-xs text-slate-500">
              Generating tailored career guidance...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
      >
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask: 'Which career is best for me?', 'What project should I build?'"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          Send
        </button>
      </form>
    </div>
  );
}
