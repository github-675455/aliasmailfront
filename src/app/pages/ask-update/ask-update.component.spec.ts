import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskUpdateComponent } from './ask-update.component';

describe('AskUpdateComponent', () => {
  let component: AskUpdateComponent;
  let fixture: ComponentFixture<AskUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
