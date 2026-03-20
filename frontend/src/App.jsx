import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prevScore, setPrevScore] = useState(null);

  const analyze = async () => {
    if (!input.trim()) {
      setError("Please enter your idea or plan.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", { input });
      if (result) setPrevScore(result.clarity_score);
      setResult(res.data);
    } catch (err) {
      setError("Backend not connected. Make sure server is running on port 5000.");
    }
    setLoading(false);
  };

  const clearAll = () => {
    setInput("");
    setResult(null);
    setError("");
    setPrevScore(null);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return "#4caf87";
    if (score >= 50) return "#f5c842";
    return "#e05c5c";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent Plan ✦";
    if (score >= 65) return "Good Plan";
    if (score >= 45) return "Needs Refinement";
    return "Very Vague";
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="badge">KALNET Intern Project</div>
        <h1>Explain My <span>Plan</span></h1>
        <p>Turn vague ideas into structured, actionable clarity — powered by AI</p>
      </header>

      {/* INPUT */}
      <div className="input-card">
        <label className="input-label">YOUR IDEA OR PLAN</label>
        <textarea
          placeholder="e.g. I want to start a YouTube channel and earn money quickly..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="input-footer">
          <span className="char-count">{input.length} characters</span>
          <div className="btn-row">
            <button className="btn-clear" onClick={clearAll}>Clear</button>
            <button
              className="btn-primary"
              onClick={analyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "✦ Analyze Plan"}
            </button>
          </div>
        </div>
        {error && <div className="error-box">⚠ {error}</div>}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-box">
          <div className="spinner" />
          <p>Structuring your plan…</p>
        </div>
      )}

      {/* RESULTS */}
      {result && !loading && (
        <div className="results">

          {/* BEFORE vs AFTER */}
          {prevScore !== null && (
            <div className="compare-bar">
              <span>📈 Iteration Result:</span>
              <div className="pill">Before: {prevScore}/100</div>
              <span className="arrow">→</span>
              <div className="pill green">
                After: {result.clarity_score}/100&nbsp;
                ({result.clarity_score - prevScore >= 0 ? "+" : ""}
                {result.clarity_score - prevScore})
              </div>
              <span style={{ color: result.clarity_score >= prevScore ? "#4caf87" : "#e05c5c" }}>
                {result.clarity_score >= prevScore ? "▲ Improved!" : "▼ Still needs work"}
              </span>
            </div>
          )}

          {/* CLARITY SCORE CARD */}
          <div className="score-card">
            <div className="score-left">
              <div
                className="score-circle"
                style={{ borderColor: getScoreColor(result.clarity_score) }}
              >
                <span
                  className="score-num"
                  style={{ color: getScoreColor(result.clarity_score) }}
                >
                  {result.clarity_score}
                </span>
                <span className="score-denom">/100</span>
              </div>
              <div>
                <h3 style={{ color: getScoreColor(result.clarity_score) }}>
                  {getScoreLabel(result.clarity_score)}
                </h3>
                <p className="score-exp">{result.score_explanation}</p>
              </div>
            </div>

            <div className="score-bars">
              {[
                { label: "Goal Clarity",  value: result.score_breakdown?.goal         || 0, color: "#5c8de0" },
                { label: "Steps Defined", value: result.score_breakdown?.steps        || 0, color: "#4caf87" },
                { label: "Timeline",      value: result.score_breakdown?.timeline     || 0, color: "#f5c842" },
                { label: "Completeness",  value: result.score_breakdown?.completeness || 0, color: "#ff6b35" },
              ].map((b) => (
                <div key={b.label} className="bar-item">
                  <div className="bar-header">
                    <span>{b.label}</span>
                    <span style={{ color: b.color }}>{b.value}/25</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(b.value / 25) * 100}%`,
                        background: b.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="score-note">
                Score = Goal(25) + Steps(25) + Timeline(25) + Completeness(25)
              </p>
            </div>
          </div>

          {/* CARDS GRID */}
          <div className="grid">

            {/* GOAL */}
            <div className="card" style={{ "--top": "#5c8de0" }}>
              <div className="card-top" />
              <div className="card-icon">🎯</div>
              <div className="card-label">GOAL</div>
              <p>{result.goal}</p>
            </div>

            {/* METHOD */}
            <div className="card" style={{ "--top": "#4caf87" }}>
              <div className="card-top" />
              <div className="card-icon">⚙️</div>
              <div className="card-label">METHOD / APPROACH</div>
              <p>{result.method}</p>
            </div>

            {/* STEPS */}
            <div className="card" style={{ "--top": "#f5c842" }}>
              <div className="card-top" />
              <div className="card-icon">📌</div>
              <div className="card-label">IDENTIFIED STEPS</div>
              <ul className="step-list">
                {(result.steps || []).map((s, i) => (
                  <li key={i} className="step-item">
                    <span className="step-num yellow">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TIMELINE */}
            <div className="card" style={{ "--top": "#9b59b6" }}>
              <div className="card-top" />
              <div className="card-icon">⏳</div>
              <div className="card-label">TIMELINE</div>
              <div className="timeline-badge">{result.timeline}</div>
            </div>

            {/* MISSING ELEMENTS */}
            <div className="card full" style={{ "--top": "#e05c5c" }}>
              <div className="card-top" />
              <div className="card-icon">❗</div>
              <div className="card-label">MISSING ELEMENTS</div>
              <div className="missing-list">
                {Object.entries(result.missing_elements || {}).map(([k, v]) => (
                  <div key={k} className="missing-item">
                    <span className="missing-tag">{k}</span>
                    <span className="missing-desc">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIMPLIFIED VERSION */}
            <div className="card full" style={{ "--top": "#f5c842" }}>
              <div className="card-top" />
              <div className="card-icon">✨</div>
              <div className="card-label">SIMPLIFIED VERSION</div>
              <div className="simplified">{result.simplified_version}</div>
            </div>

            {/* ACTION STEPS */}
            <div className="card full" style={{ "--top": "#ff6b35" }}>
              <div className="card-top" />
              <div className="card-icon">🚀</div>
              <div className="card-label">ACTIONABLE NEXT STEPS</div>
              <ul className="step-list">
                {(result.action_steps || []).map((a, i) => (
                  <li key={i} className="step-item">
                    <span className="step-num orange">{i + 1}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;