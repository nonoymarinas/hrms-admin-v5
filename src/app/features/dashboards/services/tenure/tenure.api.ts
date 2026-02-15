import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TenureApi {
  getSummary() {
    return of([
      { name: '< 6 months', count: 20 },
      { name: '6–12 months', count: 18 },
      { name: '1–3 years', count: 34 },
      { name: '3–5 years', count: 22 },
      { name: '5+ years', count: 34 },
    ]).pipe(delay(300));
  }
}
