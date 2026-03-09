import { Routes } from '@angular/router';

// 進入 / → 跳到 /chat/new
// 進入 /chat → 跳到 /chat/new
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./shared/components/chat-layout/chat-layout').then((m) => m.ChatLayout),
        children: [
          {
            path: '',
            redirectTo: 'new',
            pathMatch: 'full',
          },
          {
            path: 'new',
            loadComponent: () => import('./features/chat/new-chat/new-chat').then((m) => m.NewChat),
          },
          // {
          //   path: ':id',
          //   loadComponent: () =>
          //     import('./features/chat/chat-detail/chat-detail').then((m) => m.ChatDetail),
          // },
        ],
      },
    ],
  },
];
