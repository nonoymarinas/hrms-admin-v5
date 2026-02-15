import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddresses } from './person-addresses';

describe('PersonAddresses', () => {
  let component: PersonAddresses;
  let fixture: ComponentFixture<PersonAddresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAddresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddresses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
