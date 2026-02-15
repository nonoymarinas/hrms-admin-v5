import { Injectable, computed } from '@angular/core';
import { EmployeeTypeApi } from './employee-type.api';
import { EmployeeTypeStore } from './employee-type.store';

@Injectable({ providedIn: 'root' })
export class EmployeeTypeFacade {
  constructor(private api: EmployeeTypeApi, private store: EmployeeTypeStore) {}

  // base state
  readonly rows = computed(() => this.store.rows());
  readonly loading = computed(() => this.store.loading());

  // chart-ready data
  readonly labels = computed(() => this.rows().map((r) => r.type));

  readonly counts = computed(() => this.rows().map((r) => r.count));

  readonly totalEmployees = computed(() => this.rows().reduce((sum, r) => sum + r.count, 0));

  // pie-series format
  readonly pieSeries = computed(() =>
    this.rows().map((r) => ({
      name: r.type,
      value: r.count,
    }))
  );

  loadSummary() {
    this.store.setLoading(true);

    this.api.getEmployeeTypeSummary().subscribe({
      next: (rows) => this.store.setRows(rows),
      error: () => this.store.setLoading(false),
      complete: () => this.store.setLoading(false),
    });
  }
}
