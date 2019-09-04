import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutwarangalComponent } from './aboutwarangal.component';

describe('AboutwarangalComponent', () => {
  let component: AboutwarangalComponent;
  let fixture: ComponentFixture<AboutwarangalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutwarangalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutwarangalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
