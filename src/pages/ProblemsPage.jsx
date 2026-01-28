import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import CSS - Update this path based on your project structure:
// Option 1 (same folder): import './ProblemPage.css';
// Option 2 (styles folder): import '../styles/ProblemPage.css';
import './ProblemPage.css';

const ProblemsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    if (location.state?.problemId) {
      setSelectedProblem(location.state.problemId);
    }
  }, [location]);

  const problems = [
    { 
      id: 1, 
      title: 'Two Sum', 
      difficulty: 'Easy', 
      status: 'solved',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      topics: ['Array', 'Hash Table'],
      acceptance: '49.2%',
      companies: ['Google', 'Amazon', 'Microsoft']
    },
    { 
      id: 2, 
      title: 'Add Two Numbers', 
      difficulty: 'Medium', 
      status: 'solved',
      description: 'You are given two non-empty linked lists representing two non-negative integers.',
      topics: ['Linked List', 'Math', 'Recursion'],
      acceptance: '38.1%',
      companies: ['Amazon', 'Microsoft', 'Adobe']
    },
    { 
      id: 3, 
      title: 'Longest Substring Without Repeating Characters', 
      difficulty: 'Medium', 
      status: 'attempted',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      topics: ['String', 'Hash Table', 'Sliding Window'],
      acceptance: '33.8%',
      companies: ['Amazon', 'Bloomberg', 'Adobe']
    },
    { 
      id: 4, 
      title: 'Median of Two Sorted Arrays', 
      difficulty: 'Hard', 
      status: 'unsolved',
      description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
      topics: ['Array', 'Binary Search', 'Divide and Conquer'],
      acceptance: '35.3%',
      companies: ['Google', 'Amazon', 'Microsoft']
    },
    { 
      id: 5, 
      title: 'Longest Palindromic Substring', 
      difficulty: 'Medium', 
      status: 'solved',
      description: 'Given a string s, return the longest palindromic substring in s.',
      topics: ['String', 'Dynamic Programming'],
      acceptance: '32.5%',
      companies: ['Amazon', 'Microsoft', 'Apple']
    },
  ];

  const selectedProblemData = problems.find(p => p.id === selectedProblem) || problems[0];

  return (
    <div className="problems-page">
      <div className="problems-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          BACK TO DASHBOARD
        </button>
        <h1>PROBLEM SET</h1>
      </div>

      <div className="problems-container">
        <aside className="problems-sidebar">
          <div className="problems-filter">
            <h3>FILTERS</h3>
            <div className="filter-group">
              <label>Difficulty</label>
              <div className="filter-options">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Easy</button>
                <button className="filter-btn">Medium</button>
                <button className="filter-btn">Hard</button>
              </div>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <div className="filter-options">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Solved</button>
                <button className="filter-btn">Attempted</button>
                <button className="filter-btn">Unsolved</button>
              </div>
            </div>
          </div>

          <div className="problems-list-sidebar">
            {problems.map((problem) => (
              <div 
                key={problem.id} 
                className={`problem-item ${selectedProblem === problem.id ? 'selected' : ''} ${problem.status}`}
                onClick={() => setSelectedProblem(problem.id)}
              >
                <div className="problem-number">{problem.id}</div>
                <div className="problem-info">
                  <div className="problem-name">{problem.title}</div>
                  <div className="problem-badges">
                    <span className={`diff-badge ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                    <div className={`status-dot ${problem.status}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="problem-detail">
          <div className="problem-detail-header">
            <h2>{selectedProblemData.title}</h2>
            <div className="problem-detail-meta">
              <span className={`diff-badge ${selectedProblemData.difficulty.toLowerCase()}`}>
                {selectedProblemData.difficulty}
              </span>
              <span className="acceptance">Acceptance: {selectedProblemData.acceptance}</span>
            </div>
          </div>

          <div className="problem-description">
            <h3>Description</h3>
            <p>{selectedProblemData.description}</p>
          </div>

          <div className="problem-topics">
            <h3>Topics</h3>
            <div className="topics-list">
              {selectedProblemData.topics.map((topic, idx) => (
                <span key={idx} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>

          <div className="problem-companies">
            <h3>Companies</h3>
            <div className="companies-list">
              {selectedProblemData.companies.map((company, idx) => (
                <span key={idx} className="company-tag">{company}</span>
              ))}
            </div>
          </div>

          <div className="problem-actions">
            <button className="action-btn primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              SOLVE PROBLEM
            </button>
            <button className="action-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              BOOKMARK
            </button>
            <button className="action-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              HINTS
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProblemsPage;