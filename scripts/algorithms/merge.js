import { getBars, delayTime, showSorted, isSorting } from '../sorting.js';

export async function mergeSort() {
  let bars = getBars();
  await mergeSortHelper(bars, 0, bars.length - 1);
  showSorted();
}

async function mergeSortHelper(bars, left, right) {
  if (left >= right || !isSorting()) return;
  
  const mid = left + Math.floor((right - left) / 2);
  await mergeSortHelper(bars, left, mid);
  await mergeSortHelper(bars, mid + 1, right);
  await merge(bars, left, mid, right);
}

async function merge(bars, left, mid, right) {
  if (!isSorting()) return;
  
  let leftArr = [];
  let rightArr = [];
  
  // Highlight left subarray
  for (let i = 0; i < mid - left + 1; i++) {
    if (!isSorting()) return;
    bars[left + i].style.background = 'var(--bar-focus)';
    leftArr.push(bars[left + i].style.height);
    await delayTime(50);
  }
  
  // Highlight right subarray
  for (let i = 0; i < right - mid; i++) {
    if (!isSorting()) return;
    bars[mid + 1 + i].style.background = 'var(--bar-selected)';
    rightArr.push(bars[mid + 1 + i].style.height);
    await delayTime(50);
  }
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (!isSorting()) return;
    
    await delayTime();
    if (parseInt(leftArr[i]) <= parseInt(rightArr[j])) {
      bars[k].style.height = leftArr[i];
      i++;
    } else {
      bars[k].style.height = rightArr[j];
      j++;
    }
    bars[k].style.background = 'var(--bar-sorted)';
    k++;
  }
  
  while (i < leftArr.length) {
    if (!isSorting()) return;
    await delayTime();
    bars[k].style.height = leftArr[i];
    bars[k].style.background = 'var(--bar-sorted)';
    i++;
    k++;
  }
  
  while (j < rightArr.length) {
    if (!isSorting()) return;
    await delayTime();
    bars[k].style.height = rightArr[j];
    bars[k].style.background = 'var(--bar-sorted)';
    j++;
    k++;
  }
  
  for (let p = left; p <= right; p++) {
    bars[p].style.background = '';
  }
}
