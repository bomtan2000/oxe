import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPasswordChangeComponent } from './tab-password-change.component';

describe('TabPasswordChangeComponent', () => {
  let component: TabPasswordChangeComponent;
  let fixture: ComponentFixture<TabPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPasswordChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
