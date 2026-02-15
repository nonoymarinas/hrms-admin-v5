import { Injectable, signal } from '@angular/core';
import type { AttendanceSummaryRow } from './attendance.api';

@Injectable({ providedIn: 'root' })
export class AttendanceStore {
  private _rows = signal<AttendanceSummaryRow[]>([]);
  private _loading = signal(false);

  readonly rows = this._rows.asReadonly();
  readonly loading = this._loading.asReadonly();

  setRows(rows: AttendanceSummaryRow[]) {
    this._rows.set(rows);
  }

  setLoading(v: boolean) {
    this._loading.set(v);
  }
}
