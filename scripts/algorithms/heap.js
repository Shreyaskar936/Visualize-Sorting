import { getBars, delayTime, swapBars, showSorted, isSorting } from '../sorting.js';

export async function heapSort() {
  let bars = getBars();
  let n = bars.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (!isSorting()) return;
    await heapify(bars, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    if (!isSorting()) return;
    
    bars[0].style.background = 'var(--bar-compare)';
    bars[i].style.background = 'var(--bar-compare)';
    await delayTime();
    
    swapBars(bars[0], bars[i]);
    bars[i].style.background = 'var(--bar-sorted)';
    
    await heapify(bars, i, 0);
    bars[0].style.background = '';
  }
  
  if (n > 0) bars[0].style.background = 'var(--bar-sorted)';
  showSorted();
}

async function heapify(bars, n, i) {
  if (!isSorting()) return;
  
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
    largest = left;
  }
  
  if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
    largest = right;
  }
  
  if (largest !== i) {
    bars[i].style.background = 'var(--bar-selected)';
    bars[largest].style.background = 'var(--bar-selected)';
    await delayTime();
    
    swapBars(bars[i], bars[largest]);
    await heapify(bars, n, largest);
    
    bars[i].style.background = '';
    bars[largest].style.background = '';
  }
}
