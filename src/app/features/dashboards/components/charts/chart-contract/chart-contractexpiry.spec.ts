import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartContractExpiry } from './chart-contractexpiry';

describe('ChartContract', () => {
  let component: ChartContractExpiry;
  let fixture: ComponentFixture<ChartContractExpiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartContractExpiry],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartContractExpiry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
