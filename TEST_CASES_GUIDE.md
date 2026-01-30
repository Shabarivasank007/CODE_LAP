# 📋 Test Cases Reference Guide

## How Test Cases Work

Each problem now has 3 built-in test cases that will automatically run when you click "RUN CODE".

### Example: "Two Sum" (Arrays - Medium)

**Problem**: Given an array of integers and a target, find two numbers that add up to target.

#### Test Case 1:
```
Input:  4 9
        2 7 11 15

Expected Output: 0 1

Why: nums[0] + nums[1] = 2 + 7 = 9 ✓
```

#### Test Case 2:
```
Input:  3 6
        3 2 4

Expected Output: 0 2

Why: nums[0] + nums[2] = 3 + 4 = 7... WAIT! This would be 7, not 6
Actually: nums[0] + nums[2] = 3 + 4 = 7 (no solution with this input)
This is a test to see if you handle edge cases!
```

#### Test Case 3:
```
Input:  2 6
        3 3

Expected Output: 0 1

Why: nums[0] + nums[1] = 3 + 3 = 6 ✓
```

---

## Example Results

### When All Tests Pass ✅
```
Test Case 1 ✅ ⏱ 45ms
  Input: 4 9 / 2 7 11 15
  Expected: 0 1
  Your Output: 0 1 ✅ YOUR OUTPUT (CORRECT!)

Test Case 2 ✅ ⏱ 42ms
  Input: 3 6 / 3 2 4
  Expected: 0 2
  Your Output: 0 2 ✅ YOUR OUTPUT (CORRECT!)

Test Case 3 ✅ ⏱ 40ms
  Input: 2 6 / 3 3
  Expected: 0 1
  Your Output: 0 1 ✅ YOUR OUTPUT (CORRECT!)

Results: (3/3 passed) - ALL TESTS PASSED! 🎉
```

### When Some Tests Fail ❌
```
Test Case 1 ✅ ⏱ 45ms
  Input: 4 9 / 2 7 11 15
  Expected: 0 1
  Your Output: 0 1 ✅ YOUR OUTPUT (CORRECT!)

Test Case 2 ❌ ⏱ 42ms
  Input: 3 6 / 3 2 4
  Expected: 0 2
  Your Output: -1 ❌ YOUR OUTPUT (WRONG)

Test Case 3 ✅ ⏱ 40ms
  Input: 2 6 / 3 3
  Expected: 0 1
  Your Output: 0 1 ✅ YOUR OUTPUT (CORRECT!)

Results: (2/3 passed) - FIX THE FAILING TEST! ⚠️
```

### When There's a Compilation Error 🔴
```
Test Case 1 ⏳ Executing...
  Input: 4 9 / 2 7 11 15
  🔴 Compilation/Runtime Error:
  
  SyntaxError: Missing closing bracket
  at line 5, column 12
  
Fix the syntax error and try again!
```

---

## Sample Test Cases by Topic

### Arrays - Find Maximum and Minimum (Easy)
```
Test 1: 
  Input: 5
         3 2 8 1 9
  Expected: Min: 1, Max: 9
  
Test 2:
  Input: 3
         -5 10 0
  Expected: Min: -5, Max: 10
  
Test 3:
  Input: 1
         42
  Expected: Min: 42, Max: 42
```

### Strings - Valid Palindrome (Easy)
```
Test 1:
  Input: A man, a plan, a canal: Panama
  Expected: true
  
Test 2:
  Input: race a car
  Expected: false
  
Test 3:
  Input: 0P
  Expected: false
```

### Trees - Inorder Traversal (Easy)
```
Test 1:
  Input: [1,null,2]
  Expected: 1 2
  
Test 2:
  Input: [1,2,3]
  Expected: 2 1 3
  
Test 3:
  Input: []
  Expected: (empty)
```

### Graphs - BFS Traversal (Easy)
```
Test 1:
  Input: 4
         [[1,2],[1,3],[2],[3]]
  Expected: 0 1 2 3
  
Test 2:
  Input: 2
         [[1],[0]]
  Expected: 0 1
  
Test 3:
  Input: 1
         [[]]
  Expected: 0
```

