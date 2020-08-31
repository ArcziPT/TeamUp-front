import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPostingDialogComponent } from './create-job-posting-dialog.component';

describe('CreateJobPostingDialogComponent', () => {
  let component: CreateJobPostingDialogComponent;
  let fixture: ComponentFixture<CreateJobPostingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobPostingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobPostingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
