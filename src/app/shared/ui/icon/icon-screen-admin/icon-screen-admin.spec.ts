import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenAdmin } from './icon-screen-admin';

describe('IconScreenAdmin', () => {
  let component: IconScreenAdmin;
  let fixture: ComponentFixture<IconScreenAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconScreenAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
