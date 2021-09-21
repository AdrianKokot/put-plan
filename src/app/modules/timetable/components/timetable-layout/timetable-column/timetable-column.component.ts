import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from "../../../../../shared/models/lesson";

@Component({
  selector: 'app-timetable-column:not([string])',
  templateUrl: './timetable-column.component.html',
  styles: []
})
export class TimetableColumnComponent {
  @Input() items: Lesson[] = [];
  @Output() showModelDetails: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  public openClassDetails(lesson: Lesson): void {
    this.showModelDetails.emit(lesson);
  }

}
