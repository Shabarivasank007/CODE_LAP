import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getLeetCodeLink } from '../data/platformLinks';

const JUDGE0_ENDPOINT = 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=true';
const EXECUTION_TIMEOUT = 10000;
const MAX_RETRIES = 2;
const MAX_OUTPUT_LENGTH = 5000;

const LANGUAGES = [
  { id: 63, label: 'JavaScript (Node.js)', defaultCode: `// JavaScript solution\nconsole.log("Hello World");` },
  { id: 71, label: 'Python 3', defaultCode: `# Python solution\nprint("Hello World")` },
  { id: 54, label: 'C++', defaultCode: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}` },
  { id: 62, label: 'Java', defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}` },
];

// Theme colors - Red and Black
const THEME = {
  primary: '#dc143c',      // Crimson red
  primaryLight: '#ff6b6b', // Light red
  primaryDark: '#8b0000',  // Dark red
  secondary: '#1a1a1a',    // Very dark (almost black)
  surface: '#2d2d2d',      // Dark surface
  surfaceLight: '#3d3d3d', // Lighter dark surface
  text: '#f0f0f0',         // Light text
  textSecondary: '#b0b0b0', // Muted text
  border: '#404040',       // Dark border
  success: '#4CAF50',      // Keep success green for pass
  error: '#ff5252',        // Red for errors
  background: '#0d0d0d',   // Almost black background
};

function buildPlatformSearchLinks(problemTitle) {
  return [
    { key: 'leetcode', label: 'LeetCode', icon: '🎯', action: 'link', url: getLeetCodeLink(problemTitle) },
    { key: 'codeforces', label: 'Codeforces', icon: '⚡', action: 'search', url: `https://codeforces.com/problemset?search=${encodeURIComponent(problemTitle)}` },
    { key: 'codechef', label: 'CodeChef', icon: '👨‍💻', action: 'search', url: `https://www.codechef.com/problems/search?q=${encodeURIComponent(problemTitle)}` },
  ];
}

