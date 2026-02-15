import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { AttendanceFacade } from '../../../services/attendance/atendance.facade';

@Component({
  selector: 'ui-chart-attendance',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-attendance.html',
  styleUrls: ['./chart-attendance.scss'],
})
export class ChartAttendance implements OnInit {
  readonly facade = inject(AttendanceFacade);

  chartInstance: any = null;

  ngOnInit(): void {
    // ✅ loads dummy data from AttendanceApi → Store
    this.facade.loadSummary();
  }

  onChartInit(ec: any): void {
    this.chartInstance = ec;
    setTimeout(() => {
      try {
        ec.resize();
      } catch {}
    }, 0);
  }

  // ✅ Reactive chart options (NO STACK)
  readonly options = computed<EChartsOption>(() => {
    const labels = this.facade.categories();
    const present = this.facade.presentSeries();
    const late = this.facade.lateSeries();
    const absent = this.facade.absentSeries();
    const leave = this.facade.leaveSeries();
    const total = this.facade.totalEmployeesSeries();

    // attendance % = present / total
    const rate = total.map((t, i) => (t > 0 ? Math.round((present[i] / t) * 100) : 0));

    return {
      animation: true,
      animationDuration: 800,
      animationEasing: 'cubicOut',

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const list = Array.isArray(params) ? params : [params];
          const day = list[0]?.axisValue ?? '';

          const val = (name: string) => list.find((p: any) => p.seriesName === name)?.value ?? 0;

          return `
            ${day}<br/>
            Total: ${val('Total')}<br/>
            Present: ${val('Present')}<br/>
            Late: ${val('Late')}<br/>
            Absent: ${val('Absent')}<br/>
            Leave: ${val('Leave')}<br/>
            Attendance: ${val('Attendance %')}%
          `;
        },
      },

      legend: {
        top: 10,
        data: ['Present', 'Late', 'Absent', 'Leave', 'Total', 'Attendance %'],
      },

      grid: {
        left: 16,
        right: 48,
        top: 70,
        bottom: 24,
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        data: labels.map(this.formatLabel),
      },

      yAxis: [
        {
          type: 'value',
          name: 'Employees',
          minInterval: 1,
        },
        {
          type: 'value',
          name: 'Attendance %',
          min: 0,
          max: 100,
          axisLabel: { formatter: '{value}%' },
        },
      ],

      // ❌ NO STACK ANYWHERE
      series: [
        { name: 'Present', type: 'bar', data: present, barGap: '10%' },
        { name: 'Late', type: 'bar', data: late, barGap: '10%' },
        { name: 'Absent', type: 'bar', data: absent, barGap: '10%' },
        { name: 'Leave', type: 'bar', data: leave, barGap: '10%' },

        {
          name: 'Total',
          type: 'line',
          data: total,
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
        },

        {
          name: 'Attendance %',
          type: 'line',
          yAxisIndex: 1,
          data: rate,
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
        },
      ],
    };
  });

  // ---------------------------
  // Helpers
  // ---------------------------

  private formatLabel = (ymd: string): string => {
    const [y, m, d] = ymd.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, d ?? 1);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  };
}
