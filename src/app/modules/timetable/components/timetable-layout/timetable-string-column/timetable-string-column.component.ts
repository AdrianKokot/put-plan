import { Component, Input } from '@angular/core';
import { trackByIndex } from "../../../../../shared/functions/track-by";

@Component({
  selector: 'app-timetable-column[string]',
  templateUrl: './timetable-string-column.component.html',
  styles: []
})
export class TimetableStringColumnComponent {
  @Input() items: string[] = [];
  public trackBy = trackByIndex;
}
