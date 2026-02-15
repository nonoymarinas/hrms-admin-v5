import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMain } from './record-main';

describe('RecordMain', () => {
  let component: RecordMain;
  let fixture: ComponentFixture<RecordMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
