import { Routes } from '@angular/router';
import { SettingMain } from './setting-main';

// app.routes.ts
export const SETTINGS_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: SettingMain,
    children: [],
  },
];
