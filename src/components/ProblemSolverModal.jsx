import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

function buildPlatformSearchLinks(problemTitle) {
  const q = encodeURIComponent(problemTitle);
  return [
    { key: 'leetcode', label: 'LeetCode', icon: '🎯', url: `https://leetcode.com/problemset/?search=${q}`, directUrl: 'https://leetcode.com/problemset/' },
    { key: 'codeforces', label: 'Codeforces', icon: '⚡', url: `https://codeforces.com/problemset?tags=${q}`, directUrl: 'https://codeforces.com/problemset' },
    { key: 'codechef', label: 'CodeChef', icon: '👨‍💻', url: `https://www.codechef.com/search?search=${q}`, directUrl: 'https://www.codechef.com/problemsearch' },
  ];
}

export default function ProblemSolverModal({ isOpen, onClose, problem, difficulty, topicName }) {
  const [languageId, setLanguageId] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [testCases, setTestCases] = useState([]);
  const [allTestsRunning, setAllTestsRunning] = useState(false);
  const [executionError, setExecutionError] = useState(null);
  const [submissionStats, setSubmissionStats] = useState({ passed: 0, failed: 0, total: 0 });

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
      return {
        ...data,
        stdout: data.stdout ? String(data.stdout).substring(0, MAX_OUTPUT_LENGTH) : '',
        stderr: data.stderr ? String(data.stderr).substring(0, MAX_OUTPUT_LENGTH) : '',
        compile_output: data.compile_output ? String(data.compile_output).substring(0, MAX_OUTPUT_LENGTH) : '',
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
      const passed = correspondingResult.stdout?.trim() === tc.expectedOutput.trim();
      return {
        ...tc,
        isRunning: false,
        result: { ...correspondingResult, passed, executionTime: correspondingResult.executionTime },
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

  if (!isOpen) return null;

  return (
    <div className="solver-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div style={{ width: '98vw', height: '95vh', background: '#fff', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        {/* Header */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '2px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>{topicName}</span>
            <h2 style={{ margin: '0.25rem 0', fontSize: '1.5rem', color: '#333' }}>{problem?.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#FF6B6B', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{difficulty}</span>
            <button onClick={onClose} style={{ fontSize: '1.5rem', cursor: 'pointer', border: 'none', background: 'none', color: '#666', padding: '0.5rem' }}>✕</button>
          </div>
        </div>

        {executionError && (
          <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,82,82,0.1)', borderBottom: '1px solid rgba(255,82,82,0.3)', color: '#ff5252', fontSize: '0.9rem' }}>
            ⚠️ {executionError}
          </div>
        )}

        {/* Main Content - Split View */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', gap: '1px', background: '#e0e0e0' }}>
          {/* Left Side: Code Editor */}
          <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden', background: '#fff' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#333' }}>Language:</label>
              <select value={languageId} onChange={(e) => handleChangeLanguage(Number(e.target.value))} style={{ padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.9rem', background: '#fff', cursor: 'pointer' }}>
                {LANGUAGES.map(lang => (<option key={lang.id} value={lang.id}>{lang.label}</option>))}
              </select>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your solution here..."
              style={{ flex: 1, padding: '1rem', fontFamily: "'Courier New', monospace", fontSize: '0.95rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'none', background: '#fafafa', color: '#333', lineHeight: '1.5' }}
            />
            <button 
              onClick={() => runAllTests()} 
              disabled={allTestsRunning}
              style={{ marginTop: '1rem', padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 'bold', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: allTestsRunning ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => !allTestsRunning && (e.target.style.background = '#45a049')}
              onMouseLeave={(e) => (e.target.style.background = '#4CAF50')}
            >
              {allTestsRunning ? '⏳ Running...' : '▶ RUN CODE'}
            </button>
          </div>

          {/* Right Side: Test Cases & Results */}
          <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden', background: '#fff' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333' }}>
              📋 Test Cases 
              {submissionStats.total > 0 && <span style={{ marginLeft: '0.5rem', color: submissionStats.failed === 0 ? '#4CAF50' : '#FF6B6B' }}>
                ({submissionStats.passed}/{submissionStats.total} passed)
              </span>}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'auto' }}>
              {testCases.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                  <p>No test cases available for this problem</p>
                </div>
              ) : (
                testCases.map((tc) => (
                  <div key={tc.id} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', background: tc.result?.passed ? '#f1f8f4' : tc.result ? '#fef5f5' : '#fafafa' }}>
                    {/* Test Case Header */}
                    <div style={{ padding: '0.75rem 1rem', background: tc.result?.passed ? '#d4edda' : tc.result ? '#f8d7da' : '#f5f5f5', borderBottom: '1px solid #ddd', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: tc.result?.passed ? '#155724' : tc.result ? '#721c24' : '#666' }}>
                      <span style={{ fontSize: '1.2rem' }}>{getTestResultIcon(tc.result) || '⏹'}</span>
                      <span>{tc.name}</span>
                      {tc.result && <span style={{ marginLeft: 'auto', fontSize: '0.85rem', opacity: 0.8 }}>⏱ {tc.result.executionTime}ms</span>}
                    </div>
                    
                    {/* Input Section */}
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e0e0e0', background: tc.result?.passed ? '#f9fdf9' : tc.result ? '#fdf9f9' : '#fff' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📥 Input:</strong>
                      <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '3px', fontSize: '0.85rem', maxHeight: '120px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#333' }}>
                        {tc.input || '(empty)'}
                      </pre>
                    </div>

                    {/* Expected Output Section */}
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e0e0e0', background: tc.result?.passed ? '#f9fdf9' : tc.result ? '#fdf9f9' : '#fff' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#28a745', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Expected Output:</strong>
                      <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#f1f8f4', border: '1px solid #c3e6cb', borderRadius: '3px', fontSize: '0.85rem', maxHeight: '120px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#155724' }}>
                        {tc.expectedOutput || '(empty)'}
                      </pre>
                    </div>

                    {/* Your Output Section */}
                    {tc.result && (
                      <div style={{ padding: '0.75rem 1rem', background: tc.result.passed ? '#f9fdf9' : '#fdf9f9' }}>
                        <strong style={{ fontSize: '0.9rem', color: tc.result.passed ? '#28a745' : '#dc3545', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {tc.result.passed ? '✅ Your Output (CORRECT!)' : '❌ Your Output (WRONG)'}
                        </strong>
                        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: tc.result.passed ? '#f1f8f4' : '#fef5f5', border: `1px solid ${tc.result.passed ? '#28a745' : '#dc3545'}`, borderRadius: '3px', fontSize: '0.85rem', maxHeight: '120px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: tc.result.passed ? '#155724' : '#721c24' }}>
                          {tc.result.stdout || '(no output)'}
                        </pre>
                        {tc.result.stderr && (
                          <div style={{ marginTop: '0.75rem' }}>
                            <strong style={{ fontSize: '0.9rem', color: '#dc3545', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🔴 Compilation/Runtime Error:</strong>
                            <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fef5f5', border: '1px solid #dc3545', borderRadius: '3px', fontSize: '0.85rem', maxHeight: '120px', overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#721c24' }}>
                              {tc.result.stderr}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {tc.isRunning && (
                      <div style={{ padding: '1rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
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


