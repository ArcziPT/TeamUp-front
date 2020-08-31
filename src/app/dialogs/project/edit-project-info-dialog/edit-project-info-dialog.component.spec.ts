import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectInfoDialogComponent } from './edit-project-info-dialog.component';

describe('EditProjectInfoDialogComponent', () => {
  let component: EditProjectInfoDialogComponent;
  let fixture: ComponentFixture<EditProjectInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
