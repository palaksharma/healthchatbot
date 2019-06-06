import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedshiftComponent } from './redshift.component';

describe('RedshiftComponent', () => {
  let component: RedshiftComponent;
  let fixture: ComponentFixture<RedshiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedshiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
