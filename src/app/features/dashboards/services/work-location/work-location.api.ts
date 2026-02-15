import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface WorkLocationSummary {
  name: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class WorkLocationApi {
  getWorkLocationSummary(): Observable<WorkLocationSummary[]> {
    const data: WorkLocationSummary[] = [
      { name: 'Cavite Site', count: 48 },
      { name: 'Antipolo Site', count: 36 },
      { name: 'Bataan Site', count: 21 },
      { name: 'Cagayan Site', count: 9 },
      { name: 'Hinigaran Site', count: 100 },
    ];

    // simulate HTTP delay
    return of(data).pipe(delay(400));
  }
}
