import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEmployeetype } from './chart-employeetype';

describe('ChartEmployeetype', () => {
  let component: ChartEmployeetype;
  let fixture: ComponentFixture<ChartEmployeetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartEmployeetype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartEmployeetype);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
