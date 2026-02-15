import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartAttendance } from '../../components/charts/chart-attendance/chart-attendance';
import { ChartEmployeeType } from '../../components/charts/chart-employeetype/chart-employeetype';
import { ChartWorkLocation } from '../../components/charts/chart-worklocation/chart-worklocation';
import { ChartDepartment } from '../../components/charts/chart-department/chart-department';
import { ChartJobLevel } from '../../components/charts/chart-joblevel/chart-joblevel';
import { ChartTenure } from '../../components/charts/chart-tenure/chart-tenure';
import { ChartContractExpiry } from '../../components/charts/chart-contract/chart-contractexpiry';
@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    CommonModule,
    ChartAttendance,
    ChartEmployeeType,
    ChartWorkLocation,
    ChartDepartment,
    ChartJobLevel,
    ChartTenure,
    ChartContractExpiry,
  ],
  templateUrl: './dashboard-main.html',
  styleUrls: ['./dashboard-main.scss'],
})
export class DashboardMain {
  selectedDashboardIndex: number | null = null;

  showAll() {
    this.selectedDashboardIndex = null;
  }

  open(index: number) {
    this.selectedDashboardIndex = index;
  }

  isSelected(index: number) {
    return this.selectedDashboardIndex === index;
  }

  get isSingle(): boolean {
    return this.selectedDashboardIndex !== null;
  }
}
