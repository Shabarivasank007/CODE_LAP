# Visual Guide - Code Compiler & Platform Links

## 🎨 UI/UX Layout

### Problem Modal Layout:
```
┌─────────────────────────────────────────────────────────────────┐
│ [Topic]                                   [Difficulty Badge] [X] │
├─────────────────────────────────────────────────────────────────┤
│ [Statement Tab] [Solve Tab] [Platforms Tab]                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     CONTENT AREA                         │    │
│  │  (Changes based on selected tab)                         │    │
│  │                                                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📄 STATEMENT TAB

```
┌───────────────────────────────────────┐
│     Problem Statement                 │
├───────────────────────────────────────┤
│                                       │
│  [Problem description text...]        │
│  [Key requirements...]                │
│  [Example input/output...]            │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ ℹ️ This is an in-app statement   │  │
│  │ See Platforms tab for official  │  │
│  │ statement from the platform     │  │
│  └─────────────────────────────────┘  │
│                                       │
└───────────────────────────────────────┘
```

---

## 💻 SOLVE TAB (Main Compiler)

```
┌──────────────────────────────────────────────────────────────┐
│ Language: [Dropdown ▼]  Language: [Dropdown ▼]  [▶️ RUN CODE] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────┐  ┌─────────────────────────┐   │
│  │   Code Editor          │  │  Custom Input (stdin)   │   │
│  │ ┌──────────────────┐   │  │ ┌─────────────────────┐ │   │
│  │ │                  │   │  │ │                     │ │   │
│  │ │ // Write your    │   │  │ │ Paste test input    │ │   │
│  │ │ // solution here │   │  │ │ here                │ │   │
│  │ │                  │   │  │ │                     │ │   │
│  │ │ function solve() │   │  │ └─────────────────────┘ │   │
│  │ │ { }              │   │  │                         │   │
│  │ │                  │   │  │ Output                  │   │
│  │ │                  │   │  │ ┌─────────────────────┐ │   │
│  │ │                  │   │  │ │ ✅ Success          │ │   │
│  │ │                  │   │  │ │                     │ │   │
│  │ │                  │   │  │ │ [execution output]  │ │   │
│  │ │                  │   │  │ │                     │ │   │
│  │ │                  │   │  │ └─────────────────────┘ │   │
│  │ └──────────────────┘   │  │                         │   │
│  └────────────────────────┘  └─────────────────────────┘   │
│                                                              │
│  ℹ️ Code runs in-app via Judge0 API. Output displayed live.│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Language Dropdown Options:
- 🔹 JavaScript (Node.js)
- 🔹 Python 3
- 🔹 C++ (GCC 9.2.0)
- 🔹 Java (OpenJDK)

### Output Status Indicators:
```
✅ Success      → Green background, code ran without errors
❌ Runtime Error → Red background, code crashed
❌ Compilation Error → Red background, syntax errors
⏳ Running...   → Gray background, execution in progress
—              → Gray background, no execution yet
```

---

## 🌐 PLATFORMS TAB (Live Links)

```
┌─────────────────────────────────────────────────────────────┐
│  🔗 Live Platform Links:                                    │
│  Click any link below to open in new tab                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐ │
│  │                  │  │                  │  │            │ │
│  │       🎯         │  │        ⚡       │  │    👨‍💻     │ │
│  │     LeetCode     │  │    Codeforces    │  │  CodeChef  │ │
│  │                  │  │                  │  │            │ │
│  │ Visit LeetCode   │  │ Visit Codeforces │  │ Visit      │ │
│  │ and search for   │  │ and search for   │  │ CodeChef   │ │
│  │ this problem     │  │ this problem     │  │ and search │ │
│  │                  │  │                  │  │            │ │
│  │ ┌────────────┐   │  │ ┌────────────┐   │  │ ┌────────┐ │ │
│  │ │🔍 Search   │   │  │ │🔍 Search   │   │  │ │Search │ │ │
│  │ └────────────┘   │  │ └────────────┘   │  │ └────────┘ │ │
│  │ ┌────────────┐   │  │ ┌────────────┐   │  │ ┌────────┐ │ │
│  │ │→ Visit     │   │  │ │→ Visit     │   │  │ │→ Visit │ │ │
│  │ └────────────┘   │  │ └────────────┘   │  │ └────────┘ │ │
│  │                  │  │                  │  │            │ │
│  └──────────────────┘  └──────────────────┘  └────────────┘ │
│                                                              │
│  💡 TIPS:                                                   │
│  • LeetCode → Interview preparation & structured problems  │
│  • Codeforces → Competitive programming & contests         │
│  • CodeChef → Monthly contests & endurance practice        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Button Actions:
```
🔍 SEARCH Button:
   └─→ Opens platform search with problem title pre-filled
       Color: Yellow/Gold
       Example: https://leetcode.com/problemset/?search=Two%20Sum

