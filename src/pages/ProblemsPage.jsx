import React, { useState } from 'react';
import './ProblemPage.css';

const TOPICS = [
  {
    id: 'start',
    name: 'START',
    position: { top: '50%', left: '8%' },
    color: '#00e676',
    progress: 0,
    completed: true,
  },
  {
    id: 'arrays',
    name: 'Arrays',
    position: { top: '50%', left: '21%' },
    color: '#00e676',
    progress: 20,
    completed: true,
    difficulties: {
      Easy: [
        { title: 'Find Maximum and Minimum', description: 'Return the smallest and largest element in an array.' },
        { title: 'Reverse an Array', description: 'Reverse the array in-place using two pointers.' },
        { title: 'Remove Duplicates from Sorted Array', description: 'Compress a sorted array so that each element appears once.' },
        { title: 'Move Zeroes', description: 'Move all zeroes to the end while maintaining order of non-zero elements.' },
        { title: 'Rotate Array by K', description: 'Rotate the array to the right by K steps.' },
        { title: 'Second Largest Element', description: 'Find the second largest number without sorting.' },
        { title: 'Check if Array is Sorted', description: 'Determine whether the given array is non-decreasing.' },
        { title: 'Find Missing Number', description: 'Find the missing number in array containing n distinct numbers from 0 to n.' },
        { title: 'Contains Duplicate', description: 'Check if array contains any duplicate elements.' },
        { title: 'Best Time to Buy and Sell Stock', description: 'Find maximum profit from buying and selling stock once.' },
      ],
      Medium: [
        { title: 'Two Sum', description: 'Return indices of two numbers whose sum equals the target.' },
        { title: 'Subarray Sum Equals K', description: 'Count subarrays whose sum equals a given value.' },
        { title: 'Majority Element', description: 'Find the element that appears more than n/2 times.' },
        { title: 'Product of Array Except Self', description: 'Return an array where each element is product of all others.' },
        { title: '3Sum', description: 'Find all unique triplets that sum to zero.' },
        { title: 'Sort Colors (Dutch Flag)', description: 'Sort an array of 0,1,2 using constant space.' },
        { title: 'Minimum in Rotated Sorted Array', description: 'Find the minimum element in a rotated sorted array.' },
        { title: 'Container With Most Water', description: 'Find two lines that together with x-axis forms container with most water.' },
        { title: 'Group Anagrams', description: 'Group strings that are anagrams of each other together.' },
        { title: 'Longest Substring Without Repeating Characters', description: 'Find length of longest substring with all unique characters.' },
      ],
      Hard: [
        { title: 'Trapping Rain Water', description: 'Compute how much water can be trapped between bars.' },
        { title: 'Maximum Subarray Sum with One Deletion', description: 'Find max subarray sum allowing at most one deletion.' },
        { title: 'Merge K Sorted Arrays', description: 'Merge k sorted arrays into a single sorted array.' },
        { title: 'Longest Consecutive Sequence', description: 'Find length of longest consecutive sequence in O(n).' },
        { title: 'Subarray with Maximum XOR', description: 'Find the subarray that maximizes bitwise XOR.' },
        { title: 'Minimum Number of Platforms', description: 'Given arrival/departure times, find minimum platforms.' },
        { title: 'K-th Smallest Pair Distance', description: 'Return the k-th smallest absolute difference between pairs.' },
        { title: 'First Missing Positive', description: 'Find the smallest positive integer missing from unsorted array.' },
        { title: 'Median of Two Sorted Arrays', description: 'Find median of two sorted arrays in O(log(min(m,n))) time.' },
        { title: 'Sliding Window Maximum', description: 'Return maximum element in every sliding window of size k.' },
      ],
    },
  },
  {
    id: 'strings',
    name: 'Strings',
    position: { top: '42%', left: '27%' },
    color: '#ffea00',
    progress: 40,
    completed: true,
    difficulties: {
      Easy: [
        { title: 'Valid Palindrome', description: 'Check if a string is a palindrome ignoring non-alphanumerics.' },
        { title: 'Anagram Check', description: 'Determine if two strings are anagrams of each other.' },
        { title: 'First Unique Character', description: 'Return index of first non-repeating character.' },
        { title: 'Count Vowels and Consonants', description: 'Count vowels and consonants in a string.' },
        { title: 'String Compression', description: 'Compress repeated characters using counts.' },
        { title: 'Implement strstr()', description: 'Return first occurrence of a pattern in a text.' },
        { title: 'Remove Adjacent Duplicates', description: 'Remove pairs of adjacent equal characters repeatedly.' },
        { title: 'Reverse String', description: 'Reverse a string in-place using two pointers.' },
        { title: 'Valid Anagram', description: 'Check if two strings are anagrams using hash map.' },
        { title: 'Reverse Words in String', description: 'Reverse the order of words in a string.' },
      ],
      Medium: [
        { title: 'Longest Substring Without Repeat', description: 'Find the longest substring with all unique characters.' },
        { title: 'Group Anagrams', description: 'Group words that are anagrams of each other.' },
        { title: 'Longest Palindromic Substring', description: 'Return the longest palindromic substring.' },
        { title: 'Multiply Strings', description: 'Multiply two non-negative integers given as strings.' },
        { title: 'Minimum Window Substring', description: 'Find smallest window containing all characters of pattern.' },
        { title: 'Valid Parentheses', description: 'Check if brackets are balanced in an expression.' },
        { title: 'Decode String', description: 'Decode K[encoded] patterns using a stack.' },
        { title: 'Longest Common Prefix', description: 'Find longest common prefix string amongst array of strings.' },
        { title: 'String to Integer (atoi)', description: 'Convert string to integer handling edge cases and overflow.' },
        { title: 'ZigZag Conversion', description: 'Convert string to zigzag pattern on given number of rows.' },
      ],
      Hard: [
        { title: 'Regular Expression Matching', description: 'Implement regex with . and * using DP.' },
        { title: 'Wildcard Matching', description: 'Match string with pattern containing ? and *.' },
        { title: 'Shortest Palindrome', description: 'Add characters in front to make the shortest palindrome.' },
        { title: 'Palindrome Pairs', description: 'Find pairs of words that form a palindrome when concatenated.' },
        { title: 'Edit Distance', description: 'Compute minimum operations to convert one string to another.' },
        { title: 'Word Ladder', description: 'Find shortest transformation sequence between two words.' },
        { title: 'Count Distinct Substrings', description: 'Count all distinct substrings using trie or suffix array.' },
        { title: 'Scramble String', description: 'Determine if string is scrambled version of another string.' },
        { title: 'Minimum Window Subsequence', description: 'Find minimum window in S containing all characters of T in order.' },
        { title: 'Distinct Subsequences', description: 'Count distinct subsequences of S that equal T using DP.' },
      ],
    },
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    position: { top: '30%', left: '42%' },
    color: '#40c4ff',
    progress: 60,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'Delete Node', description: 'Delete a node from a singly linked list given a key.' },
        { title: 'Find Middle of List', description: 'Return middle node using slow and fast pointers.' },
        { title: 'Reverse Linked List', description: 'Reverse a singly linked list iteratively.' },
        { title: 'Detect Loop', description: 'Check whether a cycle exists in a linked list.' },
        { title: 'Merge Two Sorted Lists', description: 'Merge two sorted linked lists into one.' },
        { title: 'Nth Node from End', description: 'Return n-th node from the end of the list.' },
        { title: 'Remove Duplicates from Sorted List', description: 'Remove duplicates from a sorted linked list.' },
        { title: 'Remove Linked List Elements', description: 'Remove all nodes with given value from linked list.' },
        { title: 'Palindrome Linked List', description: 'Check if linked list is palindrome in O(n) time and O(1) space.' },
        { title: 'Delete Node in Linked List', description: 'Delete node when only node reference is given (not head).' },
      ],
      Medium: [
        { title: 'Reverse in K-Groups', description: 'Reverse nodes of list in groups of size k.' },
        { title: 'Intersection of Two Lists', description: 'Find intersection node of two linked lists.' },
        { title: 'Add Two Numbers (List)', description: 'Add numbers represented as reversed linked lists.' },
        { title: 'Reorder List', description: 'Reorder list as L0→Ln→L1→Ln-1…' },
        { title: 'Rotate List', description: 'Rotate list to the right by k positions.' },
        { title: 'Partition List', description: 'Partition list around value x preserving order.' },
        { title: 'Copy List with Random Pointer', description: 'Clone a linked list with random pointers.' },
        { title: 'Swap Nodes in Pairs', description: 'Swap every two adjacent nodes in linked list.' },
        { title: 'Odd Even Linked List', description: 'Group all odd nodes followed by even nodes.' },
        { title: 'Remove Nth Node From End', description: 'Remove n-th node from end of list in one pass.' },
      ],
      Hard: [
        { title: 'Merge K Sorted Lists', description: 'Merge k sorted linked lists using a heap.' },
        { title: 'LRU Cache', description: 'Design an LRU cache using list and hash map.' },
        { title: 'Reverse Nodes in Even Length Groups', description: 'Reverse nodes in groups with even length.' },
        { title: 'Sort List', description: 'Sort a linked list in O(n log n) time.' },
        { title: 'Flatten Multilevel List', description: 'Flatten a multilevel doubly linked list.' },
        { title: 'Plus One Linked List', description: 'Add one to a number represented as a list.' },
        { title: 'Linked List in Binary Tree', description: 'Check if list exists as a downward path in tree.' },
        { title: 'Reverse Nodes in K-Group', description: 'Reverse nodes in groups of k, reverse remaining if less than k.' },
        { title: 'Copy List with Random Pointer', description: 'Deep copy linked list with random pointers in O(1) space.' },
        { title: 'Reverse Linked List II', description: 'Reverse linked list from position m to n in one pass.' },
      ],
    },
  },
  {
    id: 'stacks-queues',
    name: 'Stacks & Queues',
    position: { top: '38%', left: '54%' },
    color: '#ff5252',
    progress: 60,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'Implement Stack Using Arrays', description: 'Design push, pop, top operations for a stack.' },
        { title: 'Implement Queue Using Two Stacks', description: 'Use two stacks to simulate a queue.' },
        { title: 'Balanced Parentheses', description: 'Use stack to validate bracket sequences.' },
        { title: 'Next Greater Element I', description: 'Find next greater element to the right for each item.' },
        { title: 'Min Stack', description: 'Design stack that supports retrieving minimum in O(1).' },
        { title: 'Evaluate Postfix Expression', description: 'Use stack to evaluate postfix notation.' },
        { title: 'Circular Tour (Gas Station)', description: 'Find starting point in circular tour using queue.' },
        { title: 'Implement Queue Using Linked List', description: 'Design queue operations using linked list structure.' },
        { title: 'Valid Parentheses String', description: 'Check if string has valid parentheses using stack.' },
        { title: 'Implement Circular Queue', description: 'Design circular queue with fixed size array.' },
      ],
      Medium: [
        { title: 'Next Greater Element II', description: 'Handle circular array with monotonic stack.' },
        { title: 'Daily Temperatures', description: 'Return days until a warmer temperature.' },
        { title: 'Largest Rectangle in Histogram', description: 'Use stack to compute largest area in histogram.' },
        { title: 'Sliding Window Maximum', description: 'Use deque to track max in each window.' },
        { title: 'Simplify Path', description: 'Canonicalize Unix-style file path using stack.' },
        { title: 'Stock Span Problem', description: 'Calculate stock span for each day.' },
        { title: 'Rotten Oranges', description: 'Use BFS queue to rot adjacent oranges over time.' },
        { title: 'Design Circular Deque', description: 'Implement circular double-ended queue with all operations.' },
        { title: 'Trapping Rain Water', description: 'Use stack to compute trapped rainwater between bars.' },
        { title: 'Basic Calculator', description: 'Evaluate basic arithmetic expression with +, -, and parentheses.' },
      ],
      Hard: [
        { title: 'Maximal Rectangle', description: 'Find largest rectangle of 1s in a binary matrix.' },
        { title: 'Expression Evaluation', description: 'Evaluate infix expression with precedence and parentheses.' },
        { title: 'Remove K Digits', description: 'Use stack to remove k digits to form smallest number.' },
        { title: 'Minimum Remove to Make Valid', description: 'Remove minimum parentheses to make string valid.' },
        { title: 'Asteroid Collision', description: 'Simulate collisions of moving asteroids using stack.' },
        { title: 'Shortest Subarray with Sum at Least K', description: 'Use deque to maintain prefix sums.' },
        { title: 'Online Stock Span (Stream)', description: 'Design class to process stock prices as stream.' },
        { title: 'Basic Calculator III', description: 'Evaluate expression with +, -, *, /, and parentheses.' },
        { title: 'Design Hit Counter', description: 'Design hit counter that counts hits in past 5 minutes.' },
        { title: 'Constrained Subsequence Sum', description: 'Find maximum sum subsequence with at most k distance constraint.' },
      ],
    },
  },
  {
    id: 'trees',
    name: 'Trees',
    position: { top: '47%', left: '67%' },
    color: '#7c4dff',
    progress: 60,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'Inorder Traversal', description: 'Perform inorder traversal of a binary tree.' },
        { title: 'Level Order Traversal', description: 'Traverse tree level by level using queue.' },
        { title: 'Height of Binary Tree', description: 'Find maximum depth of a binary tree.' },
        { title: 'Symmetric Tree', description: 'Check if tree is mirror of itself.' },
        { title: 'Identical Trees', description: 'Check if two binary trees are the same.' },
        { title: 'Left View of Tree', description: 'Return nodes visible from left side.' },
        { title: 'Count Leaf Nodes', description: 'Count leaves in a binary tree.' },
        { title: 'Preorder Traversal', description: 'Perform preorder traversal of binary tree.' },
        { title: 'Postorder Traversal', description: 'Perform postorder traversal of binary tree.' },
        { title: 'Maximum Depth of Binary Tree', description: 'Find maximum depth using recursive DFS.' },
      ],
      Medium: [
        { title: 'Right View of Tree', description: 'Return nodes visible from right side.' },
        { title: 'Zigzag Level Order', description: 'Traverse levels alternating left-right.' },
        { title: 'Lowest Common Ancestor', description: 'Find LCA of two nodes in a tree.' },
        { title: 'Diameter of Binary Tree', description: 'Find longest path between any two nodes.' },
        { title: 'Serialize and Deserialize Tree', description: 'Convert tree to string and back.' },
        { title: 'Flatten Binary Tree to List', description: 'Flatten tree to linked list in-place.' },
        { title: 'BST Iterator', description: 'Design iterator over BST with O(h) memory.' },
        { title: 'Construct Binary Tree from Preorder and Inorder', description: 'Build tree from traversal sequences.' },
        { title: 'Validate Binary Search Tree', description: 'Check if tree is valid BST with proper constraints.' },
        { title: 'Binary Tree Right Side View', description: 'Return values of nodes visible from right side.' },
      ],
      Hard: [
        { title: 'Binary Tree Maximum Path Sum', description: 'Find path with maximum sum in a tree.' },
        { title: 'Recover BST', description: 'Fix a BST where two nodes are swapped.' },
        { title: 'Vertical Order Traversal', description: 'Group nodes by vertical columns.' },
        { title: 'Count Complete Tree Nodes', description: 'Count nodes in complete tree faster than O(n).' },
        { title: 'Unique Binary Search Trees II', description: 'Generate all unique BSTs of size n.' },
        { title: 'Path Sum III', description: 'Count paths that sum to a target.' },
        { title: 'Largest BST Subtree', description: 'Find largest BST contained in a binary tree.' },
        { title: 'Serialize and Deserialize N-ary Tree', description: 'Serialize and deserialize n-ary tree structure.' },
        { title: 'Binary Tree Maximum Path Sum II', description: 'Find maximum path sum with negative values.' },
        { title: 'Binary Tree Cameras', description: 'Place minimum cameras to monitor all nodes in tree.' },
      ],
    },
  },
  {
    id: 'graphs',
    name: 'Graphs',
    position: { top: '65%', left: '81%' },
    color: '#ff9100',
    progress: 80,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'BFS Traversal', description: 'Perform breadth-first traversal on graph.' },
        { title: 'DFS Traversal', description: 'Perform depth-first traversal on graph.' },
        { title: 'Number of Provinces', description: 'Count connected components in adjacency matrix.' },
        { title: 'Path Exists or Not', description: 'Check if path exists between two nodes.' },
        { title: 'Clone Graph', description: 'Deep copy an undirected graph.' },
        { title: 'Detect Cycle (Undirected)', description: 'Detect cycle in undirected graph using DFS/BFS.' },
        { title: 'Topological Sort (DFS)', description: 'Return topo order for DAG using DFS.' },
        { title: 'Find Town Judge', description: 'Find person trusted by everyone else in directed graph.' },
        { title: 'Find Center of Star Graph', description: 'Find center node in star graph structure.' },
        { title: 'Keys and Rooms', description: 'Check if all rooms can be visited using DFS.' },
      ],
      Medium: [
        { title: 'Course Schedule', description: 'Detect cycles and find valid order of courses.' },
        { title: 'Number of Islands', description: 'Count islands in a grid using DFS/BFS.' },
        { title: 'Rotting Oranges (Grid BFS)', description: 'Multi-source BFS on grid to rot all oranges.' },
        { title: 'Shortest Path in Unweighted Graph', description: 'Use BFS to find shortest path length.' },
        { title: 'Word Ladder II', description: 'Find all shortest transformation sequences.' },
        { title: 'Detect Cycle (Directed)', description: 'Detect cycle in directed graph using recursion stack.' },
        { title: "Kahn's Algorithm", description: 'Topological sort using BFS and indegrees.' },
        { title: 'Pacific Atlantic Water Flow', description: 'Find cells that can flow to both oceans using DFS.' },
        { title: 'Surrounded Regions', description: 'Capture regions surrounded by X using DFS/BFS.' },
        { title: 'Redundant Connection', description: 'Find redundant edge that creates cycle in tree.' },
      ],
      Hard: [
        { title: "Dijkstra's Algorithm", description: 'Shortest paths from source in weighted graph.' },
        { title: 'Bellman–Ford Algorithm', description: 'Handle negative weights and detect cycles.' },
        { title: 'Minimum Spanning Tree', description: 'Implement Kruskal and Prim algorithms.' },
        { title: 'Strongly Connected Components', description: 'Use Kosaraju or Tarjan algorithm.' },
        { title: 'Network Delay Time', description: 'Find time for signal to reach all nodes.' },
        { title: 'Cheapest Flight Within K Stops', description: 'Use modified BFS/Dijkstra to limit stops.' },
        { title: 'Alien Dictionary', description: 'Derive character order from sorted alien words.' },
        { title: 'Critical Connections', description: 'Find bridges in graph using Tarjan algorithm.' },
        { title: 'Word Ladder', description: 'Find shortest transformation sequence between two words.' },
        { title: 'Reconstruct Itinerary', description: 'Reconstruct itinerary from tickets using DFS.' },
      ],
    },
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    position: { top: '78%', left: '67%' },
    color: '#00bcd4',
    progress: 80,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'Climbing Stairs', description: 'Count ways to climb n stairs taking 1 or 2 steps.' },
        { title: 'Fibonacci Number', description: 'Compute n-th Fibonacci using DP.' },
        { title: 'House Robber I', description: 'Max money without robbing adjacent houses.' },
        { title: 'Maximum Subarray (Kadane)', description: 'Find contiguous subarray with maximum sum.' },
        { title: 'Min Cost Climbing Stairs', description: 'Find minimum cost to reach top of stairs.' },
        { title: 'Count Bits', description: 'For each i, count number of set bits in i.' },
        { title: 'Unique Paths', description: 'Count grid paths from start to finish moving right/down.' },
        { title: "Pascal's Triangle", description: 'Generate Pascal triangle up to n rows.' },
        { title: 'Best Time to Buy and Sell Stock', description: 'Find maximum profit from single buy and sell.' },
        { title: 'House Robber', description: 'Maximize money robbed without robbing two adjacent houses.' },
      ],
      Medium: [
        { title: 'Coin Change', description: 'Minimum coins needed to make a given amount.' },
        { title: 'Longest Increasing Subsequence', description: 'Find LIS length in O(n log n).' },
        { title: 'Partition Equal Subset Sum', description: 'Check if array can be partitioned into two equal subsets.' },
        { title: '0/1 Knapsack', description: 'Classic knapsack with weight and value constraints.' },
        { title: 'Edit Distance', description: 'Minimum operations to convert word1 to word2.' },
        { title: 'Word Break', description: 'Check if string can be segmented into dictionary words.' },
        { title: 'Palindromic Substrings', description: 'Count palindromic substrings in a string.' },
        { title: 'Longest Common Subsequence', description: 'Find length of longest common subsequence of two strings.' },
        { title: 'Decode Ways', description: 'Count ways to decode string of digits to letters.' },
        { title: 'Coin Change 2', description: 'Count number of combinations that make up amount.' },
      ],
      Hard: [
        { title: 'Egg Dropping Puzzle', description: 'Minimum trials needed to find critical floor.' },
        { title: 'Burst Balloons', description: 'Maximize coins by choosing balloon bursting order.' },
        { title: 'Maximum Profit in Job Scheduling', description: 'Schedule non-overlapping jobs for max profit.' },
        { title: 'Longest Increasing Path in Matrix', description: 'Find longest increasing path in grid.' },
        { title: 'Boolean Parenthesization', description: 'Count ways to parenthesize Boolean expression.' },
        { title: 'Palindrome Partitioning II', description: 'Min cuts so every substring is palindrome.' },
        { title: 'Optimal BST', description: 'Build BST with minimal expected search cost.' },
        { title: 'Regular Expression Matching', description: 'Match string with pattern containing . and * using DP.' },
        { title: 'Wildcard Matching', description: 'Match string with pattern containing ? and * wildcards.' },
        { title: 'Distinct Subsequences', description: 'Count distinct subsequences of S that equal T.' },
      ],
    },
  },
  {
    id: 'finish',
    name: 'FINISH',
    position: { top: '78%', left: '12%' },
    color: '#666666',
    progress: 100,
    completed: false,
  },
  {
    id: 'misc',
    name: 'Greedy, Heaps & More',
    position: { top: '67%', left: '52%' },
    color: '#ff4081',
    progress: 80,
    completed: false,
    difficulties: {
      Easy: [
        { title: 'Meeting Rooms I', description: 'Check if a person can attend all meetings.' },
        { title: 'Assign Cookies', description: 'Maximize content children using greedy.' },
        { title: 'K Closest Points', description: 'Use heap to find k closest points to origin.' },
        { title: 'Top K Frequent Elements', description: 'Return k most frequent numbers using heap.' },
        { title: 'Binary Search Basic', description: 'Implement iterative binary search.' },
        { title: 'Square Root (Binary Search)', description: 'Compute integer square root of a number.' },
        { title: 'Two Pointers Pair Sum', description: 'Find pair with given sum in sorted array.' },
        { title: 'Valid Mountain Array', description: 'Check if array forms valid mountain using two pointers.' },
        { title: 'Merge Sorted Arrays', description: 'Merge two sorted arrays in-place using two pointers.' },
        { title: 'Remove Element', description: 'Remove all instances of value using two pointers.' },
      ],
      Medium: [
        { title: 'Activity Selection', description: 'Select maximum non-overlapping activities.' },
        { title: 'Meeting Rooms II', description: 'Minimum number of meeting rooms needed.' },
        { title: 'Task Scheduler', description: 'Least intervals to finish tasks with cooling period.' },
        { title: 'IPO (Capital Maximization)', description: 'Use heap to pick most profitable projects.' },
        { title: 'Gas Station', description: 'Return starting station index to complete circuit.' },
        { title: 'Find Median from Data Stream', description: 'Use two heaps to track running median.' },
        { title: 'Sliding Window Average', description: 'Compute moving average of stream elements.' },
        { title: 'Kth Largest Element', description: 'Find kth largest element using quickselect or heap.' },
        { title: 'Merge K Sorted Lists', description: 'Merge k sorted linked lists using min heap.' },
        { title: 'Search in Rotated Sorted Array', description: 'Search target in rotated sorted array using binary search.' },
      ],
      Hard: [
        { title: 'Minimum Number of Arrows', description: 'Shoot minimum arrows to burst balloons.' },
        { title: 'Reorganize String', description: 'Rearrange so no two adjacent chars are equal.' },
        { title: 'Trapping Rain Water II', description: 'Use priority queue for 2D trapping water.' },
        { title: 'Skyline Problem', description: 'Use sweep line and heap to draw skyline.' },
        { title: 'Minimum Spanning Tree (Kruskal)', description: 'Use DSU and sorting to form MST.' },
        { title: 'Job Sequencing with Deadlines', description: 'Maximize profit by scheduling jobs greedily.' },
        { title: 'Median of Two Sorted Arrays', description: 'Use binary search on partitions.' },
        { title: 'Find K Pairs with Smallest Sums', description: 'Find k pairs with smallest sums using heap.' },
        { title: 'Kth Smallest Element in Sorted Matrix', description: 'Find kth smallest using binary search on answer.' },
        { title: 'Swim in Rising Water', description: 'Find minimum time to reach bottom-right using Dijkstra.' },
      ],
    },
  },
];

