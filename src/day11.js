const fs = require('fs');

// 1. Read the raw text file
const input = fs.readFileSync('input/11.in', 'utf8').trim();

// 2. Parse into an adjacency list
const graph = {};

input.split('\n').forEach(line => {
    // Each line: "source: target1 target2 ..."
    const [source, targetsRaw] = line.split(':');
    const sourceNode = source.trim();
    
    // Convert targets into an array, cleaning up whitespace
    const targets = targetsRaw.trim().split(/\s+/);
    
    graph[sourceNode] = targets;
});

// Example check: access connections for the 'you' node

const memo = new Map();

function countPaths(currentNode, hasDac, hasFft) {
  // Base case: reaching the exit
  if (currentNode === 'out') {
    // Return 1 if the specific condition for Part 2 is met (e.g., both flags true)
    return (hasDac && hasFft) ? 1 : 0;
  }

  // Create a unique key for the current state
  const key = `${currentNode}-${hasDac}-${hasFft}`;
  if (memo.has(key)) return memo.get(key);

  let total = 0;
  for (const nextNode of (graph[currentNode] || [])) {
    // Update state based on the node we are visiting
    const nextDac = hasDac || nextNode === 'dac';
    const nextFft = hasFft || nextNode === 'fft';
    
    total += countPaths(nextNode, nextDac, nextFft);
  }

  memo.set(key, total);
  return total;
}

// Start from the server node
console.log("part one:", countPaths('you', true, true));
console.log("part two:", countPaths('svr', false, false));