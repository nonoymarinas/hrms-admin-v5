import { Injectable, signal } from '@angular/core';
import type { EmployeeTypeSummary } from './employee-type.api';

@Injectable({ providedIn: 'root' })
export class EmployeeTypeStore {
  private _rows = signal<EmployeeTypeSummary[]>([]);
  private _loading = signal(false);

  readonly rows = this._rows.asReadonly();
  readonly loading = this._loading.asReadonly();

  setRows(rows: EmployeeTypeSummary[]) {
    this._rows.set(rows);
  }

  setLoading(v: boolean) {
    this._loading.set(v);
  }
}
