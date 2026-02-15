import { Injectable, computed } from '@angular/core';
import { DepartmentApi } from './department.api';
import { DepartmentStore } from './department.store';

@Injectable({ providedIn: 'root' })
export class DepartmentFacade {
  constructor(private api: DepartmentApi, private store: DepartmentStore) {}

  readonly pieSeries = computed(() =>
    this.store.rows().map((r) => ({ name: r.name, value: r.count }))
  );

  load() {
    this.api.getSummary().subscribe((r) => this.store.setRows(r));
  }
}
