import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { JobLevelFacade } from '../../../services/job-level/job-level.facade';

@Component({
  selector: 'ui-chart-job-level',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-joblevel.html',
  styleUrls: ['./chart-joblevel.scss'],
})
export class ChartJobLevel implements OnInit {
  readonly facade = inject(JobLevelFacade);
  ngOnInit() {
    this.facade.load();
  }

  readonly options = computed<EChartsOption>(() => ({
    legend: { top: 10, left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '60%',
        center: ['50%', '60%'],
        label: { formatter: '{b}\n{d}%' },
        data: this.facade.pieSeries(),
      },
    ],
  }));
}
