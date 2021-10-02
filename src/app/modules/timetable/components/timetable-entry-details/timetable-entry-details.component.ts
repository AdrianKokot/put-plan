import { Component, Input } from '@angular/core';
import { TimetableEntry } from '../../../../shared/models/timetable-entry';
import { TimetableEntryDetailToDisplay } from './timetable-entry-detail-to-display';


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

  public detailsToDisplay: TimetableEntryDetailToDisplay[] = [];

  private mapTimetableEntry(entry: TimetableEntry): void {

    this.detailsToDisplay = [
      {label: 'Typ zajęć', value: entry.classType},
      {
        label: 'Prowadzący',
        value: entry.lecturer?.name || null,
        click: () => this.showExtendedDetails('lecturer')
      },
      {
        label: 'Sala',
        value: entry.location?.shortName || null,
        click: () => this.showExtendedDetails('location')
      },
      {label: 'Dodatkowe informacje', value: entry.additionalInfo.length > 0 ? entry.additionalInfo : null},
      {label: 'Grupy mające te zajęcia w tym czasie', value: entry.groups},
      {
        label: 'Linki',
        value: entry.links && entry.links.length > 0 ? entry.links.map(l => `<a href='${l.key}' target='_blank' rel='noreferrer'>${l.label}</a>`).join('<br>') : null
      }
    ].filter(x => x.value !== null) as TimetableEntryDetailToDisplay[];

  }

  private showExtendedDetails(key: 'location' | 'lecturer'): void {
    this.entryDetailsMode = key;
    this.areDetailsExtended = true;
  }

  public areDetailsExtended = false;

  public entryDetailsMode: 'location' | 'lecturer' | '' = '';

  public hideDetails(): void {
    this.areDetailsExtended = false;
  }
}
