import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCompensations } from './person-compensations';

describe('PersonCompensations', () => {
  let component: PersonCompensations;
  let fixture: ComponentFixture<PersonCompensations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCompensations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCompensations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
