import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaModalAddComponent } from './conta-modal-add.component';

describe('ContaModalAddComponent', () => {
  let component: ContaModalAddComponent;
  let fixture: ComponentFixture<ContaModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
