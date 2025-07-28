import { getBars, delayTime, swapBars, showSorted, isSorting } from '../sorting.js';

export async function bubbleSort() {
  let bars = getBars();
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (!isSorting()) return;
      
      // Use your CSS variable
      bars[j].style.background = 'var(--bar-compare)';
      bars[j + 1].style.background = 'var(--bar-compare)';
      await delayTime();
      
      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        // Use moving color for swapping
        bars[j].style.background = '#ff4081';
        bars[j + 1].style.background = '#ff4081';
        await delayTime(50);
        swapBars(bars[j], bars[j + 1]);
      }
      
      // Reset to normal
      bars[j].style.background = '';
      bars[j + 1].style.background = '';
    }
    // Use your CSS variable for sorted
    bars[bars.length - i - 1].style.background = 'var(--bar-sorted)';
  }
  if (bars.length > 0) bars[0].style.background = 'var(--bar-sorted)';
  showSorted();
}
