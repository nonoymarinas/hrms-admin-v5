import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJoblevel } from './chart-joblevel';

describe('ChartJoblevel', () => {
  let component: ChartJoblevel;
  let fixture: ComponentFixture<ChartJoblevel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartJoblevel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJoblevel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
