import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlEditComponent } from './url-edit.component';

describe('UrlEditComponent', () => {
  let component: UrlEditComponent;
  let fixture: ComponentFixture<UrlEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
