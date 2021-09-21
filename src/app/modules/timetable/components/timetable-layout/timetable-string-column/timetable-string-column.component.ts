import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timetable-column[string]',
  templateUrl: './timetable-string-column.component.html',
  styles: []
})
export class TimetableStringColumnComponent {
  @Input() items: string[] = [];
}
