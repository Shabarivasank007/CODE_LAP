import React, { useEffect, useMemo, useState } from 'react';

const JUDGE0_ENDPOINT = 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=true';

const LANGUAGES = [
  { id: 63, label: 'JavaScript (Node.js)', defaultCode: `// Write your solution here\n\nfunction solve(input) {\n  // TODO\n  return input;\n}\n\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8');\nprocess.stdout.write(String(solve(input)));\n` },
  { id: 71, label: 'Python 3', defaultCode: `# Write your solution here\n\nimport sys\n\ndef solve(data: str) -> str:\n    # TODO\n    return data\n\nif __name__ == "__main__":\n    data = sys.stdin.read()\n    sys.stdout.write(str(solve(data)))\n` },
  { id: 54, label: 'C++ (GCC 9.2.0)', defaultCode: `// Write your solution here\n\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  ios::sync_with_stdio(false);\n  cin.tie(nullptr);\n\n  // TODO\n  return 0;\n}\n` },
  { id: 62, label: 'Java (OpenJDK)', defaultCode: `// Write your solution here\n\nimport java.io.*;\nimport java.util.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    // TODO\n  }\n}\n` },
];

function buildPlatformSearchLinks(problemTitle) {
  const q = encodeURIComponent(problemTitle);
  return [
    { key: 'leetcode', label: 'LeetCode', hint: 'Search by title', url: `https://leetcode.com/problemset/?search=${q}` },
    { key: 'codeforces', label: 'Codeforces', hint: 'Search by title', url: `https://codeforces.com/problemset?tags=${q}` },
    { key: 'codechef', label: 'CodeChef', hint: 'Search by title', url: `https://www.codechef.com/search?search=${q}` },
  ];
}

export default function ProblemSolverModal({ isOpen, onClose, problem, difficulty, topicName }) {
  const [activeTab, setActiveTab] = useState('statement');
  const [languageId, setLanguageId] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const platforms = useMemo(() => {
    if (!problem?.title) return [];
    return buildPlatformSearchLinks(problem.title);
  }, [problem?.title]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveTab('statement');
    setResult(null);
  }, [isOpen]);

  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.id === languageId) || LANGUAGES[0];
    // Reset code to template when switching language, but only if current code equals some template
    setCode(lang.defaultCode);
  }, [languageId]);

  if (!isOpen || !problem) return null;

  async function runCode() {
    setIsRunning(true);
    setResult(null);
    try {
      const payload = {
        language_id: languageId,
        source_code: code,
        stdin,
      };
      const res = await fetch(JUDGE0_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ stderr: String(e) });
    } finally {
      setIsRunning(false);
    }
  }

  const output = result?.stdout || result?.compile_output || result?.stderr || result?.message || '';

  return (
    <div className="solver-overlay" role="dialog" aria-modal="true">
      <div className="solver-modal">
        <button className="solver-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="solver-header">
          <div className="solver-title">
            <span className="solver-topic">{topicName}</span>
            <h2>{problem.title}</h2>
          </div>
          <div className="solver-meta">
            <span className={`diff-pill ${String(difficulty || '').toLowerCase()}`}>{difficulty}</span>
          </div>
        </div>

        <div className="solver-tabs">
          <button className={`solver-tab ${activeTab === 'statement' ? 'active' : ''}`} onClick={() => setActiveTab('statement')}>
            Statement
          </button>
          <button className={`solver-tab ${activeTab === 'solve' ? 'active' : ''}`} onClick={() => setActiveTab('solve')}>
            Solve
          </button>
          <button className={`solver-tab ${activeTab === 'platforms' ? 'active' : ''}`} onClick={() => setActiveTab('platforms')}>
            LeetCode / Codeforces / CodeChef
          </button>
        </div>

        <div className="solver-body">
          {activeTab === 'statement' && (
            <div className="solver-statement">
              <p className="solver-desc">{problem.description}</p>
              <div className="solver-note">
                This is an in-app statement. If you want the exact original statement from a platform, see the Platforms tab.
              </div>
            </div>
          )}

          {activeTab === 'solve' && (
            <div className="solver-solve">
              <div className="solver-toolbar">
                <label className="solver-label">
                  Language
                  <select
                    className="solver-select"
                    value={languageId}
                    onChange={(e) => setLanguageId(Number(e.target.value))}
                    disabled={isRunning}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button className="solver-run" onClick={runCode} disabled={isRunning}>
                  {isRunning ? 'RUNNING…' : 'RUN'}
                </button>
              </div>

              <div className="solver-panels">
                <div className="solver-panel">
                  <div className="solver-panel-title">Code</div>
                  <textarea
                    className="solver-editor"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
                </div>

                <div className="solver-panel">
                  <div className="solver-panel-title">Custom Input (stdin)</div>
                  <textarea
                    className="solver-stdin"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Paste input here..."
                    spellCheck={false}
                  />

                  <div className="solver-panel-title">Output</div>
                  <pre className="solver-output">{output || '—'}</pre>
                  {result?.status?.description && (
                    <div className="solver-status">Status: {result.status.description}</div>
                  )}
                </div>
              </div>

              <div className="solver-footnote">
                Code runs in-app via Judge0. If you later want “Submit” + testcases + scoring, we can add a backend + stored test suites.
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="solver-platforms">
              <div className="solver-note">
                Most platforms block embedding their pages inside other sites (CSP / X-Frame-Options). To keep you solving inside this app, we run your code here.
              </div>
              <div className="platform-list">
                {platforms.map((p) => (
                  <div key={p.key} className="platform-item">
                    <div className="platform-name">{p.label}</div>
                    <div className="platform-hint">{p.hint}</div>
                    <a className="platform-link" href={p.url} target="_blank" rel="noreferrer">
                      Open search (optional)
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


