import { Injectable, computed } from '@angular/core';
import { JobLevelApi } from './job-level.api';
import { JobLevelStore } from './job-level.store';

@Injectable({ providedIn: 'root' })
export class JobLevelFacade {
  constructor(private api: JobLevelApi, private store: JobLevelStore) {}

  readonly pieSeries = computed(() =>
    this.store.rows().map((r) => ({ name: r.name, value: r.count }))
  );

  load() {
    this.api.getSummary().subscribe((r) => this.store.setRows(r));
  }
}
