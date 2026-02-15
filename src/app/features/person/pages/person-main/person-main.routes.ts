import { Routes } from '@angular/router';
import { PersonMain } from './person-main';

// app.routes.ts
export const PERSON_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: PersonMain,
    children: [],
  },
];
