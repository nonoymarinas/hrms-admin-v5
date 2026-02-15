import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenSettings } from './icon-screen-settings';

describe('IconScreenSettings', () => {
  let component: IconScreenSettings;
  let fixture: ComponentFixture<IconScreenSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconScreenSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
