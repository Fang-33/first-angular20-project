import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout').then((m) => m.Layout),
  },
  {
    path: 'flow-builder',
    loadComponent: () => import('./features/flow-builder/flow-builder').then((m) => m.FlowBuilder),
  },
];
