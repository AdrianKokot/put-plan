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

    this.selectedWeekDay = this.weekDays[todayIndex >= this.weekDays.length ? 0 : todayIndex];
  }

  public getItems(weekDay: string): Lesson[] {
    const day = this.weekDays.findIndex(x => x === weekDay) + 1;

    let res = [];

    for(let lesson_number = 1; lesson_number <= this.hours.length; lesson_number++){
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
