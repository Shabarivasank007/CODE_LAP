# 🔧 COMPILER TECHNICAL DOCUMENTATION

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Your App)                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ProblemsPage.jsx                                            │
│  ├─ Displays 50 DSA problems                                 │
│  ├─ Loads test cases from testCasesData.js                   │
│  └─ Opens ProblemSolverModal when problem clicked            │
│                                                               │
│  ProblemSolverModal.jsx                                      │
│  ├─ Code editor (textarea)                                   │
│  ├─ Language selector                                        │
│  ├─ Test case display                                        │
│  ├─ Platform links (LeetCode, Codeforces, CodeChef)          │
│  └─ Calls executeCode() function                             │
│                                                               │
│  testCasesData.js                                            │
│  ├─ TEST_CASES object with 500+ test cases                   │
│  ├─ Organized by: topic → difficulty → problem               │
│  └─ getTestCasesForProblem() export                           │
│                                                               │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP Request
                     │ (POST with code)
                     ↓
        ┌───────────────────────────┐
        │   Judge0 Compiler API     │
        │ https://ce.judge0.com     │
        │                           │
        │ - Compiles code           │
        │ - Executes with input     │
        │ - Returns output/errors   │
        └────────────┬──────────────┘
                     │ HTTP Response
                     │ (stdout/stderr)
                     ↓
        ┌───────────────────────────┐
        │   Compare Results         │
        │ User Output vs Expected   │
        └────────────┬──────────────┘
                     │
                     ↓
        ┌───────────────────────────┐
        │   Display Results         │
        │ ✅ Pass / ❌ Fail         │
        │ Show Statistics           │
        └───────────────────────────┘
```

---

## File Structure

```
CODE_LAP/
├── src/
│   ├── components/
│   │   └── ProblemSolverModal.jsx          ← Main compiler component
│   ├── pages/
│   │   └── ProblemsPage.jsx                ← Problem list & selector
│   ├── data/
│   │   └── testCasesData.js                ← 500+ test cases (NEW)
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── COMPILER_COMPLETION.md                   ← Usage guide (NEW)
```

---

## Code Flow Explanation

### 1. User Selects Problem
```jsx
// ProblemsPage.jsx
const problemsForDifficulty = useMemo(() => {
  return (selectedTopic?.difficulties?.[selectedDifficulty] || [])
    .map(problem => ({
      ...problem,
      testCases: getTestCasesForProblem(
        selectedTopicId, 
        selectedDifficulty, 
        problem.title
      )
    }));
}, [selectedTopic, selectedDifficulty, selectedTopicId]);

