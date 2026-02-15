import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenDashboard } from './icon-screen-dashboard';

describe('IconScreenDashboard', () => {
  let component: IconScreenDashboard;
  let fixture: ComponentFixture<IconScreenDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconScreenDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
