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
}
