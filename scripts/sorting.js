// scripts/sorting.js

let barArray = [];
let arraySize = 60;
let sorting = false;
let paused = false;
let running = null;
let delay = 100;

export function getBars() {
  return document.querySelectorAll('.bar');
}

export function setBarArray(arr) {
  barArray = arr;
}

export function setUIDisabled() {
  document.getElementById('runSort').disabled = true;
  document.getElementById('pauseSort').disabled = false;
  document.getElementById('resumeSort').disabled = true;
  document.getElementById('stepForward').disabled = false;
  document.getElementById('newArray').disabled = true;
  document.getElementById('stopSort').disabled = false;
  // Keep algorithm select enabled for switching during sort
  document.getElementById('size_input').disabled = true;
  sorting = true;
  paused = false;
}

export function setUIEnabled() {
  document.getElementById('runSort').disabled = false;
  document.getElementById('pauseSort').disabled = true;
  document.getElementById('resumeSort').disabled = true;
  document.getElementById('stepForward').disabled = true;
  document.getElementById('newArray').disabled = false;
  document.getElementById('stopSort').disabled = true;
  document.getElementById('algorithm_select').disabled = false;
  document.getElementById('size_input').disabled = false;
  sorting = false;
  paused = false;
}

// ADDED: Pause/Resume UI states
export function setUIPaused() {
  document.getElementById('pauseSort').disabled = true;
  document.getElementById('resumeSort').disabled = false;
  document.getElementById('stepForward').disabled = false;
}

export function setUIResumed() {
  document.getElementById('pauseSort').disabled = false;
  document.getElementById('resumeSort').disabled = true;
  document.getElementById('stepForward').disabled = false;
}

export function setSpeed(val) {
  delay = 320 - parseInt(val);
}

export function setSize(val) {
  arraySize = +val;
}

export function createNewArray() {
  stopSort();
  const parent = document.getElementById('sorting');
  parent.innerHTML = '';
  barArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 251));
  
  const containerWidth = parent.offsetWidth || 800;
  const availableWidth = containerWidth * 0.8; 
  const barWidth = Math.max(2, Math.min(20, availableWidth / arraySize));
  const barMargin = Math.max(0, Math.min(2, (availableWidth - (barWidth * arraySize)) / arraySize));
  
  for (let h of barArray) {
    const bar = document.createElement('div');
    bar.style.height = `${h*2}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.marginLeft = `${barMargin/2}px`;
    bar.style.marginRight = `${barMargin/2}px`;
    bar.classList.add('bar','flex-item');
    parent.appendChild(bar);
  }
}

export async function delayTime(ms = delay) {
  await new Promise(r => setTimeout(r, ms));
  
  while (paused && sorting) {
    await new Promise(r => setTimeout(r, 50));
  }
}

export function showSorted() {
  getBars().forEach(b => b.style.background = 'var(--bar-sorted)');
}

export function swapBars(bar1, bar2) {
  const t = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = t;
}

export function pauseSort() { 
  paused = true; 
  setUIPaused();
}

export function resumeSort() { 
  paused = false;
  setUIResumed();
}

export function stepSort() { 
  paused = false;
  setTimeout(() => {
    if (sorting) pauseSort();
  }, delay + 50);
}

export function stopSort() {
  running = null;
  sorting = false;
  paused = false;
  setUIEnabled();
}

export function forceStop() {
  running = null;
  sorting = false;
  paused = false;
  // Reset all bar colors
  getBars().forEach(bar => {
    bar.style.background = '';
  });
  setUIEnabled();
}

export function isPaused() { return paused; }
export function isSorting() { return sorting; }
export function setRunning(ref) { running = ref; }
export function isRunning() { return running; }

export { delay, sorting, paused };
