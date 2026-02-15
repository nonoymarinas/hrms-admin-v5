import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWorklocation } from './chart-worklocation';

describe('ChartWorklocation', () => {
  let component: ChartWorklocation;
  let fixture: ComponentFixture<ChartWorklocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartWorklocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartWorklocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
