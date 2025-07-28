// scripts/main.js

import { createNewArray, setBarArray, getBars, setUIDisabled, setUIEnabled, stepSort, pauseSort, resumeSort, stopSort, setSpeed, setSize, forceStop } from './sorting.js';
import * as Bubble from './algorithms/bubble.js';
import * as Selection from './algorithms/selection.js';
import * as Insertion from './algorithms/insertion.js';
import * as Merge from './algorithms/merge.js';
import * as Quick from './algorithms/quick.js';
import * as Heap from './algorithms/heap.js';

const algorithms = {
  bubble: { 
    name: 'Bubble Sort', 
    sort: Bubble.bubbleSort, 
    time: 'O(n²)', 
    space: 'O(1)', 
    description: 'Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.' 
  },
  selection: { 
    name: 'Selection Sort', 
    sort: Selection.selectionSort, 
    time: 'O(n²)', 
    space: 'O(1)', 
    description: 'Finds the minimum element and places it at the beginning. Performs well on small lists.' 
  },
  insertion: { 
    name: 'Insertion Sort', 
    sort: Insertion.insertionSort, 
    time: 'O(n²)', 
    space: 'O(1)', 
    description: 'Builds the sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.' 
  },
  merge: { 
    name: 'Merge Sort', 
    sort: Merge.mergeSort, 
    time: 'O(n log n)', 
    space: 'O(n)', 
    description: 'Divides the array into halves, sorts them separately, then merges. Stable and consistent performance.' 
  },
  quick: { 
    name: 'Quick Sort', 
    sort: Quick.quickSort, 
    time: 'O(n log n)', 
    space: 'O(log n)', 
    description: 'Partitions array around a pivot element. Fast average case but can degrade to O(n²) in worst case.' 
  },
  heap: { 
    name: 'Heap Sort', 
    sort: Heap.heapSort, 
    time: 'O(n log n)', 
    space: 'O(1)', 
    description: 'Uses a binary heap data structure. Consistent O(n log n) performance with minimal space usage.' 
  },
};

let currentAlgo = 'bubble';

// Button active state management
function setActiveButton(activeButtonId) {
  document.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (activeButtonId) {
    document.getElementById(activeButtonId).classList.add('active');
  }
}

const algoSelect = document.getElementById('algorithm_select');

// ENHANCED: Algorithm switching with force stop
algoSelect.addEventListener('change', e => {
  const newAlgo = e.target.value;
  
  // If currently sorting, stop current sort
  if (document.getElementById('runSort').disabled) {
    forceStop();
    console.log(`Switched from ${algorithms[currentAlgo].name} to ${algorithms[newAlgo].name}`);
  }
  
  currentAlgo = newAlgo;
  setAlgoInfo();
  
  // Visual feedback for algorithm change
  algoSelect.style.background = 'var(--button-selected)';
  setTimeout(() => {
    algoSelect.style.background = '';
  }, 300);
});

function setAlgoInfo() {
  const { name, time, space, description } = algorithms[currentAlgo];
  document.getElementById('algorithmName').textContent = name || '';
  document.getElementById('algorithmDescription').textContent = description || '';
  document.getElementById('complexityTime').textContent = time || '';
  document.getElementById('complexitySpace').textContent = space || '';
}
setAlgoInfo();

// ENHANCED: Better error handling and algorithm switching protection
document.getElementById('runSort').onclick = async () => {
  setActiveButton('runSort');
  setUIDisabled();
  
  const runningAlgo = currentAlgo; // Store which algorithm we're running
  
  try {
    await algorithms[currentAlgo].sort();
  } catch (error) {
    console.error('Sorting error:', error);
  }
  
  // Only restore UI if still on same algorithm (prevent issues with algorithm switching)
  if (runningAlgo === currentAlgo) {
    setUIEnabled();
    setActiveButton(null);
  }
};

document.getElementById('newArray').onclick = () => {
  setActiveButton('newArray');
  forceStop(); // Use forceStop instead of stopSort for complete reset
  createNewArray();
  setTimeout(() => setActiveButton(null), 500);
};

// FIXED: Remove active button states from pause/resume to avoid conflicts
document.getElementById('pauseSort').onclick = () => {
  pauseSort();
};

document.getElementById('resumeSort').onclick = () => {
  resumeSort();
};

document.getElementById('stepForward').onclick = () => {
  stepSort();
};

document.getElementById('stopSort').onclick = () => {
  setActiveButton('stopSort');
  forceStop(); // Use forceStop for complete reset
  setTimeout(() => setActiveButton(null), 300);
};

document.getElementById('size_input').oninput = e => {
  setSize(e.target.value);
  createNewArray();
};

document.getElementById('speed_input').oninput = e => {
  setSpeed(e.target.value);
};

// Initial setup
createNewArray();
