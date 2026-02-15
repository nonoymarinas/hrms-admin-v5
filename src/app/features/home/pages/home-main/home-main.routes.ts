import { Routes } from '@angular/router';
import { HomeMain } from './home-main';

// app.routes.ts
export const HOME_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: HomeMain,
    children: [],
  },
];
