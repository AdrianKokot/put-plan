import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { Lesson } from "../../../../../shared/models/lesson";
import { LessonService } from "../../../../../shared/services/lesson/lesson.service";
import { Timetable } from "../../../timetable";
import { fromEvent } from "rxjs";
import { elementAt, filter, switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-timetable-body',
  templateUrl: './timetable-body.component.html',
  styles: [`
    #timetableColumnsContainer {
      transform: translateX(calc(var(--selected-weekday-index, 0) / 5 * -100%));
      transition: transform calc(var(--weekday-transition-multiplier, 0) * 0.35s) ease-in-out;
    }`]
})
export class TimetableBodyComponent {
  private currentWeekDayIndex = Timetable.currentWeekDayIndex;

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.currentWeekDayIndex !== this.selectedWeekDayIndex) {
      this.selectedWeekDayIndexChange.emit(this.currentWeekDayIndex);
    }
  }

  private _selectedWeekDayIndex!: number;

  @Input()
  public set selectedWeekDayIndex(index: number) {
    this.document.body.style.setProperty('--weekday-transition-multiplier', '' + Math.log2(Math.abs(this.selectedWeekDayIndex - index) + 1));

    this._selectedWeekDayIndex = index;

    this.document.body.style.setProperty('--selected-weekday-index', '' + this.selectedWeekDayIndex);
  }

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  @Output() public selectedWeekDayIndexChange = new EventEmitter<number>();

  public selectedItem: Lesson = {} as Lesson;
  public hours = Timetable.ClassesHours;

  constructor(
    private lessonService: LessonService,
    @Inject(DOCUMENT) private document: Document,
    elementRef: ElementRef) {

    const hammerPan = new Hammer(elementRef.nativeElement, {recognizers: [[Hammer.Pan, {direction: Hammer.DIRECTION_ALL}]]});

    // @ts-ignore
    const pan = fromEvent<HammerInput>(hammerPan, 'panleft panright');

    // @ts-ignore
    fromEvent<HammerInput>(hammerPan, 'panstart')
      .pipe(
        switchMap(() => pan
          .pipe(
            filter((e: any) => Math.abs(e.deltaX) / window.innerWidth > .1),
            elementAt(1),
            tap((e: HammerInput) => {

              if (e.direction === Hammer.DIRECTION_LEFT) {
                this.nextDay();
              } else {
                this.previousDay();
              }

            })
          ))
      )
      .subscribe();
  }

  public getClassesForWeekDay(weekDayIndex: number): Lesson[] {
    let res = [];

    for (let lesson_number = 1; lesson_number <= this.hours.length; lesson_number++) {
      res.push(this.lessonService.getLesson(weekDayIndex + 1, lesson_number))
    }

    return res;
  }

  private nextDay(): void {
    if (this.selectedWeekDayIndex + 1 < Timetable.WeekDays.length) {
      this.selectedWeekDayIndexChange.emit(this.selectedWeekDayIndex + 1);
    }
  }

  private previousDay(): void {
    if (this.selectedWeekDayIndex > 0) {
      this.selectedWeekDayIndexChange.emit(this.selectedWeekDayIndex - 1);
    }
  }
}
