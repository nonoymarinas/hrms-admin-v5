import { Component } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

type AttendanceSeriesItem = { name: string; value: number };
type AttendanceDay = { name: string; series: AttendanceSeriesItem[] };

@Component({
  selector: 'app-bar-chart-attendance',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './bar-chart-attendance.html',
  styleUrls: ['./bar-chart-attendance.scss'],
})
export class BarChartAttendance {
  // ✅ Your data format (same as ngx-charts multi-series)
  data: AttendanceDay[] = [
    {
      name: 'August 01, 2024',
      series: [
        { name: 'Total Manpower', value: 120 },
        { name: 'Present Today', value: 98 },
      ],
    },
    {
      name: 'August 02, 2024',
      series: [
        { name: 'Total Manpower', value: 80 },
        { name: 'Present Today', value: 75 },
      ],
    },
  ];

  // ✅ ngx-echarts binds to this in the HTML
  options: EChartsOption = this.buildOptions(this.data);

  // ✅ If later you load data from API, call this.setData(apiData)
  setData(data: AttendanceDay[]): void {
    this.data = data ?? [];
    this.options = this.buildOptions(this.data);
  }

  // ✅ Converts your ngx-charts style data into ECharts option config
  private buildOptions(data: AttendanceDay[]): EChartsOption {
    const categories = data.map(d => d.name);

    const seriesNames = Array.from(
      new Set(data.flatMap(d => d.series.map(s => s.name)))
    );

    return {
      tooltip: { trigger: 'axis' },
      legend: { data: seriesNames },
      grid: { left: 40, right: 20, top: 35, bottom: 45, containLabel: true },

      xAxis: {
        type: 'category',
        data: categories,
        name: 'Project / Site',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { rotate: 20 },
      },

      yAxis: {
        type: 'value',
        name: 'Manpower',
        nameLocation: 'middle',
        nameGap: 45,
      },

      series: seriesNames.map(seriesName => ({
        name: seriesName,
        type: 'bar',
        data: data.map(day => {
          const found = day.series.find(s => s.name === seriesName);
          return found ? found.value : 0;
        }),
      })),
    };
  }
}
