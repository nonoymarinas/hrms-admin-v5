import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type EmployeeType =
  | 'Regular'
  | 'Probationary'
  | 'Contractual'
  | 'Project-Based'
  | 'Consultant';

export interface EmployeeTypeSummary {
  type: EmployeeType;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeTypeApi {
  getEmployeeTypeSummary(): Observable<EmployeeTypeSummary[]> {
    const data: EmployeeTypeSummary[] = [
      { type: 'Regular', count: 78 },
      { type: 'Probationary', count: 22 },
      { type: 'Contractual', count: 15 },
      { type: 'Project-Based', count: 10 },
      { type: 'Consultant', count: 5 },
    ];

    // simulate API delay
    return of(data).pipe(delay(400));
  }
}
