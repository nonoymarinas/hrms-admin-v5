import { Routes } from '@angular/router';
import { MainLayout } from './main-layout';

// app.routes.ts
export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard-main' },
      {
        path: 'dashboard-main',
        loadChildren: () =>
          import('../../../features/dashboards/pages/dashboard-main/dashboard-main.routes').then(
            (m) => m.DASHBOARD_MAIN_ROUTES
          ),
      },
      {
        path: 'admin-main',
        loadChildren: () =>
          import('../../../features/admin/pages/admin-main/admin-main.routes').then((m) => m.ADMIN_MAIN_ROUTES),
      },
      {
        path: 'home-main',
        loadChildren: () =>
          import('../../../features/home/pages/home-main/home-main.routes').then((m) => m.HOME_MAIN_ROUTES),
      },

      {
        path: 'person-main',
        loadChildren: () =>
          import('../../../features/person/pages/person-main/person-main.routes').then(
            (m) => m.PERSON_MAIN_ROUTES
          ),
      },
      {
        path: 'record-main',
        loadChildren: () =>
          import('../../../features/records/pages/record-main/record-main.routes').then(
            (m) => m.RECORDS_MAIN_ROUTES
          ),
      },
      {
        path: 'setting-main',
        loadChildren: () =>
          import('../../../features/settings/pages/setting-main/setting-main.routes').then(
            (m) => m.SETTINGS_MAIN_ROUTES
          ),
      },
    ],
  },
];
