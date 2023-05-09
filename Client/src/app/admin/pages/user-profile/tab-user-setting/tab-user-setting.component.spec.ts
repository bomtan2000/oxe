import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUserSettingComponent } from './tab-user-setting.component';

describe('TabUserSettingComponent', () => {
  let component: TabUserSettingComponent;
  let fixture: ComponentFixture<TabUserSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
