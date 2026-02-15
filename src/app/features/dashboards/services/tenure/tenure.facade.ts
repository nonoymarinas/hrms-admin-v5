import { Injectable, computed } from '@angular/core';
import { TenureApi } from './tenure.api';
import { TenureStore } from './tenure.store';

@Injectable({ providedIn: 'root' })
export class TenureFacade {
  constructor(private api: TenureApi, private store: TenureStore) {}

  readonly pieSeries = computed(() =>
    this.store.rows().map((r) => ({ name: r.name, value: r.count }))
  );

  load() {
    this.api.getSummary().subscribe((r) => this.store.setRows(r));
  }
}
