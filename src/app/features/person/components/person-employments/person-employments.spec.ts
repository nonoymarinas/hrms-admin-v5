import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEmployments } from './person-employments';

describe('PersonEmployments', () => {
  let component: PersonEmployments;
  let fixture: ComponentFixture<PersonEmployments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEmployments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonEmployments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
