import { getBars, delayTime, swapBars, showSorted, isSorting } from '../sorting.js';

export async function selectionSort() {
  let bars = getBars();
  for (let i = 0; i < bars.length; i++) {
    if (!isSorting()) return;
    
    let minIdx = i;
    bars[minIdx].style.background = 'var(--bar-selected)';
    
    for (let j = i + 1; j < bars.length; j++) {
      if (!isSorting()) return;
      
      bars[j].style.background = 'var(--bar-compare)';
      await delayTime();
      
      if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
        if (minIdx !== i) bars[minIdx].style.background = '';
        minIdx = j;
        bars[minIdx].style.background = 'var(--bar-selected)';
      } else {
        bars[j].style.background = '';
      }
    }
    
    if (minIdx !== i) {
      bars[i].style.background = '#ff4081';
      bars[minIdx].style.background = '#ff4081';
      await delayTime(100);
    }
    
    swapBars(bars[i], bars[minIdx]);
    bars[minIdx].style.background = '';
    bars[i].style.background = 'var(--bar-sorted)';
  }
  showSorted();
}
