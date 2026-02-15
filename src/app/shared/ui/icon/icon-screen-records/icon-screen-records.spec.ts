import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenRecords } from './icon-screen-records';

describe('IconScreenRecords', () => {
  let component: IconScreenRecords;
  let fixture: ComponentFixture<IconScreenRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenRecords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconScreenRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
