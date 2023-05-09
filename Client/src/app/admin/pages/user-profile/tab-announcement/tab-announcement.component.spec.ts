import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAnnouncementComponent } from './tab-announcement.component';

describe('TabAnnouncementComponent', () => {
  let component: TabAnnouncementComponent;
  let fixture: ComponentFixture<TabAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