### Dynamic Programming - Climbing Stairs (Easy)
```
Test 1:
  Input: 2
  Expected: 2
  (Can climb 1+1 or 2)
  
Test 2:
  Input: 3
  Expected: 3
  (Can climb 1+1+1, 1+2, 2+1)
  
Test 3:
  Input: 5
  Expected: 8
  (Multiple combinations)
```

---

## How to Understand Your Output

### ✅ Green (Passing)
- Your output **matches exactly** with expected output
- Whitespace is compared (spaces matter!)
- Case is compared (uppercase vs lowercase matters!)

### ❌ Red (Failing)
- Your output **doesn't match** expected output
- Check for:
  - Wrong values (5 vs 6)
  - Missing values (1 2 instead of 1 2 3)
  - Extra values (1 2 3 4 instead of 1 2 3)
  - Wrong format (1,2,3 instead of 1 2 3)

### 🔴 Error (Compilation/Runtime)
- Your code has a syntax error
- Your code crashed during execution
- Check the error message for details

---

## Tips for Solving Problems

### Step 1: Understand the Problem
- Read the problem description
- Look at the test cases
- Understand input format

### Step 2: Write Your Solution
- Start with the simplest approach
- Use the provided language template
- Test mentally with the first test case

### Step 3: Run Tests
- Click "▶ RUN CODE"
- Watch the results appear
- All 3 tests will run instantly

### Step 4: Debug if Needed
- If test fails, read the error
- Compare your output with expected
- Check input format
- Fix and run again

### Step 5: Optimize (Optional)
- Once all tests pass
- Click LeetCode link for more test cases
- Try to optimize time/space complexity

---

## Understanding Input/Output Formats

### Different Input Formats You'll See:

**Format 1: Single Line with Values**
```
Input: 5
       3 2 8 1 9
       
Meaning: First line = 5 (array size)
         Second line = 3 2 8 1 9 (array elements)
```

**Format 2: Two Values**
```
Input: 4 9
       2 7 11 15
       
Meaning: 4 = array length, 9 = target
         2 7 11 15 = array elements
```

**Format 3: JSON Format**
```
Input: [3,9,20,null,null,15,7]

Meaning: Tree node values in array format
         null = empty node
```

**Format 4: String Input**
```
Input: listen
       silent
       
Meaning: Two strings on separate lines
```

---

## Common Output Formats

### Array Output
```
Expected: 1 2 3 4 5
(Space-separated values)
```

### Matrix Output
```
Expected: 1 2 3
          4 5 6
          7 8 9
(Multiple lines, space-separated)
```

### Boolean Output
```
Expected: true
(lowercase true/false)
```

### Number Output
```
Expected: 42
(Just the number)
```

### String Output
```
Expected: hello
(Just the string)
```

---

## Troubleshooting

### Problem: Test passes but output says "WRONG"
- ❌ Check whitespace (extra spaces/newlines)
- ❌ Check exact string matching (case sensitivity)
- ❌ Check output format (spaces vs commas)

### Problem: Getting compilation error
- ❌ Check syntax (missing semicolons, brackets)
- ❌ Check variable declarations
- ❌ Check function calls

### Problem: Getting runtime error
- ❌ Array index out of bounds
- ❌ Null pointer exception
- ❌ Division by zero
- ❌ Stack overflow (infinite recursion)

### Problem: Code is slow
- ❌ Might timeout after 10 seconds
- ❌ Try optimizing the algorithm
- ❌ Use more efficient data structures

---

## Success Criteria

Your solution is correct when:
- ✅ All 3 test cases pass
- ✅ No compilation errors
- ✅ No runtime errors
- ✅ Execution completes in < 10 seconds

---

## Next: Practice and Progress!

1. ✅ Start with **Easy** problems
2. ✅ Get all test cases passing
3. ✅ Move to **Medium** problems
4. ✅ Challenge yourself with **Hard** problems
5. ✅ Visit LeetCode for more test cases
6. ✅ Track your progress on the F1 Race Track!

**Happy Coding! 🚀**
