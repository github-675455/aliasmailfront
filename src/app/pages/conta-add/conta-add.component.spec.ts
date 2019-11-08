import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaAddComponent } from './conta-add.component';

describe('ContaAddComponent', () => {
  let component: ContaAddComponent;
  let fixture: ComponentFixture<ContaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
