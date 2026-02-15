import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInput } from './manual-input';

describe('ManualInput', () => {
  let component: ManualInput;
  let fixture: ComponentFixture<ManualInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
