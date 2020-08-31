import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoDialogComponent } from './edit-user-info-dialog.component';

describe('EditUserInfoDialogComponent', () => {
  let component: EditUserInfoDialogComponent;
  let fixture: ComponentFixture<EditUserInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
