import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout';

// app.routes.ts
export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: []
  }
]