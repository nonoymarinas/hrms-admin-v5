import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractExpiryApi {
  getSummary() {
    return of([
      { name: 'Expiring 30 days', count: 6 },
      { name: 'Expiring 60 days', count: 11 },
      { name: 'Expiring 90 days', count: 17 },
      { name: 'Active', count: 82 },
      { name: 'Expired', count: 4 },
    ]).pipe(delay(300));
  }
}
