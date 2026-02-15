import { Injectable, signal } from '@angular/core';
import type { WorkLocationSummary } from './work-location.api';

@Injectable({ providedIn: 'root' })
export class WorkLocationStore {
  private _rows = signal<WorkLocationSummary[]>([]);
  private _loading = signal(false);

  readonly rows = this._rows.asReadonly();
  readonly loading = this._loading.asReadonly();

  setRows(rows: WorkLocationSummary[]) {
    this._rows.set(rows);
  }

  setLoading(v: boolean) {
    this._loading.set(v);
  }
}
