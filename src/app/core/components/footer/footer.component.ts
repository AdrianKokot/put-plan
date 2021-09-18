import { Component } from '@angular/core';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {
  lastUpdate = this.lessonService.getDataVersion();

  constructor(private lessonService: LessonService) { }

  public refresh(): void {
    window.location.reload();
  }
}
