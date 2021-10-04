import { LabeledProperty } from '../types/labeled-property';

export interface TimetableEntry {
  isOptional: boolean;
  name: string;
  shortName: string;
  class: string;
  classType: string;
  hourIndex: number;
  weekdayIndex: number;
  weekType: string;
  location: TimetableEntryLocation;
  lecturer: TimetableEntryLecturer;
  additionalInfo: string;
  links: LabeledProperty<string>[];
  groups: string;
}

export interface TimetableEntryLocation {
  gmaps: string;
  name: string;
  shortName: string;
  address: string;
}

export interface TimetableEntryLecturer {
  emails: string[];
  name: string;
  url: string;
}
