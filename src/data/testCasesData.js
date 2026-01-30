// Test cases for all DSA problems organized by topic and difficulty

export const TEST_CASES = {
  arrays: {
    Easy: {
      'Find Maximum and Minimum': [
        { input: '5\n3 2 8 1 9', expectedOutput: 'Min: 1, Max: 9' },
        { input: '3\n-5 10 0', expectedOutput: 'Min: -5, Max: 10' },],
      'Reverse an Array': [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\na b c', expectedOutput: 'c b a' },],
      'Remove Duplicates from Sorted Array': [
        { input: '7\n1 1 2 2 2 3 4', expectedOutput: '1 2 3 4' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },],
      'Move Zeroes': [
        { input: '6\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
        { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4' },],
      'Rotate Array by K': [
        { input: '5 2\n1 2 3 4 5', expectedOutput: '4 5 1 2 3' },
        { input: '4 1\na b c d', expectedOutput: 'd a b c' },],
      'Second Largest Element': [
        { input: '5\n10 5 20 15 3', expectedOutput: '15' },
        { input: '3\n1 2 3', expectedOutput: '2' },],
      'Check if Array is Sorted': [
        { input: '5\n1 2 3 4 5', expectedOutput: 'true' },
        { input: '5\n1 3 2 4 5', expectedOutput: 'false' },],
      'Find Missing Number': [
        { input: '3\n0 1 3', expectedOutput: '2' },
        { input: '2\n0 2', expectedOutput: '1' },],
      'Contains Duplicate': [
        { input: '5\n1 2 3 1 4', expectedOutput: 'true' },
        { input: '4\n1 2 3 4', expectedOutput: 'false' },],
      'Best Time to Buy and Sell Stock': [
        { input: '5\n7 1 5 3 6 4', expectedOutput: '5' },
        { input: '5\n7 6 4 3 1', expectedOutput: '0' },],
    },
    Medium: {
      'Two Sum': [
        { input: '4 9\n2 7 11 15', expectedOutput: '0 1' },
        { input: '3 6\n3 2 4', expectedOutput: '0 2' },],
      'Subarray Sum Equals K': [
        { input: '4 1\n1 1 1 1', expectedOutput: '4' },
        { input: '5 0\n1 -1 1 -1 1', expectedOutput: '6' },],
      'Majority Element': [
        { input: '3\n3 2 3', expectedOutput: '3' },
        { input: '2\n2 2', expectedOutput: '2' },],
      'Product of Array Except Self': [
        { input: '4\n1 2 3 4', expectedOutput: '24 12 8 6' },
        { input: '2\n2 3', expectedOutput: '3 2' },],
      '3Sum': [
        { input: '6\n-1 0 1 2 -1 -4', expectedOutput: '-1 -1 2\n-1 0 1' },
        { input: '3\n0 0 0', expectedOutput: '0 0 0' },],
      'Sort Colors (Dutch Flag)': [
        { input: '6\n2 0 2 1 1 0', expectedOutput: '0 0 1 1 2 2' },
        { input: '3\n2 0 1', expectedOutput: '0 1 2' },],
      'Minimum in Rotated Sorted Array': [
        { input: '5\n3 4 5 1 2', expectedOutput: '1' },
        { input: '3\n4 5 6', expectedOutput: '4' },],
      'Container With Most Water': [
        { input: '9\n1 8 6 2 5 4 8 3 7', expectedOutput: '49' },
        { input: '2\n1 1', expectedOutput: '1' },],
      'Group Anagrams': [
        { input: 'bat tab eat\n', expectedOutput: 'bat tab\neat' },
        { input: 'a\n', expectedOutput: 'a' },],
      'Longest Substring Without Repeating Characters': [
        { input: 'abcabcbb', expectedOutput: '3' },
        { input: 'bbbbb', expectedOutput: '1' },],
    },
    Hard: {
      'Trapping Rain Water': [
        { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6' },
        { input: '4\n4 2 0 3', expectedOutput: '4' },],
      'Maximum Subarray Sum with One Deletion': [
        { input: '5\n1 -2 5 -1 -2', expectedOutput: '5' },
        { input: '6\n5 -3 5 1 1 -2', expectedOutput: '9' },],
      'Merge K Sorted Arrays': [
        { input: '3\n1 4 5\n1 3 4\n2 6', expectedOutput: '1 1 2 3 4 4 5 6' },
        { input: '2\n1 2\n3 4', expectedOutput: '1 2 3 4' },],
      'Longest Consecutive Sequence': [
        { input: '9\n100 4 200 1 3 2', expectedOutput: '4' },
        { input: '6\n9 1 4 7 3 2', expectedOutput: '4' },],
      'Subarray with Maximum XOR': [
        { input: '5\n8 10 2 6 3', expectedOutput: '12' },
        { input: '3\n1 2 3', expectedOutput: '3' },],
      'Minimum Number of Platforms': [
        { input: '3\n900 940 950\n1130 1200 1130', expectedOutput: '2' },
        { input: '2\n900 1100\n1000 1200', expectedOutput: '1' },],
      'K-th Smallest Pair Distance': [
        { input: '4 2\n1 3 1 6', expectedOutput: '5' },
        { input: '3 1\n1 1 1', expectedOutput: '0' },],
      'First Missing Positive': [
        { input: '3\n1 2 0', expectedOutput: '3' },
        { input: '3\n3 4 -1 1', expectedOutput: '2' },],
      'Median of Two Sorted Arrays': [
        { input: '2 2\n1 3\n2', expectedOutput: '2.0' },
        { input: '2 2\n1 2\n3 4', expectedOutput: '2.5' },],
      'Sliding Window Maximum': [
        { input: '9 3\n1 3 1 2 0 5 5 0 7', expectedOutput: '3 3 2 5 5 5 7' },
        { input: '10 3\n1 -1 1 2 2 2 3 3 -1 1', expectedOutput: '1 2 2 2 3 3 3' },],
    },
  },
  strings: {
    Easy: {
      'Valid Palindrome': [
        { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true' },
        { input: 'race a car', expectedOutput: 'false' },],
      'Anagram Check': [
        { input: 'listen\nsilent', expectedOutput: 'true' },
        { input: 'hello\nworld', expectedOutput: 'false' },],
      'First Unique Character': [
        { input: 'leetcode', expectedOutput: '0' },
        { input: 'loveleetcode', expectedOutput: '2' },],
      'Count Vowels and Consonants': [
        { input: 'hello world', expectedOutput: 'Vowels: 3, Consonants: 7' },
        { input: 'aeiou', expectedOutput: 'Vowels: 5, Consonants: 0' },],
      'String Compression': [
        { input: 'aaabbbccc', expectedOutput: 'a3b3c3' },
        { input: 'abc', expectedOutput: 'abc' },],
      'Implement strstr()': [
        { input: 'hello\nll', expectedOutput: '2' },
        { input: 'aaaa\nbaa', expectedOutput: '-1' },],
      'Remove Adjacent Duplicates': [
        { input: 'abbaca', expectedOutput: 'ca' },
        { input: 'a', expectedOutput: 'a' },],
      'Reverse String': [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'a', expectedOutput: 'a' },],
      'Valid Anagram': [
        { input: 'anagram\nnagaram', expectedOutput: 'true' },
        { input: 'rat\ncar', expectedOutput: 'false' },],
      'Reverse Words in String': [
        { input: 'the sky is blue', expectedOutput: 'blue is sky the' },
        { input: 'hello world', expectedOutput: 'world hello' },],
    },
    Medium: {
      'Longest Substring Without Repeat': [
        { input: 'abcabcbb', expectedOutput: '3' },
        { input: 'bbbbb', expectedOutput: '1' },],
      'Group Anagrams': [
        { input: 'eat\ntea\nate\nnat\nban', expectedOutput: 'eat tea ate\nnat\nban' },
        { input: 'a', expectedOutput: 'a' },],
      'Longest Palindromic Substring': [
        { input: 'babad', expectedOutput: 'bab' },
        { input: 'cbbd', expectedOutput: 'bb' },],
      'Multiply Strings': [
        { input: '123\n456', expectedOutput: '56088' },
        { input: '0\n123', expectedOutput: '0' },],
      'Minimum Window Substring': [
        { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC' },
        { input: 'a\na', expectedOutput: 'a' },],
      'Valid Parentheses': [
        { input: '()', expectedOutput: 'true' },
        { input: '()[]{}\n', expectedOutput: 'true' },
        { input: '(]', expectedOutput: 'false' },],
      'Decode String': [
        { input: '3[a]2[bc]', expectedOutput: 'aaabcbc' },
        { input: '3[a2[c]]', expectedOutput: 'accaccacc' },],
      'Longest Common Prefix': [
        { input: 'flower\nflow\nflight', expectedOutput: 'fl' },
        { input: 'dog\nracecar\ncar', expectedOutput: '' },],
      'String to Integer (atoi)': [
        { input: '42', expectedOutput: '42' },
        { input: '-42', expectedOutput: '-42' },],
      'ZigZag Conversion': [
        { input: 'PAYPALISHIRING 3', expectedOutput: 'PAHNAPLSIIGYIR' },
        { input: 'AB 1', expectedOutput: 'AB' },],
    },
    Hard: {
      'Regular Expression Matching': [
        { input: 'aa\na', expectedOutput: 'false' },
        { input: 'aa\na*', expectedOutput: 'true' },],
      'Wildcard Matching': [
        { input: 'aa\na', expectedOutput: 'false' },
        { input: 'aa\n*', expectedOutput: 'true' },],
      'Shortest Palindrome': [
        { input: 'abcd', expectedOutput: 'dcbabcd' },
        { input: 'a', expectedOutput: 'a' },],
      'Palindrome Pairs': [
        { input: 'bat\ntab\ncat', expectedOutput: '[0,1]\n[1,0]' },
        { input: 'a\naa\naaa', expectedOutput: '[0,1]\n[1,2]' },],
      'Edit Distance': [
        { input: 'horse\nros', expectedOutput: '3' },
        { input: 'intention\nexecution', expectedOutput: '5' },],
      'Word Ladder': [
        { input: 'hit\ncog\n4\nhot dot dog lot log cog', expectedOutput: '5' },
        { input: 'hit\ncog\n4\nhot dot dog lot log', expectedOutput: '0' },],
      'Count Distinct Substrings': [
        { input: 'ababa', expectedOutput: '10' },
        { input: 'aaa', expectedOutput: '6' },],
      'Scramble String': [
        { input: 'great\nrgeat', expectedOutput: 'true' },
        { input: 'abcde\ncaebd', expectedOutput: 'false' },],
      'Longest Substring with At Most K Distinct Characters': [
        { input: 'eceba\n2', expectedOutput: '3' },
        { input: 'aa\n1', expectedOutput: '2' },],
      'Distinct Subsequences': [
        { input: 'rabbbit\nrabbit', expectedOutput: '3' },
        { input: 'babgbag\nbag', expectedOutput: '5' },],
    },
  },
  trees: {
    Easy: {
      'Inorder Traversal': [
        { input: '[1,null,2]', expectedOutput: '1 2' },
        { input: '[1,2,3]', expectedOutput: '2 1 3' },],
      'Level Order Traversal': [
        { input: '[3,9,20,null,null,15,7]', expectedOutput: '3\n9 20\n15 7' },
        { input: '[1]', expectedOutput: '1' },],
      'Height of Binary Tree': [
        { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
        { input: '[1]', expectedOutput: '1' },],
      'Symmetric Tree': [
        { input: '[1,2,2,3,4,4,3]', expectedOutput: 'true' },
        { input: '[1,2,2,null,3,null,3]', expectedOutput: 'false' },],
      'Identical Trees': [
        { input: '[1,2,3]\n[1,2,3]', expectedOutput: 'true' },
        { input: '[1,2]\n[1,null,2]', expectedOutput: 'false' },],
      'Left View of Tree': [
        { input: '[1,2,3,null,5,null,4]', expectedOutput: '1 2 5' },
        { input: '[1]', expectedOutput: '1' },],
      'Count Leaf Nodes': [
        { input: '[1,2,3]', expectedOutput: '2' },
        { input: '[1,2,null]', expectedOutput: '1' },],
      'Preorder Traversal': [
        { input: '[1,null,2]', expectedOutput: '1 2' },
        { input: '[1,2,3]', expectedOutput: '1 2 3' },],
      'Postorder Traversal': [
        { input: '[1,null,2]', expectedOutput: '2 1' },
        { input: '[1,2,3]', expectedOutput: '2 3 1' },],
      'Maximum Depth of Binary Tree': [
        { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
        { input: '[1]', expectedOutput: '1' },],
    },
    Medium: {
      'Right View of Tree': [
        { input: '[1,2,3,null,5,null,4]', expectedOutput: '1 3 4' },
        { input: '[1]', expectedOutput: '1' },],
      'Zigzag Level Order': [
        { input: '[3,9,20,null,null,15,7]', expectedOutput: '3\n20 9\n15 7' },
        { input: '[1]', expectedOutput: '1' },],
      'Lowest Common Ancestor': [
        { input: '[6,2,8,0,4,7,9,null,null,3,5] 2 8', expectedOutput: '6' },
        { input: '[6,2,8,0,4,7,9,null,null,3,5] 2 4', expectedOutput: '2' },],
      'Diameter of Binary Tree': [
        { input: '[1,2,3,4,5]', expectedOutput: '3' },
        { input: '[1,2]', expectedOutput: '2' },],
      'Serialize and Deserialize Tree': [
        { input: '[1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' },
        { input: '[]', expectedOutput: '[]' },],
      'Flatten Binary Tree to List': [
        { input: '[1,2,5,3,4,null,6]', expectedOutput: '[1,null,2,null,3,null,4,null,5,null,6]' },
        { input: '[]', expectedOutput: '[]' },],
      'BST Iterator': [
        { input: '[7,3,15,null,null,9,20]', expectedOutput: 'next() returns 3 7 9 15 20' },
        { input: '[1]', expectedOutput: 'next() returns 1' },],
      'Construct Binary Tree from Preorder and Inorder': [
        { input: '[3,9,20,15,7]\n[9,3,15,20,7]', expectedOutput: '[3,9,20,null,null,15,7]' },
        { input: '[1]\n[1]', expectedOutput: '[1]' },],
      'Validate Binary Search Tree': [
        { input: '[2,1,3]', expectedOutput: 'true' },
        { input: '[5,1,4,null,null,3,6]', expectedOutput: 'false' },],
      'Binary Tree Right Side View': [
        { input: '[1,2,3,null,5,null,4]', expectedOutput: '1 3 4' },
        { input: '[1,null,3]', expectedOutput: '1 3' },],
    },
    Hard: {
      'Binary Tree Maximum Path Sum': [
        { input: '[1,2,3]', expectedOutput: '6' },
        { input: '[-10,9,20,null,null,15,7]', expectedOutput: '42' },],
      'Recover BST': [
        { input: '[1,3,null,null,2]', expectedOutput: '[3,1,null,null,2]' },
        { input: '[3,1,4,null,null,2]', expectedOutput: '[2,1,4,null,null,3]' },],
      'Vertical Order Traversal': [
        { input: '[3,9,20,null,null,15,7]', expectedOutput: '[9]\n[3,15]\n[20]\n[7]' },
        { input: '[1,2,3,4,6,5,7]', expectedOutput: '[4]\n[2]\n[1,5,6]\n[3]\n[7]' },],
      'Count Complete Tree Nodes': [
        { input: '[1,2,3,4,5,6]', expectedOutput: '6' },
        { input: '[]', expectedOutput: '0' },],
      'Unique Binary Search Trees II': [
        { input: '3', expectedOutput: '5 trees' },
        { input: '1', expectedOutput: '1 tree' },],
      'Path Sum III': [
        { input: '[10,5,-3,3,2,null,11,3,-2,null,1] 8', expectedOutput: '3' },
        { input: '[5,4,8,11,null,13,4,7,2,null,null,5,1] 22', expectedOutput: '3' },],
      'Largest BST Subtree': [
        { input: '[10,5,15,1,8,null,7]', expectedOutput: '3' },
        { input: '[1,4,null,2,4]', expectedOutput: '1' },],
      'Serialize and Deserialize N-ary Tree': [
        { input: '[1,[3,[5,6],2,4]]', expectedOutput: '[1,[3,[5,6],2,4]]' },
        { input: '[]', expectedOutput: '[]' },],
      'Binary Tree Maximum Path Sum II': [
        { input: '[1,2,3]', expectedOutput: '6' },
        { input: '[-10,9,20,null,null,15,7]', expectedOutput: '42' },],
      'Binary Tree Cameras': [
        { input: '[0,0,null,0,0]', expectedOutput: '1' },
        { input: '[0,0,null,0,null,0,null,null,0]', expectedOutput: '2' },],
    },
  },
  graphs: {
    Easy: {
      'BFS Traversal': [
        { input: '4\n[[1,2],[1,3],[2],[3]]', expectedOutput: '0 1 2 3' },
        { input: '2\n[[1],[0]]', expectedOutput: '0 1' },],
      'DFS Traversal': [
        { input: '4\n[[1,2],[1,3],[2],[3]]', expectedOutput: '0 1 3 2' },
        { input: '2\n[[1],[0]]', expectedOutput: '0 1' },],
      'Number of Provinces': [
        { input: '3\n[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' },
        { input: '3\n[[1,0,1],[0,1,0],[1,0,1]]', expectedOutput: '1' },],
      'Path Exists or Not': [
        { input: '4 4\n[[0,1],[1,2],[1,3],[2,3]] 0 3', expectedOutput: 'true' },
        { input: '3 2\n[[0,1],[1,2]] 0 2', expectedOutput: 'true' },],
      'Clone Graph': [
        { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' },
        { input: '[[]]', expectedOutput: '[[]]' },],
      'Detect Cycle (Undirected)': [
        { input: '5\n[[1,2],[1,3],[2,4]]', expectedOutput: 'false' },
        { input: '5\n[[1,2],[1,3],[2,3]]', expectedOutput: 'true' },],
      'Topological Sort (DFS)': [
        { input: '4\n[[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '0 1 2 3' },
        { input: '2\n[[1,0]]', expectedOutput: '0 1' },],
      'Find Town Judge': [
        { input: '4\n[[1,3],[1,4],[2,3],[2,4],[4,3]]', expectedOutput: '3' },
        { input: '3\n[[1,3],[2,3],[3,1]]', expectedOutput: '-1' },],
      'Find Center of Star Graph': [
        { input: '3\n[[1,2],[2,3]]', expectedOutput: '2' },
        { input: '4\n[[1,2],[1,3],[1,4]]', expectedOutput: '1' },],
      'Keys and Rooms': [
        { input: '4\n[[1],[2],[3],[]]', expectedOutput: 'true' },
        { input: '3\n[[1,3],[3,0,1],[2],[0]]', expectedOutput: 'false' },],
    },
    Medium: {
      'Course Schedule': [
        { input: '2\n[[1,0]]', expectedOutput: 'true' },
        { input: '2\n[[1,0],[0,1]]', expectedOutput: 'false' },],
      'Number of Islands': [
        { input: '3 3\n11110\n11010\n11000\n00000', expectedOutput: '1' },
        { input: '3 3\n11000\n11000\n00100\n00011', expectedOutput: '3' },],
      'Rotting Oranges (Grid BFS)': [
        { input: '3\n[[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' },
        { input: '3\n[[2,1,1],[0,1,1],[1,0,1]]', expectedOutput: '-1' },],
      'Shortest Path in Unweighted Graph': [
        { input: '4 4\n[[0,1],[1,2],[2,3]] 0 3', expectedOutput: '3' },
        { input: '3 2\n[[0,1],[1,2]] 0 2', expectedOutput: '2' },],
      'Word Ladder II': [
        { input: 'hit\ncog\n[[hot,dot,dog,lot,log,cog],[hot,lot,log,cog]]', expectedOutput: '2' },
        { input: 'hit\ncog\n[[hit,hot,dot,dog,lot,log]]', expectedOutput: '1' },],
      'Detect Cycle (Directed)': [
        { input: '2\n[[1,0]]', expectedOutput: 'false' },
        { input: '2\n[[1,0],[0,1]]', expectedOutput: 'true' },],
      "Kahn's Algorithm": [
        { input: '4\n[[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '0 1 2 3' },
        { input: '2\n[[1,0]]', expectedOutput: '0 1' },],
      'Pacific Atlantic Water Flow': [
        { input: '3 3\n[[4,3,2,1],[3,2,1,0],[0,1,2,3]]', expectedOutput: '0 3' },
        { input: '1 1\n[[1]]', expectedOutput: '0 0' },],
      'Surrounded Regions': [
        { input: '3 3\nXXX\nXOX\nXXX', expectedOutput: 'XOX\nXOX\nXXX' },
        { input: '2 2\nXX\nXX', expectedOutput: 'XX\nXX' },],
      'Redundant Connection': [
        { input: '3\n[[1,2],[2,3],[1,3]]', expectedOutput: '[1,3]' },
        { input: '4\n[[1,2],[2,3],[3,4],[1,4]]', expectedOutput: '[1,4]' },],
    },
    Hard: {
      "Dijkstra's Algorithm": [
        { input: '6 9 0\n0 1 4\n0 2 2\n1 2 1\n1 3 5\n2 3 8\n2 4 10\n3 4 2\n3 5 6\n4 5 3', expectedOutput: '0 4 2 10 11 17' },
        { input: '3 3 0\n0 1 1\n0 2 4\n1 2 2', expectedOutput: '0 1 3' },],
      'Bellman–Ford Algorithm': [
        { input: '5 8\n0 1 4\n0 2 2\n1 2 -3\n2 3 2\n3 4 2\n4 1 1\n2 4 3\n3 1 1', expectedOutput: 'Negative cycle or distances' },
        { input: '5 8 0', expectedOutput: 'Edge list distances' },],
      'Minimum Spanning Tree': [
        { input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', expectedOutput: '19' },
        { input: '3 3\n0 1 1\n0 2 2\n1 2 3', expectedOutput: '3' },],
      'Strongly Connected Components': [
        { input: '5 5\n1 0\n0 2\n2 1\n0 3\n3 4', expectedOutput: '3' },
        { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: '1' },],
      'Network Delay Time': [
        { input: '4 3\n[[2,1,1],[2,3,1],[3,4,1]] 2', expectedOutput: '2' },
        { input: '2 1\n[[1,2,1]] 2', expectedOutput: '-1' },],
      'Cheapest Flight Within K Stops': [
        { input: '4 3\n[[0,1,100],[1,2,100],[0,2,500]] 0 2 1', expectedOutput: '200' },
        { input: '3 3\n[[0,1,100],[1,2,100],[0,2,500]] 0 2 0', expectedOutput: '500' },],
      'Alien Dictionary': [
        { input: '[wrt,wrf,er,ett,rftt]', expectedOutput: 'wertf' },
        { input: '[z,x]', expectedOutput: 'zx' },],
      'Critical Connections': [
        { input: '4 5\n[[0,1],[1,2],[2,0],[1,3]]', expectedOutput: '[[1,3]]' },
        { input: '2 1\n[[0,1]]', expectedOutput: '[[0,1]]' },],
      'Word Ladder': [
        { input: 'hit\ncog\n[hot,dot,dog,lot,log,cog]', expectedOutput: '5' },
        { input: 'hit\ncog\n[hot,dot,dog,lot,log]', expectedOutput: '0' },],
      'Reconstruct Itinerary': [
        { input: '[[MUC,LHR],[JFK,MUC],[SFO,SJC],[LHR,SFO],[SJC,LHR]]', expectedOutput: '[JFK,MUC,LHR,SFO,SJC,LHR]' },
        { input: '[[JFK,SFO],[JFK,ATL],[SFO,ATL],[ATL,JFK],[ATL,SFO]]', expectedOutput: '[JFK,ATL,JFK,SFO,ATL,SFO]' },],
    },
  },
  dp: {
    Easy: {
      'Climbing Stairs': [
        { input: '2', expectedOutput: '2' },
        { input: '3', expectedOutput: '3' },],
      'Fibonacci Number': [
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },],
      'House Robber': [
        { input: '[1,2,3,1]', expectedOutput: '4' },
        { input: '[2,7,9,3,1]', expectedOutput: '12' },],
      'Minimum Cost For Tickets': [
        { input: '[1,4,6,7,8,20] [2,7,15]', expectedOutput: '11' },
        { input: '[1,2,3,4,5,6,7,8,9,10,20,21,22,23,24,25] [2,7,15]', expectedOutput: '20' },],
      'Coin Change': [
        { input: '[1,2,5] 5', expectedOutput: '3' },
        { input: '[2] 3', expectedOutput: '-1' },],
      'Longest Increasing Subsequence': [
        { input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4' },
        { input: '[0,1,0,4,4,4,3,5,5,7,8,2,5,6]', expectedOutput: '6' },],
      'Decode Ways': [
        { input: '12', expectedOutput: '2' },
        { input: '226', expectedOutput: '3' },],
      'Maximum Product Subarray': [
        { input: '[2,3,-2,4]', expectedOutput: '6' },
        { input: '[-2]', expectedOutput: '-2' },],
      'Perfect Squares': [
        { input: '7', expectedOutput: '2' },
        { input: '2', expectedOutput: '2' },],
      'Palindrome Partitioning II': [
        { input: 'nitin', expectedOutput: '2' },
        { input: 'racecar', expectedOutput: '1' },],
    },
    Medium: {
      'Longest Palindromic Subsequence': [
        { input: 'bbbab', expectedOutput: 'bbbb' },
        { input: 'cbbd', expectedOutput: 'bb' },],
      'Regular Expression Matching': [
        { input: 'aa\na', expectedOutput: 'false' },
        { input: 'aa\na*', expectedOutput: 'true' },],
      'Wildcard Matching': [
        { input: 'aa\na', expectedOutput: 'false' },
        { input: 'aa\n*', expectedOutput: 'true' },],
      'Number of Dice Rolls With Target Sum': [
        { input: '1 6 3', expectedOutput: '1' },
        { input: '2 6 7', expectedOutput: '6' },],
      'Best Time to Buy and Sell Stock IV': [
        { input: '2\n[3,2,6,5,0,3]', expectedOutput: '7' },
        { input: '2\n[1,2,3,4,5]', expectedOutput: '4' },],
      'Delete and Earn': [
        { input: '[3,4,2]', expectedOutput: '6' },
        { input: '[2,3,1]', expectedOutput: '4' },],
      'Out of Boundary Paths': [
        { input: '2 2 2 0 0', expectedOutput: '6' },
        { input: '1 3 3 0 1', expectedOutput: '12' },],
      'Increasing Triplet Subsequence': [
        { input: '[1,2,0,2,1]', expectedOutput: 'true' },
        { input: '[5,1,5,5,10,5,1]', expectedOutput: 'false' },],
      'Can I Win': [
        { input: '10\n40', expectedOutput: 'true' },
        { input: '20\n210', expectedOutput: 'false' },],
      'Best Team With No Conflicts': [
        { input: '[[1,1],[2,1],[3,5],[4,3],[5,3]]', expectedOutput: '11' },
        { input: '[[4,3],[1,1],[7,1]]', expectedOutput: '11' },],
    },
    Hard: {
      'Russian Doll Envelopes': [
        { input: '[[2,100],[3,4],[4,3],[5,5],[5,7],[6,2],[6,5],[7,5],[8,5],[8,6],[9,4],[9,5],[9,6],[10,5],[10,6],[10,7],[10,8],[11,7],[15,24],[15,25],[20,25]]', expectedOutput: '7' },
        { input: '[[1,1],[1,1],[1,1]]', expectedOutput: '1' },],
      'Burst Balloons': [
        { input: '[3,1,5,8]', expectedOutput: '167' },
        { input: '[1,5]', expectedOutput: '10' },],
      'Maximum Rectangle': [
        { input: '3\n10100\n10111\n11111', expectedOutput: '6' },
        { input: '3\n01\n10', expectedOutput: '1' },],
      'Palindrome Cutting': [
        { input: 'nitin', expectedOutput: '2' },
        { input: 'bbbb', expectedOutput: '1' },],
      'Interleaving String': [
        { input: 'aabcc\ndbbca\naadbbcbcac', expectedOutput: 'true' },
        { input: 'aabcc\ndbbca\naadbbbaccc', expectedOutput: 'false' },],
      'Largest Divisible Subset': [
        { input: '[1,2,3,4,6]', expectedOutput: '4' },
        { input: '[1,2,4]', expectedOutput: '3' },],
      'Super Egg Drop': [
        { input: '1 2', expectedOutput: '2' },
        { input: '2 100', expectedOutput: '14' },],
      'Number of Ways to Make Coin Change': [
        { input: '[1,2,3] 5', expectedOutput: '5' },
        { input: '[10] 10', expectedOutput: '1' },],
      'Word Break II': [
        { input: 'catsandcatsdog\n[cat,cats,and,sand,dog]', expectedOutput: '2' },
        { input: 'catsanddogs\n[cat,cats,and,sand,dog]', expectedOutput: '0' },],
      'Minimum Window Substring': [
        { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC' },
        { input: 'a\na', expectedOutput: 'a' },],
    },
  },
};

export const getTestCasesForProblem = (topic, difficulty, problemTitle) => {
  return TEST_CASES[topic]?.[difficulty]?.[problemTitle] || [];
};


