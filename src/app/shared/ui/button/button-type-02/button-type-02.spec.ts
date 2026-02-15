import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonType02 } from './button-type-02';

describe('ButtonType02', () => {
  let component: ButtonType02;
  let fixture: ComponentFixture<ButtonType02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonType02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonType02);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
