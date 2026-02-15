import { Injectable, signal } from '@angular/core';
import type { DepartmentSummary } from './department.api';

@Injectable({ providedIn: 'root' })
export class DepartmentStore {
  private _rows = signal<DepartmentSummary[]>([]);
  readonly rows = this._rows.asReadonly();

  setRows(rows: DepartmentSummary[]) {
    this._rows.set(rows);
  }
}
