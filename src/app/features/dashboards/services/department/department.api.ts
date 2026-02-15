import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DepartmentSummary {
  name: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentApi {
  getSummary() {
    return of<DepartmentSummary[]>([
      { name: 'Operations', count: 45 },
      { name: 'Engineering', count: 32 },
      { name: 'Finance', count: 14 },
      { name: 'HR', count: 9 },
      { name: 'IT', count: 12 },
      { name: 'Sales', count: 18 },
    ]).pipe(delay(300));
  }
}
