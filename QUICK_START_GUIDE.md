# Quick Start Guide - Code Compiler & Platform Links

## 🚀 Getting Started

### Step 1: Navigate to a Problem
- Click on any node in the **F1 Race Track**
- Select a difficulty level (Easy, Medium, Hard)
- Click on a problem card

### Step 2: View Problem Statement
- Read the problem description in the **"Statement"** tab
- Understand the requirements

### Step 3: Write Your Solution
- Go to the **"Solve"** tab
- Choose your programming language from the dropdown:
  - JavaScript (Node.js)
  - Python 3
  - C++ (GCC 9.2.0)
  - Java (OpenJDK)
- Write your code in the editor

### Step 4: Test Your Code
- (Optional) Add test input in the "Custom Input" section
- Click **"▶️ RUN CODE"** button
- Wait for execution (usually < 2 seconds)
- View the output below

### Step 5: Access Competitive Platforms
- Click the **"LeetCode / Codeforces / CodeChef"** tab
- Find the problem on:
  - 🔍 **Search**: Pre-filled search for this problem
  - → **Visit**: Browse the platform

---

## 💻 Code Examples

### Python Example:
```python
# Write your solution here

import sys

def solve(data: str) -> str:
    # Example: reverse input
    return data[::-1]

if __name__ == "__main__":
    data = sys.stdin.read()
    sys.stdout.write(str(solve(data)))
```

**Test Input**:
```
hello
```

**Expected Output**:
```
olleh
```

### JavaScript Example:
```javascript
// Write your solution here

function solve(input) {
  // Example: reverse input
  return input.split('').reverse().join('');
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
process.stdout.write(String(solve(input)));
```

### C++ Example:
```cpp
// Write your solution here

#include <bits/stdc++.h>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  cout << n * 2 << endl;
  
  return 0;
}
```

### Java Example:
```java
// Write your solution here

import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    System.out.println(n * 2);
  }
}
```

---

## ✅ Status Indicators Explained

| Status | Color | Meaning |
|--------|-------|---------|
| ✅ Success | 🟢 Green | Code executed without errors |
| ❌ Runtime Error | 🔴 Red | Code crashed during execution |
| ❌ Compilation Error | 🔴 Red | Code has syntax errors |
| ⏳ Running | ⚪ Gray | Code is being executed |
| — | ⚪ Gray | No execution result yet |

---

## 🌐 Platform Quick Links

### When to Use Each Platform:

**🎯 LeetCode**
- Best for: Interview preparation
- Features: 2000+ problems, company tags, discuss sections
- Frequency: Weekly contests
- Visit: https://leetcode.com/problemset

**⚡ Codeforces**
- Best for: Competitive programming
- Features: Fast, challenging problems, rating system
- Frequency: Regular contests (Div 1, 2, 3)
- Visit: https://codeforces.com/problemset

**👨‍💻 CodeChef**
- Best for: Skill building and practice
- Features: Detailed editorials, monthly contests
- Frequency: Monthly contests + contests
- Visit: https://www.codechef.com/problemsearch

---

## ⚙️ Troubleshooting

### Code isn't running?
- Check syntax for selected language
- Ensure stdin is properly formatted
- Try a simple "Hello World" first

### Output is incorrect?
- Check if you're reading from stdin correctly
- Verify output format matches requirements
- Test with simple examples first

### Can't access platform links?
- Check your internet connection
- Links open in new tabs (check your browser)
- Clear browser cache if issues persist

### Judge0 API Down?
- The service usually has 99.9% uptime
- Try again in a few moments
- Alternative: Test locally with your IDE

---

## 🎯 Best Practices

1. **Start Simple**: Test with basic inputs before complex ones
2. **Read Carefully**: Understand the problem completely
3. **Modularize**: Write helper functions for clarity
4. **Test Cases**: Use multiple test cases including edge cases
5. **Optimize**: After getting correct output, optimize time/space
6. **Learn**: Review solutions on platform discussions

---

## 📊 Languages Comparison

| Language | Best For | Execution Time |
|----------|----------|-----------------|
| Python | Fast development | ~0.5s |
| JavaScript | Quick prototyping | ~0.3s |
| C++ | Performance, interviews | ~0.1s |
| Java | Enterprise, interviews | ~0.2s |

---

## 🔗 External Resources

- Judge0 API: https://ce.judge0.com
- LeetCode Discuss: https://leetcode.com/discuss
- Codeforces Blog: https://codeforces.com/blog
- CodeChef Editorial: https://www.codechef.com/wiki

---

**Happy Coding! 🚀**
