import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableStringColumnComponent } from './timetable-string-column.component';

describe('TimetableStringColumnComponent', () => {
  let component: TimetableStringColumnComponent;
  let fixture: ComponentFixture<TimetableStringColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableStringColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableStringColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