// When user clicks on a problem
onClick={() => setActiveProblem(problem)}  // problem has testCases attached
```

### 2. Modal Opens with Test Cases
```jsx
// ProblemSolverModal.jsx - useEffect
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
  }
  
  setTestCases(builtInTests);
}, [isOpen, problem]);
```

### 3. User Writes Code and Clicks Run
```jsx
// ProblemSolverModal.jsx - runAllTests function
const runAllTests = useCallback(async () => {
  setAllTestsRunning(true);
  
  // Run all tests in parallel
  const results = await Promise.all(
    validTests.map(tc => executeCode(tc.input))
  );
  
  // Compare results with expected outputs
  const updated = testCases.map((tc) => {
    const result = results[...];
    const passed = result.stdout?.trim() === tc.expectedOutput.trim();
    return {
      ...tc,
      result: { ...result, passed, executionTime }
    };
  });
  
  setTestCases(updated);
  setAllTestsRunning(false);
}, [testCases, executeCode]);
```

### 4. Code Execution via Judge0
```jsx
// ProblemSolverModal.jsx - executeCode function
const executeCode = useCallback(async (input) => {
  const payload = {
    language_id: languageId,        // 63=JS, 71=Python, 54=C++, 62=Java
    source_code: code,              // User's code
    stdin: input || ''              // Test case input
  };
  
  const response = await fetch(
    'https://ce.judge0.com/submissions/?base64_encoded=false&wait=true',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }
  );
  
  const data = await response.json();
  return {
    stdout: data.stdout,            // Program output
    stderr: data.stderr,            // Error messages
    compile_output: data.compile_output,
    executionTime: (performance.now() - startTime).toFixed(0)
  };
}, [code, languageId]);
```

### 5. Results Display
```jsx
// ProblemSolverModal.jsx - Result rendering
{testCases.map((tc) => (
  <div key={tc.id}>
    {/* Header with ✅/❌ icon */}
    <div style={{...}}>
      {tc.result?.passed ? '✅' : '❌'}
      {tc.name}
      {tc.result && <span>⏱ {tc.result.executionTime}ms</span>}
    </div>
    
    {/* Input Display */}
    <pre>{tc.input}</pre>
    
    {/* Expected Output Display */}
    <pre style={{...green background...}}>
      {tc.expectedOutput}
    </pre>
    
    {/* Your Output Display */}
    {tc.result && (
      <pre style={{...green if passed, red if failed...}}>
        {tc.result.stdout}
      </pre>
    )}
    
    {/* Error Display */}
    {tc.result?.stderr && (
      <pre style={{...red background...}}>
        {tc.result.stderr}
      </pre>
    )}
  </div>
))}
```

---

## Judge0 API Reference

### Endpoint
```
POST https://ce.judge0.com/submissions/?base64_encoded=false&wait=true
```

### Request Body
```json
{
  "language_id": 71,              // Language ID
  "source_code": "print('hello')", // Your code
  "stdin": "test input"            // Program input
}
```

### Response
```json
{
  "stdout": "hello\n",             // Program output
  "stderr": "",                    // Error messages
  "compile_output": "",            // Compilation errors
  "status_id": 3,                  // Status (3 = accepted)
  "time": "0.123s",               // Execution time
  "memory": "12345"                // Memory used
}
```

### Language IDs
```
54 = C++           { id: 54, label: 'C++' }
62 = Java          { id: 62, label: 'Java' }
63 = JavaScript    { id: 63, label: 'JavaScript (Node.js)' }
71 = Python 3      { id: 71, label: 'Python 3' }
```

---

## Test Cases Data Structure

### File: testCasesData.js

```javascript
export const TEST_CASES = {
  arrays: {
    Easy: {
      'Find Maximum and Minimum': [
        { input: '5\n3 2 8 1 9', expectedOutput: 'Min: 1, Max: 9' },
        { input: '3\n-5 10 0', expectedOutput: 'Min: -5, Max: 10' },
        { input: '1\n42', expectedOutput: 'Min: 42, Max: 42' },
      ],
      'Reverse an Array': [...],
      ...
    },
    Medium: { ... },
    Hard: { ... },
  },
  strings: { ... },
  trees: { ... },
  graphs: { ... },
  dp: { ... },
};

export const getTestCasesForProblem = (topic, difficulty, problemTitle) => {
  return TEST_CASES[topic]?.[difficulty]?.[problemTitle] || [];
};
```

### Access Example
```javascript
// Get test cases for "Two Sum" (Arrays, Medium)
const testCases = getTestCasesForProblem('arrays', 'Medium', 'Two Sum');

// Returns:
// [
//   { input: '4 9\n2 7 11 15', expectedOutput: '0 1' },
//   { input: '3 6\n3 2 4', expectedOutput: '0 2' },
//   { input: '2 6\n3 3', expectedOutput: '0 1' },
// ]
```

---

## Component Props

### ProblemSolverModal
```jsx
<ProblemSolverModal
  isOpen={boolean}                    // Modal open/closed
  onClose={function}                  // Close handler
  problem={{                          // Problem object
    title: string,
    description: string,
    testCases: Array<{
      input: string,
      expectedOutput: string
    }>
  }}
  difficulty={string}                 // 'Easy', 'Medium', 'Hard'
  topicName={string}                  // 'Arrays', 'Strings', etc.
/>
```

---

## State Management

### ProblemSolverModal State
```jsx
const [languageId, setLanguageId] = useState(LANGUAGES[0].id);
// Current selected programming language

const [code, setCode] = useState(LANGUAGES[0].defaultCode);
// User's code in the editor

const [testCases, setTestCases] = useState([]);
// Array of test cases with execution results

const [allTestsRunning, setAllTestsRunning] = useState(false);
// Loading state while tests execute

const [executionError, setExecutionError] = useState(null);
// Error message if compilation fails

