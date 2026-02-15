import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScreenPerson } from './icon-screen-person';

describe('IconScreenPerson', () => {
  let component: IconScreenPerson;
  let fixture: ComponentFixture<IconScreenPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconScreenPerson],
    }).compileComponents();

    fixture = TestBed.createComponent(IconScreenPerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
