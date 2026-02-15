import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenProfile } from './icon-screen-profile';

describe('IconScreenProfile', () => {
  let component: IconScreenProfile;
  let fixture: ComponentFixture<IconScreenProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconScreenProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
