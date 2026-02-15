import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMain } from './person-main';

describe('PersonMain', () => {
  let component: PersonMain;
  let fixture: ComponentFixture<PersonMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
