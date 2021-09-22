import { Component } from '@angular/core';
import { LessonService } from "../../../shared/services/lesson/lesson.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {

  constructor(private lessonService: LessonService) {
  }

  public changeWeekParity(): void {
    this.lessonService.isWeekEven = !this.lessonService;
  }

  public get isWeekEven(): boolean {
    return this.lessonService.isWeekEven;
  }
}
