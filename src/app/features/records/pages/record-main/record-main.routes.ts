import { Routes } from '@angular/router';
import { RecordMain } from './record-main';

// app.routes.ts
export const RECORDS_MAIN_ROUTES: Routes = [
  {
    path: '',
    component: RecordMain,
    children: [],
  },
];
