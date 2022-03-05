import { TimetableEntryLecturer, TimetableEntryLocation } from '../../models/timetable-entry';
import { LabeledProperty } from '../../types/labeled-property';

export class TimetableStorage {
  private static appStorageKey = 'app.timetablestorage';

  public static saveDbDataToStorage(data: TimetableData | null): void {
    localStorage.setItem(this.appStorageKey, JSON.stringify(data));
  }

  public static getDbDataFromStorage(): TimetableData | null {
    if (Object.keys(localStorage).includes(this.appStorageKey)) {
      return JSON.parse(localStorage.getItem(this.appStorageKey) || '{}') as TimetableData;
    }
    return null;
  }
}

export interface TimetableData {
  classes: { isOptional: boolean, name: string, shortName: string, class: string, occurrences: { classType: string, hourIndex: number, weekdayIndex: number, weekType: string, location: string, lecturer: string, additionalInfo: string, links: LabeledProperty<string>[], groups: string }[] }[];
  locations: { [key: string]: TimetableEntryLocation };
  lecturers: { [key: string]: TimetableEntryLecturer };
  version: string;
  optionalClasses: LabeledProperty<string>[];
  languageClasses: LabeledProperty<string>[];
  groups: string[];
  isWeekParityReversed: boolean;
}
