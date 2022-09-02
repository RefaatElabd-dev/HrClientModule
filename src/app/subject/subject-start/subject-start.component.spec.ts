import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectStartComponent } from './subject-start.component';

describe('SubjectStartComponent', () => {
  let component: SubjectStartComponent;
  let fixture: ComponentFixture<SubjectStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
