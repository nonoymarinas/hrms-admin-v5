import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { EmployeeTypeFacade } from '../../../services/employee-type/employee-type.facade';

@Component({
  selector: 'ui-chart-employeetype',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-employeetype.html',
  styleUrls: ['./chart-employeetype.scss'],
})
export class ChartEmployeeType implements OnInit {
  readonly facade = inject(EmployeeTypeFacade);

  ngOnInit(): void {
    this.facade.loadSummary(); // ✅ loads dummy data from API → store
  }

  readonly options = computed<EChartsOption>(() => {
    const data = this.facade.pieSeries(); // [{name, value}, ...]

    return {
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => `${p.name}<br/>Count: ${p.value}<br/>${p.percent}%`,
      },

      legend: {
        top: 10,
        left: 'center',
      },

      series: [
        {
          name: 'Employee Type',
          type: 'pie',
          radius: ['0%', '60%'],
          center: ['50%', '60%'],
          label: { formatter: '{b}\n{d}%' },
          data,
        },
      ],
    };
  });
}