→ VISIT Button:
   └─→ Opens main platform problemset/browse page
       Color: Green
       Example: https://leetcode.com/problemset/
```

---

## 🎨 Color Scheme

### Status Colors:
- 🟢 **#00e676** - Success (Green)
- 🔴 **#ff5252** - Error (Red)
- 🟡 **#ffea00** - Medium/Warning (Yellow)
- ⚪ **Gray** - Neutral/Pending

### UI Colors:
- 🔴 **#dc0000** - Red (Primary brand color)
- ⚫ **#0a0a0a** - Dark background
- ⚫ **#1a1a1a** - Secondary dark
- ⚪ **#ffffff** - Text/Light

---

## 🖱️ User Interactions

### Clicking a Problem:
```
F1 Race Track → Click Problem Card → Modal Opens
```

### Using the Compiler:
```
1. Select Language
   ↓
2. Write Code
   ↓
3. Add Test Input (Optional)
   ↓
4. Click "RUN CODE"
   ↓
5. View Output
```

### Accessing Platforms:
```
1. Open Problem
   ↓
2. Go to "Platforms" Tab
   ↓
3. Choose Action:
   - 🔍 Search → Pre-filled search
   - → Visit → Browse platform
   ↓
4. Link opens in new tab
```

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Close Modal | Esc or Click X |
| Switch Tab | Click tab button |
| Change Language | Click dropdown |
| Run Code | Click "RUN CODE" |
| Open Platform | Click link |

---

## 📐 Responsive Breakpoints

### Desktop (1200px+):
```
[Track] [Problems Panel]
Both visible side by side
Full-width modal
```

### Tablet (768px - 1200px):
```
[Track] above [Problems Panel]
Stacked vertically
Adjusted modal size
```

### Mobile (< 768px):
```
[Problems] only (Track collapsed)
Full-width modal
Touch-friendly buttons
Stacked layout
```

---

## 🔔 Notifications & Messages

### Success:
```
✅ Success
Code executed without errors
```

### Compilation Error:
```
❌ Compilation Error
Line 5: Unexpected token '}'
```

### Runtime Error:
```
❌ Runtime Error
Maximum recursion depth exceeded
```

### API Error:
```
❌ Error
Judge0 API temporarily unavailable
```

---

## 📊 Example Workflow

### Complete User Journey:

```
1. USER OPENS APP
   ↓
2. SELECTS DIFFICULTY
   (Easy / Medium / Hard)
   ↓
3. CLICKS PROBLEM
   Modal Opens
   ↓
4. READS STATEMENT TAB
   ↓
5. GOES TO SOLVE TAB
   ↓
6. SELECTS LANGUAGE
   (JavaScript, Python, C++, Java)
   ↓
7. WRITES CODE
   ↓
8. ADDS TEST INPUT
   (Example: "5\n3")
   ↓
9. CLICKS "RUN CODE"
   ↓
10. SEES OUTPUT
    ✅ Success / ❌ Error
    ↓
11. (OPTIONAL) CHECKS PLATFORMS TAB
    ↓
12. CLICKS "SEARCH" OR "VISIT"
    Links open in new tabs
    ↓
13. SOLVES ON PLATFORM
    or
    Returns to app to modify code
```

---

## 🎯 Key Visual Elements

### Gradients Used:
```
• Dark background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
• Platform cards: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(220,0,0,0.05))
• Output success: rgba(0, 230, 118, 0.08)
• Output error: rgba(255, 82, 82, 0.08)
```

### Shadows Used:
```
• Modal: 0 30px 80px rgba(0, 0, 0, 0.9)
• Cards: 0 8px 24px rgba(220, 0, 0, 0.15)
• Glows: 0 0 12px rgba(color, 0.3)
```

### Animations Used:
```
• Hover: transform scale(1.05), smooth transitions
• Output status: Color transitions on success/error
• Buttons: Shadow and color animations on hover
• Links: Color and scale animations
```

---

**Complete Visual Overview Ready! 🎨**
