import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JobLevelApi {
  getSummary() {
    return of([
      { name: 'Executive', count: 4 },
      { name: 'Manager', count: 12 },
      { name: 'Supervisor', count: 18 },
      { name: 'Senior Staff', count: 26 },
      { name: 'Rank-and-File', count: 68 },
    ]).pipe(delay(300));
  }
}