const ProblemsPage = () => {
  const [selectedTopicId, setSelectedTopicId] = useState('arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');

  // Filter out start/finish nodes for problems display
  const problemTopics = TOPICS.filter(t => t.difficulties);
  const selectedTopic = problemTopics.find((t) => t.id === selectedTopicId) || problemTopics[0];
  const problemsForDifficulty = selectedTopic?.difficulties?.[selectedDifficulty] || [];

  return (
    <div className="problems-page">
      <div className="problems-header">
        <h1>F1 RACE TRACK PROGRESS</h1>
      </div>

      <div className="track-layout">
        <section className="track-left">
          <div className="track-wrapper">
            {/* SVG Track Path - Realistic F1 Circuit */}
            <svg className="track-svg" viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc0000" stopOpacity="1" />
                  <stop offset="20%" stopColor="#dc0000" stopOpacity="1" />
                  <stop offset="20%" stopColor="#444444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#444444" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <pattern id="checkered" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#ffffff" opacity="0.1"/>
                  <rect x="10" y="10" width="10" height="10" fill="#ffffff" opacity="0.1"/>
                </pattern>
              </defs>
              
              {/* Main Track Path - Realistic F1 Circuit Design */}
              <path
                d="M 100 300 
                   L 250 300 
                   Q 300 300 320 250 
                   Q 340 200 380 180 
                   L 500 180 
                   Q 550 180 580 200 
                   Q 610 220 650 250 
                   L 750 250 
                   Q 800 250 850 280 
                   Q 900 310 950 350 
                   Q 1000 390 980 430 
                   Q 960 470 920 480 
                   L 800 480 
                   Q 750 480 700 450 
                   Q 650 420 600 400 
                   L 450 400 
                   Q 400 400 350 420 
                   Q 300 440 250 460 
                   Q 200 480 150 470 
                   Q 100 460 80 420 
                   Q 60 380 70 340 
                   Q 80 300 100 300 Z"
                fill="none"
                stroke="url(#trackGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                className="track-path"
              />
              
              {/* Inner track (dark grey center) */}
              <path
                d="M 100 300 
                   L 250 300 
                   Q 300 300 320 250 
                   Q 340 200 380 180 
                   L 500 180 
                   Q 550 180 580 200 
                   Q 610 220 650 250 
                   L 750 250 
                   Q 800 250 850 280 
                   Q 900 310 950 350 
                   Q 1000 390 980 430 
                   Q 960 470 920 480 
                   L 800 480 
                   Q 750 480 700 450 
                   Q 650 420 600 400 
                   L 450 400 
                   Q 400 400 350 420 
                   Q 300 440 250 460 
                   Q 200 480 150 470 
                   Q 100 460 80 420 
                   Q 60 380 70 340 
                   Q 80 300 100 300 Z"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="track-inner"
              />
              
              {/* Start/Finish Line - Checkered Pattern */}
              <rect x="95" y="290" width="15" height="20" fill="url(#checkered)" opacity="0.8"/>
              <line x1="100" y1="290" x2="100" y2="310" stroke="#ffffff" strokeWidth="2" opacity="0.9"/>
              
              {/* Track Markings - Corner Numbers */}
              <circle cx="320" cy="250" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="580" cy="200" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="850" cy="280" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="980" cy="430" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="700" cy="450" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="350" cy="420" r="3" fill="#dc0000" opacity="0.6"/>
              <circle cx="150" cy="470" r="3" fill="#dc0000" opacity="0.6"/>
            </svg>

            {TOPICS.map((topic) => {
              if (topic.id === 'start' || topic.id === 'finish') {
                return (
                  <button
                    key={topic.id}
                    className={`track-node ${topic.completed ? 'completed' : 'incomplete'} ${selectedTopicId === topic.id ? 'active' : ''}`}
                    style={{
                      top: topic.position.top,
                      left: topic.position.left,
                    }}
                    onClick={() => {
                      if (topic.id !== 'start' && topic.id !== 'finish') {
                        setSelectedTopicId(topic.id);
                        setSelectedDifficulty('Easy');
                      }
                    }}
                  >
                    <div className="node-circle" />
                    <div className="node-label">{topic.name}</div>
                    <div className="node-progress">{topic.progress}%</div>
                  </button>
                );
              }
              return (
                <button
                  key={topic.id}
                  className={`track-node ${topic.completed ? 'completed' : 'incomplete'} ${selectedTopicId === topic.id ? 'active' : ''}`}
                  style={{
                    top: topic.position.top,
                    left: topic.position.left,
                    '--node-color': topic.color,
                  }}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setSelectedDifficulty('Easy');
                  }}
                >
                  <div className="node-circle" />
                  <div className="node-label">{topic.name}</div>
                  <div className="node-progress">{topic.progress}%</div>
                </button>
              );
            })}
          </div>
          <p className="track-legend">
            Each colored checkpoint on the track is a DSA topic. Click a topic to see its{" "}
            <span className="legend-highlight">Easy / Medium / Hard</span> laps and start
            racing through the problems.
          </p>
        </section>

        <section className="track-right">
          <header className="topic-header">
            <span className="topic-chip" style={{ borderColor: selectedTopic.color }}>
              {selectedTopic.name}
            </span>

            <div className="difficulty-toggle">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  className={`difficulty-btn ${
                    selectedDifficulty === level ? level.toLowerCase() + ' active' : ''
                  }`}
                  onClick={() => setSelectedDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </header>

          <div className="problems-grid">
            {problemsForDifficulty.map((problem, index) => (
              <article key={index} className="race-card">
                <div className="race-card-header">
                  <span className="race-lap">Lap {index + 1}</span>
                  <span className={`diff-pill ${selectedDifficulty.toLowerCase()}`}>
                    {selectedDifficulty}
                  </span>
                </div>
                <h3 className="race-title">{problem.title}</h3>
                <p className="race-description">{problem.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProblemsPage;