import { signal } from '@angular/core';

export const isPanelOpenSignal = signal(true);

export function openPanel() {
  isPanelOpenSignal.set(true);
}

export function togglePanel() {
  isPanelOpenSignal.update((prev) => !prev);
  console.log('isPanelOpenSignal', isPanelOpenSignal());
}
