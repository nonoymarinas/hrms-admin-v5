import { Routes } from '@angular/router';
import { DashboardMain } from './dashboard-main';

// app.routes.ts
export const DASHBOARD_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardMain,
    children: [],
  },
];
