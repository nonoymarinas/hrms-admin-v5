import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAttendance } from './chart-attendance';

describe('ChartAttendance', () => {
  let component: ChartAttendance;
  let fixture: ComponentFixture<ChartAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartAttendance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
