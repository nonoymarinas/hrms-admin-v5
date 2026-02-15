import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTenure } from './chart-tenure';

describe('ChartTenure', () => {
  let component: ChartTenure;
  let fixture: ComponentFixture<ChartTenure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTenure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTenure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
