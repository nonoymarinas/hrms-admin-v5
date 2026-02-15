import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/main-layout/main-layout.routes').then((m) => m.MAIN_LAYOUT_ROUTES),
    canActivate: [AuthGuard], // 👈 gatekeeper
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth-layout/auth-layout.routes').then((m) => m.AUTH_LAYOUT_ROUTES),
  },
];
