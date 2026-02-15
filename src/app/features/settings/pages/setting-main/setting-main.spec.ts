import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMain } from './setting-main';

describe('SettingMain', () => {
  let component: SettingMain;
  let fixture: ComponentFixture<SettingMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
