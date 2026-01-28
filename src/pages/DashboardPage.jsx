import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  // DSA concepts whitelist
  const dsaConcepts = [
    'array', 'arrays', 'string', 'strings', 'linked list', 'linked lists',
    'stack', 'stacks', 'queue', 'queues', 'tree', 'trees', 'binary tree',
    'bst', 'binary search tree', 'graph', 'graphs', 'heap', 'heaps',
    'hash', 'hashing', 'hash map', 'hash table', 'dynamic programming',
    'dp', 'greedy', 'backtracking', 'recursion', 'sorting', 'searching',
    'binary search', 'dfs', 'bfs', 'trie', 'segment tree', 'fenwick tree',
    'disjoint set', 'union find', 'sliding window', 'two pointer',
    'bit manipulation', 'matrix', 'divide and conquer', 'prefix sum',
    'kadane', 'dijkstra', 'bellman ford', 'floyd warshall', 'kruskal',
    'prim', 'topological sort', 'strongly connected components', 'articulation',
    'bridge', 'minimum spanning tree', 'mst', 'lca', 'lowest common ancestor'
  ];

  // Check if search query is DSA-related
  const isDSAConcept = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    return dsaConcepts.some(concept => 
      lowerQuery.includes(concept) || concept.includes(lowerQuery)
    );
  };

  // Simulate YouTube API search (you'll need to implement actual API)
  const searchYouTubeVideos = async (query) => {
    setIsSearching(true);
    setShowSearchModal(true);

    // Check if it's a DSA concept
    if (!isDSAConcept(query)) {
      setSearchMessage('🎯 Focus on your studies! This search is not related to DSA concepts.');
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Add DSA context to search query
    const dsaQuery = `${query} data structures algorithms tutorial`;

    // Simulated search results (replace with actual YouTube API call)
    // You'll need to use YouTube Data API v3
    setTimeout(() => {
      const mockResults = generateMockDSAVideos(query);
      setSearchResults(mockResults);
      setSearchMessage(`Found ${mockResults.length} DSA tutorial videos for "${query}"`);
      setIsSearching(false);
    }, 1500);
  };

  // Generate mock DSA videos based on search query
  const generateMockDSAVideos = (query) => {
    const educators = [
      'NeetCode', 'Abdul Bari', 'freeCodeCamp', 'mycodeschool',
      'WilliamFiset', 'TakeUForward', 'Aditya Verma', 'Jenny\'s Lectures',
      'CodeWithHarry', 'Apna College'
    ];

    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: `search-${i}`,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Complete Tutorial ${i + 1}`,
      youtubeId: getRelatedVideoId(query, i),
      duration: `${Math.floor(Math.random() * 40) + 20}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      topic: query.charAt(0).toUpperCase() + query.slice(1),
      difficulty: difficulties[Math.floor(Math.random() * 3)],
      views: `${Math.floor(Math.random() * 500) + 50}K`,
      channel: educators[Math.floor(Math.random() * educators.length)]
    }));
  };

  // Map search queries to real YouTube video IDs (sample mapping)
  const getRelatedVideoId = (query, index) => {
    const videoMappings = {
      'tree': ['gm8DUJJhmY4', 'qH6yxkw0u78', '1XC3p2zBK34', 'oSWTXtMglKE', 'Bfqd8BsPVuw'],
      'graph': ['pcKY4hjDrxk', '09_LlHjoEiY', 'tWVWeAqZ0WU', 'zaBhtODEL0w', 'EgI5nU0TyIg'],
      'array': ['KLlXCFG5TnA', 'n60Dn0UsbEk', '8hly31xKli0', 'ZTURE2V2bx0', 'EHQfh7Vxnsg'],
      'linked list': ['Hj_rA0dhr2I', 'njTh_OwMljA', 'R9PTBwOzceo', 'qp8u-frRAnU', 'NobHlGUjV3g'],
      'stack': ['wjI1WNcIntg', 'F1F2imiOJfk', 'O1KeXo8lE8A', 'GYptUgnIM_I', 'JWCS5wKnZLs'],
      'dynamic programming': ['oBt53YbR9Kk', 'OQ5jsbhAv_M', 'YBSt1jYwVfU', 'nqowUJzG-iM', 'f2xi3c1S95M'],
    };

    const lowerQuery = query.toLowerCase();
    for (const [key, ids] of Object.entries(videoMappings)) {
      if (lowerQuery.includes(key)) {
        return ids[index % ids.length];
      }
    }
    
    // Default fallback
    return 'KLlXCFG5TnA';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchYouTubeVideos(searchQuery);
    }
  };

  // Animate car position based on progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition(prev => (prev + 0.1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  const progressCategories = [
    { name: 'Arrays', completed: 18, total: 25, color: '#dc0000' },
    { name: 'Strings', completed: 12, total: 20, color: '#e63946' },
    { name: 'Linked Lists', completed: 8, total: 15, color: '#f72585' },
    { name: 'Stacks', completed: 10, total: 12, color: '#b5179e' },
    { name: 'Queues', completed: 7, total: 10, color: '#7209b7' },
    { name: 'Trees', completed: 5, total: 18, color: '#560bad' },
    { name: 'Graphs', completed: 3, total: 15, color: '#3a0ca3' },
    { name: 'DP', completed: 2, total: 20, color: '#4361ee' },
    { name: 'Backtracking', completed: 4, total: 12, color: '#4895ef' },
    { name: 'Greedy', completed: 6, total: 15, color: '#4cc9f0' },
  ];

  const videos = [
    {
      id: 1,
      title: 'Arrays & Hashing - Complete Guide',
      youtubeId: 'KLlXCFG5TnA',
      duration: '45:23',
      topic: 'Arrays',
      difficulty: 'Beginner',
      views: '125K',
      channel: 'NeetCode'
    },
    {
      id: 2,
      title: 'Two Pointers Technique Explained',
      youtubeId: '-gjxg6Pln50',
      duration: '32:15',
      topic: 'Arrays',
      difficulty: 'Intermediate',
      views: '98K',
      channel: 'NeetCode'
    },
    {
      id: 3,
      title: 'Binary Search Algorithm',
      youtubeId: 'W9QJ8HaRvJQ',
      duration: '28:47',
      topic: 'Searching',
      difficulty: 'Beginner',
      views: '156K',
      channel: 'Abdul Bari'
    },
    {
      id: 4,
      title: 'Linked List Data Structure',
      youtubeId: 'Hj_rA0dhr2I',
      duration: '38:52',
      topic: 'Linked Lists',
      difficulty: 'Intermediate',
      views: '87K',
      channel: 'WilliamFiset'
    },
    {
      id: 5,
      title: 'Stack Data Structure',
      youtubeId: 'wjI1WNcIntg',
      duration: '42:18',
      topic: 'Stacks',
      difficulty: 'Intermediate',
      views: '72K',
      channel: 'mycodeschool'
    },
    {
      id: 6,
      title: 'Tree Traversals - Inorder, Preorder, Postorder',
      youtubeId: 'gm8DUJJhmY4',
      duration: '35:29',
      topic: 'Trees',
      difficulty: 'Advanced',
      views: '134K',
      channel: 'mycodeschool'
    },
    {
      id: 7,
      title: 'Graph Algorithms - BFS & DFS',
      youtubeId: 'pcKY4hjDrxk',
      duration: '52:10',
      topic: 'Graphs',
      difficulty: 'Advanced',
      views: '201K',
      channel: 'Abdul Bari'
    },
    {
      id: 8,
      title: 'Dynamic Programming Patterns',
      youtubeId: 'oBt53YbR9Kk',
      duration: '48:35',
      topic: 'DP',
      difficulty: 'Advanced',
      views: '178K',
      channel: 'freeCodeCamp'
    },
  ];

  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'solved' },
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', status: 'solved' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'attempted' },
    { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'unsolved' },
    { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', status: 'solved' },
    { id: 6, title: 'Zigzag Conversion', difficulty: 'Medium', status: 'unsolved' },
    { id: 7, title: 'Reverse Integer', difficulty: 'Medium', status: 'solved' },
    { id: 8, title: 'String to Integer (atoi)', difficulty: 'Medium', status: 'attempted' },
    { id: 9, title: 'Palindrome Number', difficulty: 'Easy', status: 'solved' },
    { id: 10, title: 'Regular Expression Matching', difficulty: 'Hard', status: 'unsolved' },
    { id: 11, title: 'Container With Most Water', difficulty: 'Medium', status: 'solved' },
    { id: 12, title: 'Integer to Roman', difficulty: 'Medium', status: 'unsolved' },
    { id: 13, title: 'Roman to Integer', difficulty: 'Easy', status: 'solved' },
    { id: 14, title: 'Longest Common Prefix', difficulty: 'Easy', status: 'solved' },
    { id: 15, title: '3Sum', difficulty: 'Medium', status: 'unsolved' },
    { id: 16, title: '3Sum Closest', difficulty: 'Medium', status: 'unsolved' },
    { id: 17, title: 'Letter Combinations', difficulty: 'Medium', status: 'solved' },
    { id: 18, title: 'Remove Nth Node', difficulty: 'Medium', status: 'attempted' },
    { id: 19, title: 'Valid Parentheses', difficulty: 'Easy', status: 'solved' },
    { id: 20, title: 'Merge Two Lists', difficulty: 'Easy', status: 'solved' },
  ];

  const totalProgress = Math.round(
    (progressCategories.reduce((acc, cat) => acc + cat.completed, 0) /
      progressCategories.reduce((acc, cat) => acc + cat.total, 0)) * 100
  );

  const totalSolved = progressCategories.reduce((acc, cat) => acc + cat.completed, 0);
  const totalProblems = progressCategories.reduce((acc, cat) => acc + cat.total, 0);

  return (
    <div className="dashboard">
      {/* Video Background */}
      <div className="video-background">
        <video 
          className="background-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="top-bar">
        {/* Left - Race Track Map */}
        <div className="track-widget" onClick={() => setShowTrackModal(true)}>
          <div className="track-container">
            <svg className="mini-track" viewBox="0 0 200 200">
              {/* Track base */}
              <path 
                d="M 40,100 L 80,100 L 100,60 L 140,60 L 160,100 L 160,140 L 120,160 L 80,140 L 60,140 L 40,100 Z" 
                fill="none" 
                stroke="#1a1a1a" 
                strokeWidth="24"
              />
              {/* Track progress */}
              <path 
                d="M 40,100 L 80,100 L 100,60 L 140,60 L 160,100 L 160,140 L 120,160 L 80,140 L 60,140 L 40,100 Z" 
                fill="none" 
                stroke="#dc0000" 
                strokeWidth="6"
                strokeDasharray="500"
                strokeDashoffset={500 - (500 * totalProgress / 100)}
                className="track-progress"
              />
              
              {/* Checkpoints */}
              <circle cx="40" cy="100" r="6" fill="#00ff00" className="checkpoint" />
              <circle cx="100" cy="60" r="6" fill={totalProgress > 33 ? "#00ff00" : "#666"} className="checkpoint" />
              <circle cx="160" cy="100" r="6" fill={totalProgress > 66 ? "#00ff00" : "#666"} className="checkpoint" />
              
              {/* F1 Car */}
              <g className="f1-car" transform={`translate(${40 + (carPosition * 1.2)}, ${100 + Math.sin(carPosition * 0.1) * 20})`}>
                <path d="M 0,-4 L 8,-4 L 10,-2 L 10,2 L 8,4 L 0,4 Z" fill="#dc0000" />
                <circle cx="2" cy="0" r="1.5" fill="#1a1a1a" />
                <circle cx="7" cy="0" r="1.5" fill="#1a1a1a" />
              </g>
            </svg>
            <div className="track-info">
              <div className="track-progress-text">{totalProgress}%</div>
              <div className="track-label">LAP PROGRESS</div>
            </div>
          </div>
        </div>

        {/* Center - Linear Progress Bar */}
        <div className="center-progress">
          <div className="linear-progress-wrapper">
            <div className="progress-stats-header">
              <span className="progress-label-left">PROGRESS</span>
              <span className="progress-percentage">{totalProgress}%</span>
              <span className="progress-label-right">{totalSolved}/{totalProblems}</span>
            </div>
            <div className="linear-progress-bar">
              <div 
                className="linear-progress-fill" 
                style={{ width: `${totalProgress}%` }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{totalSolved}</div>
              <div className="stat-title">SOLVED</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-title">STREAK</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Silver</div>
              <div className="stat-title">RANK</div>
            </div>
          </div>
        </div>

        {/* Right - Search & Profile */}
        <div className="top-right">
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="SEARCH DSA TUTORIALS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>
          <button className="profile-btn" onClick={() => setShowProfileModal(true)}>
            <div className="avatar">RC</div>
            <div className="profile-status"></div>
          </button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="nav-tabs">
        <button className="nav-tab active">
          <span className="tab-icon">▶</span>
          TOPICS
        </button>
        <button className="nav-tab">
          <span className="tab-icon">◼</span>
          PROBLEMS
        </button>
        <button className="nav-tab">
          <span className="tab-icon">⚡</span>
          FILTER
        </button>
      </div>

      {/* Main Content Area */}
      <div className="content-wrapper">
        {/* Left Sidebar - Progress Bars */}
        <aside className="sidebar-left">
          <div className="section-header">
            <h3>PROGRESS TRACKER</h3>
            <div className="header-accent"></div>
          </div>
          <div className="progress-list">
            {progressCategories.map((category, idx) => (
              <div key={idx} className="progress-item">
                <div className="progress-header">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.completed}/{category.total}</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{
                        width: `${(category.completed / category.total) * 100}%`,
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`
                      }}
                    >
                      <div className="progress-shine"></div>
                    </div>
                  </div>
                  <span className="progress-percent">
                    {Math.round((category.completed / category.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Video Grid */}
        <main className="main-center">
          <div className="section-title">
            <h2>RECOMMENDED DSA VIDEOS</h2>
            <p>Master algorithms with top YouTube tutorials</p>
          </div>

          <div className="video-grid">
            {videos.map((video) => (
              <a 
                key={video.id} 
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
              >
                <div className="video-thumb">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                    alt={video.title}
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="video-overlay">
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="duration-badge">{video.duration}</div>
                </div>
                <div className="video-details">
                  <h4>{video.title}</h4>
                  <div className="video-meta">
                    <span className="channel-name">{video.channel}</span>
                    <span className="video-views">{video.views} views</span>
                  </div>
                  <div className="video-tags">
                    <span className={`difficulty-badge ${video.difficulty.toLowerCase()}`}>
                      {video.difficulty}
                    </span>
                    <span className="topic-badge">{video.topic}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Problems */}
        <aside className="sidebar-right">
          <div className="section-header">
            <h3>PROBLEM SET</h3>
            <div className="problems-count">{problems.length}</div>
          </div>
          <div className="problems-list">
            {problems.map((problem) => (
              <div key={problem.id} className={`problem-card ${problem.status}`}>
                <div className="problem-num">{problem.id}</div>
                <div className="problem-content">
                  <div className="problem-title">{problem.title}</div>
                  <div className="problem-meta">
                    <span className={`diff-badge ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                    <div className="status-indicator">
                      <div className={`status-dot ${problem.status}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Search Results Modal */}
      {showSearchModal && (
        <div className="modal-backdrop" onClick={() => setShowSearchModal(false)}>
          <div className="modal-box search-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowSearchModal(false)}>×</button>
            
            <div className="search-modal-header">
              <h2>🔍 SEARCH RESULTS</h2>
              <p className="search-message">{searchMessage}</p>
            </div>

            {isSearching ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Searching for DSA tutorials...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="search-results-grid">
                {searchResults.map((video) => (
                  <a 
                    key={video.id} 
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card"
                  >
                    <div className="video-thumb">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="video-overlay">
                        <div className="play-button">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="duration-badge">{video.duration}</div>
                    </div>
                    <div className="video-details">
                      <h4>{video.title}</h4>
                      <div className="video-meta">
                        <span className="channel-name">{video.channel}</span>
                        <span className="video-views">{video.views} views</span>
                      </div>
                      <div className="video-tags">
                        <span className={`difficulty-badge ${video.difficulty.toLowerCase()}`}>
                          {video.difficulty}
                        </span>
                        <span className="topic-badge">{video.topic}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="focus-message">
                  <div className="focus-icon">📚</div>
                  <h3>Focus on DSA Concepts!</h3>
                  <p>Try searching for: Arrays, Trees, Graphs, Dynamic Programming, Linked Lists, Stacks, Queues, etc.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Track Modal */}
      {showTrackModal && (
        <div className="modal-backdrop" onClick={() => setShowTrackModal(false)}>
          <div className="modal-box track-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowTrackModal(false)}>×</button>
            <h2>F1 RACE TRACK PROGRESS</h2>
            <div className="full-track-container">
              <svg viewBox="0 0 1000 600" className="full-track-svg">
                <defs>
                  <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc0000" />
                    <stop offset="50%" stopColor="#ff0033" />
                    <stop offset="100%" stopColor="#dc0000" />
                  </linearGradient>
                </defs>
                
                {/* Track base (realistic F1 circuit) */}
                <path 
                  d="M 150,300 L 300,300 L 350,250 L 500,250 L 600,300 L 750,300 L 800,350 L 800,450 L 700,500 L 500,500 L 350,450 L 250,400 L 200,350 L 150,300 Z" 
                  fill="none" 
                  stroke="#0a0a0a" 
                  strokeWidth="60"
                />
                
                {/* Track progress */}
                <path 
                  d="M 150,300 L 300,300 L 350,250 L 500,250 L 600,300 L 750,300 L 800,350 L 800,450 L 700,500 L 500,500 L 350,450 L 250,400 L 200,350 L 150,300 Z" 
                  fill="none" 
                  stroke="url(#trackGradient)" 
                  strokeWidth="12"
                  strokeDasharray="2500"
                  strokeDashoffset={2500 - (2500 * totalProgress / 100)}
                  className="track-progress-full"
                />

                {/* Checkpoints */}
                {[
                  { x: 150, y: 300, name: 'START', completed: true, progress: 0 },
                  { x: 350, y: 250, name: 'ARRAYS', completed: totalProgress > 20, progress: 20 },
                  { x: 600, y: 300, name: 'STRINGS', completed: totalProgress > 40, progress: 40 },
                  { x: 800, y: 400, name: 'TREES', completed: totalProgress > 60, progress: 60 },
                  { x: 500, y: 500, name: 'GRAPHS', completed: totalProgress > 80, progress: 80 },
                  { x: 200, y: 350, name: 'FINISH', completed: totalProgress === 100, progress: 100 },
                ].map((checkpoint, idx) => (
                  <g key={idx} className="checkpoint-group">
                    <circle 
                      cx={checkpoint.x} 
                      cy={checkpoint.y} 
                      r="20" 
                      fill={checkpoint.completed ? "#00ff00" : "#333"}
                      stroke="#fff"
                      strokeWidth="3"
                      className="checkpoint-circle"
                    />
                    <text 
                      x={checkpoint.x} 
                      y={checkpoint.y + 50} 
                      textAnchor="middle" 
                      fill="#fff"
                      fontSize="16"
                      fontWeight="900"
                      className="checkpoint-label"
                    >
                      {checkpoint.name}
                    </text>
                    <text 
                      x={checkpoint.x} 
                      y={checkpoint.y + 68} 
                      textAnchor="middle" 
                      fill="rgba(255,255,255,0.6)"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {checkpoint.progress}%
                    </text>
                  </g>
                ))}

                {/* Animated F1 Car */}
                <g className="f1-car-large" transform={`translate(${150 + (totalProgress * 6.5)}, ${300 + Math.sin(totalProgress * 0.1) * 40})`}>
                  <path d="M 0,-10 L 25,-10 L 35,-5 L 35,5 L 25,10 L 0,10 Z" fill="#dc0000" stroke="#000" strokeWidth="2"/>
                  <circle cx="8" cy="0" r="4" fill="#1a1a1a" />
                  <circle cx="22" cy="0" r="4" fill="#1a1a1a" />
                  <path d="M 15,-8 L 20,-8 L 22,-5 L 20,-2 L 15,-2 Z" fill="#fff" opacity="0.3"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-backdrop" onClick={() => setShowProfileModal(false)}>
          <div className="modal-box profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowProfileModal(false)}>×</button>
            <div className="profile-content">
              <div className="avatar-large">RC</div>
              <h2>RACING CODER</h2>
              <p className="email">racer@dsarace.com</p>
              <div className="rank-badge">
                <span className="rank-icon">🏆</span>
                SILVER RACER
              </div>
              
              <div className="profile-stats-grid">
                <div className="profile-stat">
                  <div className="ps-value">{totalSolved}</div>
                  <div className="ps-label">SOLVED</div>
                </div>
                <div className="profile-stat">
                  <div className="ps-value">12</div>
                  <div className="ps-label">STREAK</div>
                </div>
                <div className="profile-stat">
                  <div className="ps-value">{totalProgress}%</div>
                  <div className="ps-label">COMPLETE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;