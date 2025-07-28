import { getBars, delayTime, swapBars, showSorted, isSorting } from '../sorting.js';

export async function quickSort() {
  let bars = getBars();
  await quickSortHelper(bars, 0, bars.length - 1);
  showSorted();
}

async function quickSortHelper(bars, low, high) {
  if (low < high && isSorting()) {
    let pivotIndex = await partition(bars, low, high);
    await quickSortHelper(bars, low, pivotIndex - 1);
    await quickSortHelper(bars, pivotIndex + 1, high);
  }
}

async function partition(bars, low, high) {
  if (!isSorting()) return high;
  
  let pivot = parseInt(bars[high].style.height);
  bars[high].style.background = 'var(--bar-pivot)';
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (!isSorting()) return high;
    
    bars[j].style.background = 'var(--bar-compare)';
    await delayTime();
    
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      bars[i].style.background = '#ff4081';
      bars[j].style.background = '#ff4081';
      await delayTime(50);
      swapBars(bars[i], bars[j]);
      bars[i].style.background = 'var(--bar-selected)';
      if (i !== j) bars[j].style.background = 'var(--bar-selected)';
      await delayTime(50);
    } else {
      bars[j].style.background = '';
    }
  }
  
  bars[i + 1].style.background = '#ff4081';
  bars[high].style.background = '#ff4081';
  await delayTime(100);
  swapBars(bars[i + 1], bars[high]);
  bars[i + 1].style.background = 'var(--bar-sorted)';
  bars[high].style.background = '';
  await delayTime();
  
  for (let k = low; k <= high; k++) {
    if (bars[k].style.background !== 'var(--bar-sorted)') {
      bars[k].style.background = '';
    }
  }
  
  return i + 1;
}
