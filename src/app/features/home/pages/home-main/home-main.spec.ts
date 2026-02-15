import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMain } from './home-main';

describe('HomeMain', () => {
  let component: HomeMain;
  let fixture: ComponentFixture<HomeMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
