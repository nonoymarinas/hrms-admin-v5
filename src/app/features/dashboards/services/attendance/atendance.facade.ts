import { Injectable, computed } from '@angular/core';
import { AttendanceApi } from './attendance.api';
import { AttendanceStore } from './attendance.store';

@Injectable({ providedIn: 'root' })
export class AttendanceFacade {
  constructor(private api: AttendanceApi, private store: AttendanceStore) {}

  // ✅ stable facade signals (do this)
  readonly rows = computed(() => this.store.rows());
  readonly loading = computed(() => this.store.loading());

  // derived data for chart
  readonly categories = computed(() => this.rows().map((r) => r.date));
  readonly presentSeries = computed(() => this.rows().map((r) => r.present));
  readonly lateSeries = computed(() => this.rows().map((r) => r.late));
  readonly absentSeries = computed(() => this.rows().map((r) => r.absent));
  readonly leaveSeries = computed(() => this.rows().map((r) => r.leave));

  // (optional) total employees series
  readonly totalEmployeesSeries = computed(() =>
    this.rows().map((r) => r.present + r.late + r.absent + r.leave)
  );

  loadSummary() {
    this.store.setLoading(true);

    this.api.getAttendanceSummary().subscribe({
      next: (rows) => this.store.setRows(rows),
      error: () => this.store.setLoading(false),
      complete: () => this.store.setLoading(false),
    });
  }
}
