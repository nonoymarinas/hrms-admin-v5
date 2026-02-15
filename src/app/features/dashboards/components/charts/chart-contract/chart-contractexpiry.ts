import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ContractExpiryFacade } from '../../../services/contract-expiry/contract-expiry.facade';

@Component({
  selector: 'ui-chart-contract-expiry',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-contractexpiry.html',
  styleUrls: ['./chart-contractexpiry.scss'],
})
export class ChartContractExpiry implements OnInit {
  readonly facade = inject(ContractExpiryFacade);
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
