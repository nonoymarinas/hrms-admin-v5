import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartAttendance } from './bar-chart-attendance';

describe('BarChartAttendance', () => {
  let component: BarChartAttendance;
  let fixture: ComponentFixture<BarChartAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartAttendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
