import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonContact } from './person-contact';

describe('PersonContact', () => {
  let component: PersonContact;
  let fixture: ComponentFixture<PersonContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
