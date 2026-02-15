import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBenifits } from './person-benifits';

describe('PersonBenifits', () => {
  let component: PersonBenifits;
  let fixture: ComponentFixture<PersonBenifits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonBenifits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonBenifits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