export default function ProblemSolverModal({ isOpen, onClose, problem, difficulty, topicName }) {
  const [languageId, setLanguageId] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [testCases, setTestCases] = useState([]);
  const [allTestsRunning, setAllTestsRunning] = useState(false);
  const [executionError, setExecutionError] = useState(null);
  const [submissionStats, setSubmissionStats] = useState({ passed: 0, failed: 0, total: 0 });
  const [viewModes, setViewModes] = useState({}); // per-test view: 'side' or 'stack'

  const toggleViewMode = (id) => {
    setViewModes(prev => ({ ...prev, [id]: prev[id] === 'side' ? 'stack' : 'side' }));
  };

  const platforms = useMemo(() => problem?.title ? buildPlatformSearchLinks(problem.title) : [], [problem?.title]);

  useEffect(() => {
    if (!isOpen || !problem) return;
    
    // Load test cases from problem data
    let builtInTests = [];
    if (problem.testCases && Array.isArray(problem.testCases)) {
      builtInTests = problem.testCases.map((tc, idx) => ({
        id: idx + 1,
        input: tc.input || '',
        expectedOutput: tc.output || tc.expectedOutput || '',
        name: `Test Case ${idx + 1}`,
        isRunning: false,
        result: null,
      }));
    } else {
      builtInTests = [
        { id: 1, input: '', expectedOutput: '', name: 'Test Case 1', isRunning: false, result: null },
        { id: 2, input: '', expectedOutput: '', name: 'Test Case 2', isRunning: false, result: null },
      ];
    }
    
    setTestCases(builtInTests);
    setSubmissionStats({ passed: 0, failed: 0, total: 0 });
    setExecutionError(null);
  }, [isOpen, problem]);

  // Execute code with timeout and retry
  const executeCode = useCallback(async (input, retries = MAX_RETRIES) => {
    try {
      setExecutionError(null);
      if (!code?.trim()) throw new Error('Code cannot be empty');

      const payload = { language_id: languageId, source_code: code, stdin: input || '' };
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT);

      const startTime = performance.now();
      const response = await fetch(JUDGE0_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (retries > 0) {
          await new Promise(r => setTimeout(r, 500));
          return executeCode(input, retries - 1);
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      // Decode base64 if needed
      let stdout = data.stdout || '';
      let stderr = data.stderr || '';
      let compile_output = data.compile_output || '';
      
      // Try to decode if it looks like base64 and base64_encoded flag is true
      if (data.base64_encoded) {
        try {
          stdout = stdout ? atob(stdout) : '';
          stderr = stderr ? atob(stderr) : '';
          compile_output = compile_output ? atob(compile_output) : '';
        } catch (e) {
          console.warn('Base64 decode failed, using raw output');
        }
      }
      
      return {
        ...data,
        stdout: stdout ? String(stdout).substring(0, MAX_OUTPUT_LENGTH) : '',
        stderr: stderr ? String(stderr).substring(0, MAX_OUTPUT_LENGTH) : '',
        compile_output: compile_output ? String(compile_output).substring(0, MAX_OUTPUT_LENGTH) : '',
        executionTime: (performance.now() - startTime).toFixed(0),
      };
    } catch (error) {
      const msg = error.name === 'AbortError' ? 'Execution timeout (>10s)' : error.message;
      setExecutionError(msg);
      return { stdout: '', stderr: msg, compile_output: '', executionTime: '0' };
    }
  }, [code, languageId]);

  const getTestResultIcon = (result) => {
    if (!result) return '';
    return result.passed ? '✅' : '❌';
  };

  // Run all tests in parallel
  const runAllTests = useCallback(async () => {
    if (testCases.length === 0) {
      setExecutionError('No test cases available');
      return;
    }

    const validTests = testCases.filter(tc => tc.input && tc.expectedOutput);
    if (validTests.length === 0) {
      setExecutionError('No valid test cases');
      return;
    }

    setAllTestsRunning(true);
    setExecutionError(null);

    const results = await Promise.all(validTests.map(tc => executeCode(tc.input)));

    const updated = testCases.map((tc) => {
      const correspondingResult = results[validTests.findIndex(v => v.id === tc.id)];
      if (correspondingResult === undefined) return tc;
      // Compare trimmed versions for pass/fail, but keep raw for display
      const userOut = (correspondingResult.stdout || '').trim();
      const expectedOut = (tc.expectedOutput || '').trim();
      const passed = userOut === expectedOut;
      return {
        ...tc,
        isRunning: false,
        result: { 
          ...correspondingResult, 
          passed,
          executionTime: correspondingResult.executionTime 
        },
      };
    });

    setTestCases(updated);

    const passed = updated.filter(tc => tc.result?.passed).length;
    const total = updated.filter(tc => tc.result).length;
    setSubmissionStats({ passed, failed: total - passed, total });
    setAllTestsRunning(false);
  }, [testCases, executeCode]);

  const handleChangeLanguage = (newLangId) => {
    setLanguageId(newLangId);
    const lang = LANGUAGES.find(l => l.id === newLangId);
    setCode(lang?.defaultCode || '');
  };

  const handleOpenPlatform = (platform) => {
    window.open(platform.url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="solver-overlay" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="solver-modal" style={{ background: THEME.secondary }}>
        {/* Header with Platform Links */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: `2px solid ${THEME.primary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: THEME.surface, gap: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.9rem', color: THEME.textSecondary, fontWeight: '500' }}>{topicName}</span>
            <h2 style={{ margin: '0.25rem 0', fontSize: '1.5rem', color: THEME.text }}>{problem?.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Platform Reference Links */}
            {platforms.map((platform) => (
              <button
                key={platform.key}
                onClick={() => handleOpenPlatform(platform)}
                title={`${platform.action === 'link' ? 'Go to' : 'Search'} ${platform.label} for "${problem?.title}"`}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  background: platform.key === 'leetcode' ? THEME.primary : platform.key === 'codeforces' ? '#4a4a6a' : '#5a5a7a',
                  color: '#fff',
                  border: `2px solid ${platform.key === 'leetcode' ? THEME.primaryDark : 'transparent'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, opacity 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.opacity = '0.9';
                  e.target.style.background = platform.key === 'leetcode' ? THEME.primaryDark : platform.key === 'codeforces' ? '#5a5a8a' : '#6a6a9a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.opacity = '1';
                  e.target.style.background = platform.key === 'leetcode' ? THEME.primary : platform.key === 'codeforces' ? '#4a4a6a' : '#5a5a7a';
                }}
              >
                {platform.icon} {platform.label}
              </button>
            ))}
            <span style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: THEME.primary, color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{difficulty}</span>
            <button onClick={onClose} style={{ fontSize: '1.5rem', cursor: 'pointer', border: 'none', background: 'none', color: THEME.text, padding: '0.5rem' }}>✕</button>
          </div>
        </div>

        {executionError && (
          <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(220, 20, 60, 0.2)', borderBottom: `1px solid ${THEME.primary}`, color: THEME.primaryLight, fontSize: '0.9rem' }}>
            ⚠️ {executionError}
          </div>
        )}

        {/* Main Content - Split View */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', gap: '1px', background: THEME.border }}>
          {/* Left Side: Code Editor */}
          <div className="solver-left" style={{ flex: '0 0 50%', padding: '1.5rem', background: THEME.secondary }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold', fontSize: '0.95rem', color: THEME.text }}>Language:</label>
              <select value={languageId} onChange={(e) => handleChangeLanguage(Number(e.target.value))} style={{ padding: '0.5rem 0.75rem', borderRadius: '4px', border: `1px solid ${THEME.border}`, fontSize: '0.9rem', background: THEME.surfaceLight, color: THEME.text, cursor: 'pointer' }}>
                {LANGUAGES.map(lang => (<option key={lang.id} value={lang.id}>{lang.label}</option>))}
              </select>
            </div>
            <textarea
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your solution here..."
              style={{ minHeight: '320px', padding: '1rem', fontFamily: "'Courier New', monospace", fontSize: '0.95rem', border: `1px solid ${THEME.border}`, borderRadius: '4px', resize: 'vertical', background: THEME.surface, color: THEME.text, lineHeight: '1.5' }}
            />
            <button 
              onClick={() => runAllTests()} 
              disabled={allTestsRunning}
              style={{ marginTop: '1rem', padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 'bold', background: THEME.primary, color: '#fff', border: 'none', borderRadius: '4px', cursor: allTestsRunning ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => !allTestsRunning && (e.target.style.background = THEME.primaryDark)}
              onMouseLeave={(e) => (e.target.style.background = THEME.primary)}
            >
              {allTestsRunning ? '⏳ Running...' : '▶ RUN CODE'}
            </button>
          </div>

          {/* Right Side: Test Cases & Results */}
          <div className="solver-right" style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', padding: '1.5rem', background: THEME.secondary }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: THEME.text }}>
              📋 Test Cases 
              {submissionStats.total > 0 && <span style={{ marginLeft: '0.5rem', color: submissionStats.failed === 0 ? THEME.success : THEME.error }}>
                ({submissionStats.passed}/{submissionStats.total} passed)
              </span>}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'auto' }}>
              {testCases.length === 0 ? (
                <div style={{ textAlign: 'center', color: THEME.textSecondary, padding: '2rem' }}>
                  <p>No test cases available for this problem</p>
                </div>
              ) : (
                testCases.map((tc) => (
                  <div key={tc.id} style={{ border: `1px solid ${THEME.border}`, borderRadius: '6px', overflow: 'hidden', background: tc.result?.passed ? 'rgba(76, 175, 80, 0.1)' : tc.result ? 'rgba(220, 20, 60, 0.1)' : THEME.surface }}>
                    {/* Test Case Header */}
                    <div style={{ padding: '0.75rem 1rem', background: tc.result?.passed ? 'rgba(76, 175, 80, 0.2)' : tc.result ? 'rgba(220, 20, 60, 0.2)' : THEME.surfaceLight, borderBottom: `1px solid ${THEME.border}`, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: tc.result?.passed ? THEME.success : tc.result ? THEME.error : THEME.text }}>
                      <span style={{ fontSize: '1.2rem' }}>{getTestResultIcon(tc.result) || '⏹'}</span>
                      <span>{tc.name}</span>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button onClick={() => toggleViewMode(tc.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', borderRadius: '4px', border: `1px solid ${THEME.border}`, background: THEME.surfaceLight, color: THEME.text, cursor: 'pointer' }}>
                          {viewModes[tc.id] === 'side' ? '🔳 Side' : '📋 Stack'}
                        </button>
                        {tc.result && <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>⏱ {tc.result.executionTime}ms</span>}
                      </div>
                    </div>
                    
                    {/* Input Section */}
                    <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${THEME.border}`, background: THEME.surface }}>
                      <strong style={{ fontSize: '0.9rem', color: THEME.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📥 Input:</strong>
                      <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: THEME.surfaceLight, border: `1px solid ${THEME.border}`, borderRadius: '3px', fontSize: '0.85rem', maxHeight: '120px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: THEME.textSecondary }}>
                        {tc.input || '(empty)'}
                      </pre>
                    </div>

                    {/* Comparison View: side-by-side or stacked */}
                    <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${THEME.border}`, background: THEME.surface }}>
                      <div style={{ display: 'flex', gap: '1rem', flexDirection: viewModes[tc.id] === 'side' ? 'row' : 'column' }}>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.9rem', color: THEME.success, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Expected Output:</strong>
                          <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: 'rgba(76, 175, 80, 0.06)', border: `1px solid ${THEME.success}`, borderRadius: '3px', fontSize: '0.85rem', maxHeight: '260px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: THEME.success }}>
                            {tc.expectedOutput || '(empty)'}
                          </pre>
                        </div>

                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.9rem', color: tc.result?.passed ? THEME.success : THEME.error, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {tc.result ? (tc.result.passed ? '✅ Your Output (CORRECT!)' : '❌ Your Output (WRONG)') : '⚪ Your Output'}
                          </strong>
                          <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: tc.result ? (tc.result.passed ? 'rgba(76, 175, 80, 0.04)' : 'rgba(220, 20, 60, 0.04)') : THEME.surfaceLight, border: `1px solid ${tc.result ? (tc.result.passed ? THEME.success : THEME.error) : THEME.border}`, borderRadius: '3px', fontSize: '0.85rem', maxHeight: '260px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: tc.result ? (tc.result.passed ? THEME.success : THEME.error) : THEME.textSecondary, fontFamily: "'Courier New', monospace" }}>
                            {tc.result?.stdout ? tc.result.stdout : '(waiting for output)'}
                          </pre>

                          {tc.result?.stderr && (
                            <div style={{ marginTop: '0.75rem' }}>
                              <strong style={{ fontSize: '0.9rem', color: THEME.error, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🔴 Compilation/Runtime Error:</strong>
                              <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: 'rgba(220, 20, 60, 0.06)', border: `1px solid ${THEME.error}`, borderRadius: '3px', fontSize: '0.85rem', maxHeight: '160px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: THEME.error }}>
                                {tc.result.stderr}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {tc.isRunning && (
                      <div style={{ padding: '1rem', textAlign: 'center', color: THEME.textSecondary, fontSize: '0.9rem' }}>
                        ⏳ Executing...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


