import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotLayout } from './forgot-layout';

describe('ForgotLayout', () => {
  let component: ForgotLayout;
  let fixture: ComponentFixture<ForgotLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
