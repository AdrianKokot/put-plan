import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trackByField } from "../../../../../shared/functions/track-by";
import { TimetableEntry } from "../../../../../shared/models/timetable-entry";

@Component({
  selector: 'app-timetable-column:not([string])',
  templateUrl: './timetable-column.component.html',
  styles: []
})
export class TimetableColumnComponent {
  @Input() items: (TimetableEntry | null)[] = [];
  @Output() showModelDetails: EventEmitter<TimetableEntry> = new EventEmitter<TimetableEntry>();
  trackBy = trackByField('name');

  public openClassDetails(item: TimetableEntry | null): void {
    if (item !== null) {
      this.showModelDetails.emit(item);
    }
  }

}
