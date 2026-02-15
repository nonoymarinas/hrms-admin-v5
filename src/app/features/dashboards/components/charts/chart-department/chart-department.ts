import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DepartmentFacade } from '../../../services/department/department.facade';

@Component({
  selector: 'ui-chart-department',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-department.html',
  styleUrls: ['./chart-department.scss'],
})
export class ChartDepartment implements OnInit {
  readonly facade = inject(DepartmentFacade);

  ngOnInit() {
    this.facade.load();
  }

  readonly options = computed<EChartsOption>(() => ({
    legend: { top: 10, left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['0%', '60%'],
        center: ['50%', '60%'],
        label: { formatter: '{b}\n{d}%' },
        data: this.facade.pieSeries(),
      },
    ],
  }));
}
