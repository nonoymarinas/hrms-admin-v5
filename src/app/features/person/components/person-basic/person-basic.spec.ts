import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBasic } from './person-basic';

describe('PersonBasic', () => {
  let component: PersonBasic;
  let fixture: ComponentFixture<PersonBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
