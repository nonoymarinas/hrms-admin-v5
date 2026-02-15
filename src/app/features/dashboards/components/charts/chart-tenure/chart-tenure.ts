import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { TenureFacade } from '../../../services/tenure/tenure.facade';

@Component({
  selector: 'ui-chart-tenure',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-tenure.html',
  styleUrls: ['./chart-tenure.scss'],
})
export class ChartTenure implements OnInit {
  readonly facade = inject(TenureFacade);
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
