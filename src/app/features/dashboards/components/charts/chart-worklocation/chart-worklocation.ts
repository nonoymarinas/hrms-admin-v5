import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

import { WorkLocationFacade } from '../../../services/work-location/work-location.facade';

@Component({
  selector: 'ui-chart-worklocation',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-worklocation.html',
  styleUrls: ['./chart-worklocation.scss'],
})
export class ChartWorkLocation implements OnInit {
  readonly facade = inject(WorkLocationFacade);

  ngOnInit(): void {
    // ✅ load dummy data via api → store
    this.facade.loadSummary();
  }

  readonly options = computed<EChartsOption>(() => ({
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => `${p.name}<br/>Employees: ${p.value}<br/>${p.percent}%`,
    },

    legend: {
      top: 6,
      left: 'center',
    },

    series: [
      {
        name: 'Work Location',
        type: 'pie',
        radius: ['0%', '60%'],
        center: ['50%', '55%'],
        label: { formatter: '{b}\n{d}%' },
        data: this.facade.pieSeries(),
      },
    ],
  }));
}
