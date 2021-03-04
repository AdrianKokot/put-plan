import { Component, Input } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styles: ['']
})
export class LessonDetailsComponent {
  @Input() selectedClass: Lesson = {} as Lesson;
  @Input() modal: { close: () => {} } | null = null;
}
