import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovatorsdetailsComponent } from './innovatorsdetails.component';

describe('InnovatorsdetailsComponent', () => {
  let component: InnovatorsdetailsComponent;
  let fixture: ComponentFixture<InnovatorsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovatorsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovatorsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
