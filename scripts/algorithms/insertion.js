import { getBars, delayTime, showSorted, isSorting } from '../sorting.js';

export async function insertionSort() {
  let bars = getBars();
  if (bars.length > 0) bars[0].style.background = 'var(--bar-sorted)';
  
  for (let i = 1; i < bars.length; i++) {
    if (!isSorting()) return;
    
    let key = bars[i].style.height;
    let j = i - 1;
    
    bars[i].style.background = 'var(--bar-compare)';
    await delayTime();
    
    while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
      if (!isSorting()) return;
      
      bars[j + 1].style.height = bars[j].style.height;
      bars[j].style.background = 'var(--bar-compare)';
      j--;
      await delayTime();
      
      for (let k = i; k > j; k--) {
        bars[k].style.background = '';
      }
    }
    
    bars[j + 1].style.height = key;
    for (let k = 0; k <= i; k++) {
      bars[k].style.background = 'var(--bar-sorted)';
    }
  }
  showSorted();
}
