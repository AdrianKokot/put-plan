import { Component, Input } from '@angular/core';
import { TimetableEntry } from '../../../../shared/models/timetable-entry';

@Component({
  selector: 'app-timetable-entry-details',
  templateUrl: './timetable-entry-details.component.html',
  styles: []
})
export class TimetableEntryDetailsComponent {
  @Input()
  set selectedItem(value: TimetableEntry | null) {
    this._selectedItem = value;

    if (value !== null) {
      this.mappedObject = this.mapTimetableEntry(value);
    }
  }

  get selectedItem(): TimetableEntry | null {
    return this._selectedItem;
  }

  private _selectedItem: TimetableEntry | null = null;


  public mappedObject: { [key: string]: string } = {};

  public get mappedObjectKeys(): string[] {
    return Object.keys(this.mappedObject);
  }

  private mapTimetableEntry(entry: TimetableEntry): { [key: string]: string } {
    const result: { [key: string]: any } = {
      'Prowadzący': entry.lecturer?.name && entry.lecturer?.url ? (`<a href="${entry.lecturer.url}" target="_blank">${entry.lecturer.name}</a>`) : null,
      'Typ zajęć': entry.classType,
      'Grupy mające te zajęcia w tym czasie': entry.groups
    };

    return Object.keys(result)
      .reduce((obj, key) => {
        if (result[key]) {
          obj[key] = result[key]
        }
        return obj;
      }, {} as { [key: string]: any });
  }
}
