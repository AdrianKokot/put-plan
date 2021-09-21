import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableEntryDetailsComponent } from './timetable-entry-details.component';

describe('TimetableEntryDetailsComponent', () => {
  let component: TimetableEntryDetailsComponent;
  let fixture: ComponentFixture<TimetableEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableEntryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
