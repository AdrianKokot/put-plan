import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimetableEntry } from 'src/app/shared/models/timetable-entry';

@Component({
  selector: 'app-timetable-column:not([string])',
  templateUrl: './timetable-column.component.html',
  styles: []
})
export class TimetableColumnComponent {
  @Input() items: (TimetableEntry | null)[] | null = [];
  @Output() showModelDetails: EventEmitter<TimetableEntry> = new EventEmitter<TimetableEntry>();

  trackBy(index: number, item: TimetableEntry | null): string|undefined {
    return item ? (item.name || undefined) : undefined;
  }

  public openClassDetails(item: TimetableEntry | null): void {
    if (item !== null) {
      this.showModelDetails.emit(item);
    }
  }

}
