import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Leave';

export interface AttendanceSummaryRow {
  date: string; // e.g. '2026-01-01'
  present: number;
  late: number;
  absent: number;
  leave: number;
}

@Injectable({ providedIn: 'root' })
export class AttendanceApi {
  getAttendanceSummary(): Observable<AttendanceSummaryRow[]> {
    const data: AttendanceSummaryRow[] = [
      { date: '2026-01-01', present: 120, late: 12, absent: 8, leave: 4 },
      { date: '2026-01-02', present: 110, late: 18, absent: 10, leave: 6 },
      { date: '2026-01-03', present: 130, late: 9, absent: 7, leave: 2 },
      { date: '2026-01-04', present: 125, late: 14, absent: 6, leave: 3 },
      { date: '2026-01-05', present: 118, late: 16, absent: 9, leave: 5 },
      { date: '2026-01-06', present: 119, late: 10, absent: 7, leave: 8 },
      { date: '2026-01-07', present: 105, late: 10, absent: 9, leave: 20 },
    ];

    // delay to simulate real HTTP latency
    return of(data).pipe(delay(400));
  }
}
