import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTextarea } from './manual-textarea';

describe('ManualTextarea', () => {
  let component: ManualTextarea;
  let fixture: ComponentFixture<ManualTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualTextarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
