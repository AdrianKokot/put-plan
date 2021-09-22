import { Component } from '@angular/core';
import { LessonService } from "../../../shared/services/lesson/lesson.service";
import { Timetable } from "../../../modules/timetable/timetable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  public headerTitle: string = 'Politechnika Poznańska';

  constructor(private lessonService: LessonService) {
  }

  public get isWeekEven(): boolean {
    return this.lessonService.isWeekEven
  }

  public get isSelectedWeekSameAsCurrentWeek() {
    return this.lessonService.isWeekEven === Timetable.isCurrentWeekEven;
  }

  public changeWeek() {
    this.lessonService.isWeekEven = !this.lessonService.isWeekEven;
  }
}
