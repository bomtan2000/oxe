import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUserProfileComponent } from './tab-user-profile.component';

describe('TabUserProfileComponent', () => {
  let component: TabUserProfileComponent;
  let fixture: ComponentFixture<TabUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
