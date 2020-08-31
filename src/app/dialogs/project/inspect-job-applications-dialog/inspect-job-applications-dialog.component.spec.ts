import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectJobApplicationsDialogComponent } from './inspect-job-applications-dialog.component';

describe('InspectJobApplicationsDialogComponent', () => {
  let component: InspectJobApplicationsDialogComponent;
  let fixture: ComponentFixture<InspectJobApplicationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectJobApplicationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectJobApplicationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
