import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDepartment } from './chart-department';

describe('ChartDepartment', () => {
  let component: ChartDepartment;
  let fixture: ComponentFixture<ChartDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDepartment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
