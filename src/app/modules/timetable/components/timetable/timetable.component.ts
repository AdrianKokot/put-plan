import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { Lesson } from "../../../../shared/models/lesson";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {
  items: Lesson[] = [];
  selectedClass: Lesson = {} as Lesson;
  hours = this.lessonService.getHours();

  @ViewChild('classDetailsTemplate') classDetailsTemplate!: TemplateRef<any>;

  constructor(
    private lessonService: LessonService,
    private modalService: ModalService
  ) {
    this.lessonService.getAll().subscribe({
      next: (res) => {
        this.items = res;
      }
    });

    const monday = new Date();
    const todayIndex = ((monday.getDay() || 7) - 1);
    monday.setHours(-24 * todayIndex);

    for (let i = 0; i < 5; i++) {
      this.weekDays.push(
        monday.toLocaleString('pl-PL', {weekday: 'long'})
      );
      monday.setHours(+24);
    }

    console.log(todayIndex);
    this.selectedWeekDay = this.weekDays[todayIndex >= this.weekDays.length ? 0 : todayIndex];
  }

  public getItems(lesson_number: number): Lesson[] {
    let res = [];
    for (const day of [1, 2, 3, 4, 5]) {
      res.push(this.lessonService.getLesson(day, lesson_number))
    }
    return res;
  }

  public openClassDetailsModal(lesson: Lesson) {
    this.selectedClass = lesson;
    this.modalService.open(this.classDetailsTemplate);
  }

  public weekDays: string[] = [];
  public selectedWeekDay: string = '';
}
