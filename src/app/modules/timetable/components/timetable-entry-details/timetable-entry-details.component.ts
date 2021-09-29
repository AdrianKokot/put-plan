import { Component, Input } from '@angular/core';
import { TimetableEntry } from '../../../../shared/models/timetable-entry';

@Component({
  selector: 'app-timetable-entry-details',
  templateUrl: './timetable-entry-details.component.html',
  styles: []
})
export class TimetableEntryDetailsComponent {
  @Input() modal!: { close: () => void };
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
    const result: { [key: string]: string|null } = {
      'Typ zajęć': entry.classType,
      'Prowadzący': entry.lecturer?.name && entry.lecturer?.url ? (`<a href="${entry.lecturer.url}" target="_blank" rel="noreferrer">${entry.lecturer.name}</a>`) : null,
      'Sala': entry?.location?.shortName || null,
      'Dodatkowe informacje': entry.additionalInfo && entry.additionalInfo.length > 0 ? entry.additionalInfo : null,
      'Grupy mające te zajęcia w tym czasie': entry.groups,
      'Linki': entry.links && entry.links.length > 0 ? entry.links.map(l => `<a href="${l.key}" target="_blank" rel="noreferrer">${l.label}</a>`).join('<br>') : null
    };

    return Object.keys(result)
      .reduce((obj, key) => {
        if (result[key] !== null) {
          obj[key] = result[key] as string;
        }
        return obj;
      }, {} as { [key: string]: string });
  }
}
