import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationForgetPasswordComponent } from './notification-forget-password.component';

describe('NotificationForgetPasswordComponent', () => {
  let component: NotificationForgetPasswordComponent;
  let fixture: ComponentFixture<NotificationForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