const [submissionStats, setSubmissionStats] = useState({
  passed: 0,
  failed: 0,
  total: 0
});
// Statistics: how many tests passed/failed
```

---

## Error Handling

### Timeout Error (>10s)
```javascript
const EXECUTION_TIMEOUT = 10000; // 10 seconds
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT);
// Aborts if timeout exceeded
```

### API Error
```javascript
if (!response.ok) {
  if (retries > 0) {
    // Retry up to MAX_RETRIES times
    await new Promise(r => setTimeout(r, 500)); // Wait 500ms
    return executeCode(input, retries - 1);
  }
  throw new Error(`API Error: ${response.status}`);
}
```

### Output Comparison
```javascript
const passed = correspondingResult.stdout?.trim() === tc.expectedOutput.trim();
// Trims whitespace and compares strings exactly
```

---

## Performance Optimizations

### 1. Parallel Test Execution
```javascript
const results = await Promise.all(validTests.map(tc => executeCode(tc.input)));
// All tests run simultaneously, not sequentially
```

### 2. Output Limiting
```javascript
const MAX_OUTPUT_LENGTH = 5000;
stdout: data.stdout.substring(0, MAX_OUTPUT_LENGTH)
// Prevents huge outputs from crashing browser
```

### 3. Memoization
```javascript
const platforms = useMemo(() => 
  buildPlatformSearchLinks(problem?.title), 
  [problem?.title]
);
// Recalculates only when problem title changes
```

### 4. Lazy State Updates
```javascript
const updated = testCases.map((tc) => {...});
setTestCases(updated);
// Updates all at once, not individually
```

---

## Platform Integration

### LeetCode Link
```javascript
{
  key: 'leetcode',
  label: 'LeetCode',
  icon: '🎯',
  url: `https://leetcode.com/problemset/?search=${q}`,
  directUrl: 'https://leetcode.com/problemset/'
}

// When clicked:
window.open(platform.url, '_blank');
// Opens search with problem title
```

### Codeforces Link
```javascript
{
  key: 'codeforces',
  label: 'Codeforces',
  icon: '⚡',
  url: `https://codeforces.com/problemset?tags=${q}`,
  directUrl: 'https://codeforces.com/problemset'
}
```

### CodeChef Link
```javascript
{
  key: 'codechef',
  label: 'CodeChef',
  icon: '👨‍💻',
  url: `https://www.codechef.com/search?search=${q}`,
  directUrl: 'https://www.codechef.com/problemsearch'
}
```

---

## Testing Checklist

- [x] Test case loading for all 50 problems
- [x] Code execution with JavaScript
- [x] Code execution with Python
- [x] Code execution with C++
- [x] Code execution with Java
- [x] Output comparison (pass/fail)
- [x] Error handling and display
- [x] Timeout handling
- [x] Platform links functionality
- [x] UI responsiveness
- [x] State management
- [x] Memory management

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Mobile browsers (not optimized for small screens)

---

## Future Improvements

1. **Code Syntax Highlighting**: Add Monaco editor or CodeMirror
2. **Custom Test Cases**: Allow users to create their own tests
3. **Code Templates**: Pre-filled solution outlines
4. **Discussion Forum**: Comment on problems
5. **Leaderboard**: Fastest/most efficient solutions
6. **Submissions History**: Track all submissions
7. **Hints System**: Provide hints for each problem
8. **Advanced Statistics**: Time/space complexity analysis
9. **Offline Mode**: Cache test cases locally
10. **Mobile Optimization**: Responsive design for mobile

---

## Support & Troubleshooting

### Issue: Judge0 API not responding
- **Cause**: Network issue or API down
- **Solution**: Retry, check internet connection

### Issue: Code timeout (>10 seconds)
- **Cause**: Inefficient algorithm (infinite loop, etc.)
- **Solution**: Optimize code, check for bugs

### Issue: Compilation error
- **Cause**: Syntax error in code
- **Solution**: Check error message, fix syntax

### Issue: Wrong output
- **Cause**: Logic error in solution
- **Solution**: Debug, check test case format

### Issue: Platform links not opening
- **Cause**: Browser blocking popups
- **Solution**: Allow popups in browser settings

---

## Version Info

- **Created**: January 2026
- **Framework**: React 18+
- **Judge0 API**: v5.0+
- **Supported Languages**: 4 (JS, Python, C++, Java)
- **Test Cases**: 500+
- **Problems**: 50 DSA problems

---

## License & Attribution

- **Judge0 API**: Free tier for educational use
- **Components**: Custom React implementation
- **Test Cases**: Curated from DSA best practices

---

**For any issues or questions, refer to COMPILER_COMPLETION.md or TEST_CASES_GUIDE.md**
