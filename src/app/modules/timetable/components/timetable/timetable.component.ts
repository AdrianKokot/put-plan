import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { Lesson } from "../../../../shared/models/lesson";
import { fromEvent } from "rxjs";
import { debounceTime, map, tap } from "rxjs/operators";
import { SwipeEvent } from "../../../../shared/directives/swipe/swipe";

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
    this.isMobile$.subscribe();

    this.lessonService.getAll().subscribe({
      next: (res) => {
        this.items = res;
      }
    });

    const monday = new Date();
    monday.setHours(-24 * ((monday.getDay() || 7) - 1));

    for (let i = 0; i < 5; i++) {
      this.weekDays.push(
        monday.toLocaleString('pl-PL', {weekday: 'long'})
      );
      monday.setHours(+24);
    }

    this.selectCurrentWeekDay();
  }

  private selectCurrentWeekDay(): void {
    const todayIndex = (((new Date()).getDay() || 7) - 1);
    this.selectedWeekDay = this.weekDays[todayIndex >= this.weekDays.length ? 0 : todayIndex];
  }

  public isMobile: boolean = window.innerWidth < 768;

  public isMobile$ = fromEvent(window, 'resize')
    .pipe(
      debounceTime(50),
      map(() => window.innerWidth < 768),
      tap(x => {
        console.log('resize!');
        this.isMobile = x;
        this.selectCurrentWeekDay();
      })
    );


  public getItems(weekDay: string): Lesson[] {
    const day = this.weekDays.findIndex(x => x === weekDay) + 1;

    let res = [];

    for (let lesson_number = 1; lesson_number <= this.hours.length; lesson_number++) {
      res.push(this.lessonService.getLesson(day, lesson_number))
    }

    return res;
  }

  public openClassDetailsModal(lesson: Lesson) {
    this.selectedClass = lesson;
    this.modalService.open(this.classDetailsTemplate);
  }

  public weekDays: string[] = [];
  // public selectedWeekDay: string = '';

  private _selectedWeedDay: string = '';

  public get selectedWeekDay(): string {
    return this._selectedWeedDay;
  }

  public set selectedWeekDay(value: string) {
    this._selectedWeedDay = value;
    this.selectedWeekDayIndex = this.weekDays.findIndex(x => x === value);
  }

  public selectedWeekDayIndex: number = 0;

  public swipe(event: SwipeEvent): void {
    console.log(event);
  }
}