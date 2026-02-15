import { Routes } from '@angular/router';
import { AdminMain } from './admin-main';

// app.routes.ts
export const ADMIN_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminMain,
    children: [],
  },
];
