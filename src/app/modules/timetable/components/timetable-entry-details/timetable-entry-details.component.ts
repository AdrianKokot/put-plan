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
      this.mapTimetableEntry(value);
    }
  }

  get selectedItem(): TimetableEntry | null {
    return this._selectedItem;
  }

  private _selectedItem: TimetableEntry | null = null;

  public mappedObject: { [key: string]: string } = {};

  private mapTimetableEntry(entry: TimetableEntry): void {

    const entryDetails: { [key: string]: string | null } = {
      'Typ zajęć': entry.classType,
      'Prowadzący': entry.lecturer?.name && entry.lecturer?.url ? (`<a href="${entry.lecturer.url}" target="_blank" rel="noreferrer">${entry.lecturer.name}</a>`) : null,
      'Sala': entry?.location?.shortName || null,
      'Dodatkowe informacje': entry.additionalInfo && entry.additionalInfo.length > 0 ? entry.additionalInfo : null,
      'Grupy mające te zajęcia w tym czasie': entry.groups,
      'Linki': entry.links && entry.links.length > 0 ? entry.links.map(l => `<a href="${l.key}" target="_blank" rel="noreferrer">${l.label}</a>`).join('<br>') : null
    };

    this.mappedObject = Object.keys(entryDetails)
      .reduce((obj, key) => {
        if (entryDetails[key] !== null) {
          obj[key] = entryDetails[key] as string;
        }
        return obj;
      }, {} as { [key: string]: string });
  }

  public entryDetailsMode: 'location' | 'lecturer' | '' = '';

  public showDetails(key: string): void {
    if (key === 'Sala') {
      this.entryDetailsMode = 'location';
    } else if (key === 'Prowadzący') {
      this.entryDetailsMode = 'lecturer';
    }
  }

  public hideDetails(): void {
    this.entryDetailsMode = '';
  }
}
