import { Injectable, computed } from '@angular/core';
import { WorkLocationApi } from './work-location.api';
import { WorkLocationStore } from './work-location.store';

@Injectable({ providedIn: 'root' })
export class WorkLocationFacade {
  constructor(private api: WorkLocationApi, private store: WorkLocationStore) {}

  readonly rows = computed(() => this.store.rows());
  readonly loading = computed(() => this.store.loading());

  // pie-series format for ECharts
  readonly pieSeries = computed(() =>
    this.rows().map((r) => ({
      name: r.name,
      value: r.count,
    }))
  );

  readonly totalEmployees = computed(() => this.rows().reduce((sum, r) => sum + r.count, 0));

  loadSummary() {
    this.store.setLoading(true);

    this.api.getWorkLocationSummary().subscribe({
      next: (rows) => this.store.setRows(rows),
      error: () => this.store.setLoading(false),
      complete: () => this.store.setLoading(false),
    });
  }
}
