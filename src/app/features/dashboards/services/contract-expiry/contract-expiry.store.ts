import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractExpiryStore {
  private _rows = signal<any[]>([]);
  readonly rows = this._rows.asReadonly();
  setRows(r: any[]) {
    this._rows.set(r);
  }
}
