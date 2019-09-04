import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsblogdetailsComponent } from './newsblogdetails.component';

describe('NewsblogdetailsComponent', () => {
  let component: NewsblogdetailsComponent;
  let fixture: ComponentFixture<NewsblogdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsblogdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsblogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
