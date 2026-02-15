import { Injectable, computed } from '@angular/core';
import { ContractExpiryApi } from './contract-expiry.api';
import { ContractExpiryStore } from './contract-expiry.store';

@Injectable({ providedIn: 'root' })
export class ContractExpiryFacade {
  constructor(private api: ContractExpiryApi, private store: ContractExpiryStore) {}

  readonly pieSeries = computed(() =>
    this.store.rows().map((r) => ({ name: r.name, value: r.count }))
  );

  load() {
    this.api.getSummary().subscribe((r) => this.store.setRows(r));
  }
}
