import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenu } from './sidebar';

describe('MainMenu', () => {
  let component: MainMenu;
  let fixture: ComponentFixture<MainMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
