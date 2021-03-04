import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {
  @Input() selectedGroup: string = '';
  @Input() selectedOptionalClasses: string[] = [];
  @Input() isWeekEven: boolean = false;

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
      res.push(this.getItem(day, lesson_number))
    }
    return res;
  }

  private getItem(day_number: number, lesson_number: number): Lesson {
    return this.lessonService.getLesson(day_number, lesson_number, this.selectedOptionalClasses, this.selectedGroup, this.isWeekEven);
  }

  public openClassDetailsModal(lesson: Lesson) {
    this.selectedClass = lesson;
    this.modalService.open(this.classDetailsTemplate);
  }
}
