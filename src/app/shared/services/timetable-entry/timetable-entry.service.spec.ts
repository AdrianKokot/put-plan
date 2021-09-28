import { TestBed } from '@angular/core/testing';

import { TimetableEntryService } from './timetable-entry.service';

describe('TimetableEntryService', () => {
  let service: TimetableEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
