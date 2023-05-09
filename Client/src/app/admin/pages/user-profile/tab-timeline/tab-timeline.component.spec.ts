import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTimelineComponent } from './tab-timeline.component';

describe('TabTimelineComponent', () => {
  let component: TabTimelineComponent;
  let fixture: ComponentFixture<TabTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
