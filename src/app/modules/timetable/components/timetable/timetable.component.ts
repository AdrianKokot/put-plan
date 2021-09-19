import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { Lesson } from "../../../../shared/models/lesson";
import { fromEvent } from "rxjs";
import { debounceTime, map, tap } from "rxjs/operators";
import { SwipeEvent } from "../../../../shared/directives/swipe/swipe";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableComponent {
  items: Lesson[] = [];
  selectedClass: Lesson = {} as Lesson;
  hours = this.lessonService.getHours();

  @ViewChild('classDetailsTemplate') classDetailsTemplate!: TemplateRef<any>;

  constructor(
    private lessonService: LessonService,
    private modalService: ModalService,
    private elementRef: ElementRef
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

  private _selectedWeekDay: string = '';

  public get selectedWeekDay(): string {
    return this._selectedWeekDay;
  }

  public set selectedWeekDay(value: string) {
    this._selectedWeekDay = value;
    this.selectedWeekDayIndex = this.weekDays.findIndex(x => x === value);
    // this.setSwipeableTemplateStyles();
    // this.setSwipeTransformTemplate();

    if (!this.isSwipeLocked) {
      this.elementRef.nativeElement.style.setProperty('--selected-weekday-index', this.selectedWeekDayIndex);
    }
  }


  public selectedWeekDayIndex: number = 0;


  private isSwipeLocked = false;

  public swipeEnd(event: SwipeEvent): void {
    if (event.axis === 'y') {
      return;
    }

    this.moveContiunes = false;
    this.transformMove(event);
    // this.isSwipeLocked = false;
    // if (this.swipeTransformTemplate) {
    this.selectedWeekDay = this.selectedWeekDay;
    // this.swipeTransformTemplate.nativeElement/.style.setProperty('--selected-weekday-index', this.selectedWeekDayIndex);
    // }
  }

  private nextDay(): void {
    if (this.selectedWeekDayIndex < this.weekDays.length) {
      this.selectedWeekDay = this.weekDays[this.selectedWeekDayIndex + 1];
    }
  }

  private previousDay(): void {
    if (this.selectedWeekDayIndex > 0) {
      this.selectedWeekDay = this.weekDays[this.selectedWeekDayIndex - 1];
    }
  }

  @ViewChild('swipeTransformElement') swipeTransformTemplate!: ElementRef;

  private transformLock(): void {
    this.isSwipeLocked = true;
    // this.elementRef.nativeElement.style.transition = 'none';
    this.elementRef.nativeElement.classList.remove('touch-smooth-transition');
  }

  private transformMove(event: SwipeEvent): void {
    if (this.isSwipeLocked) {

      if ((event.direction === 'right' && this.selectedWeekDayIndex > 0) || (event.direction === 'left' && this.selectedWeekDayIndex + 1 < this.weekDays.length)) {

        if (event.distance / window.innerWidth > 0.2) {

          if (event.direction === 'right') {
            this.previousDay();
          } else {
            this.nextDay();
          }
        }
      }

      this.setSwipeTransformTemplate(0, (1 + +(Math.round(event.delta) / window.innerWidth).toFixed(2)), true);
      this.isSwipeLocked = false;
    }
  }

  private setSwipeTransformTemplate(touchTransform?: number, touchTransformed?: number, transition?: boolean): void {
    // if (this.swipeTransformTemplate) {

    if (touchTransform !== undefined) {
      this.elementRef.nativeElement.style.setProperty(`--touch-transform`, `${touchTransform}px`);
    }
    if (touchTransformed !== undefined) {
      this.elementRef.nativeElement.style.setProperty('--touch-transformed', touchTransformed);
    }

    if (transition !== undefined) {
      this.elementRef.nativeElement.classList.toggle('touch-smooth-transition', transition);
      // this.elementRef.nativeElement.style.transition = transition ? 'transform calc(var(--touch-transformed, 1)*.3s) ease-out' : 'none';
    }

    // }
  }

  private transformDrag(event: SwipeEvent): void {
    if (this.isSwipeLocked) {
      this.setSwipeTransformTemplate(-1 * Math.round(event.delta));
      // this.elementRef.nativeElement.style.setProperty('--touch-transform', `${-1 * Math.round(event.delta)}px`);

      // this.setSwipeableTemplateStyles(-1 * Math.round(event.delta));

    }
  }

  private moveContiunes = false;

  public swipeMove(event: SwipeEvent): void {
    if (event.axis === 'y') {
      return;
    }

    if (this.moveContiunes) {
      this.transformDrag(event);
    } else {
      this.transformLock();
    }
    this.moveContiunes = true;

  }

  // private setSwipeableTemplateStyles(transform: number = 0): void {
  //   if (this.swipeTransformTemplate) {
  //     console.log(transform);
  //     // this.elementRef.nativeElement.style.transform = 'translateX(calc(var(--selected-weekday-index, 0) / 5 * -100% + var(--touch-transform, 0px)))';
  //     // if (transform > 0) {
  //     this.elementRef.nativeElement.style.setProperty('--touch-transform', `${transform}px`);
  //     this.elementRef.nativeElement.style.setProperty('--touch-transformed', (1 - +(transform / window.innerWidth).toFixed(2)));
  //     this.elementRef.nativeElement.style.setProperty('--selected-weekday-index', this.selectedWeekDayIndex);
  //     // this.elementRef.nativeElement.classList.toggle('', )
  //     // this.elementRef.nativeElement.style.setProperty = this.isSwipeLocked ? 'transform calc(var(--f, 1)*.3s) ease-out' : '';
  //     //   this.elementRef.nativeElement.style.transition = 'transform .3s ease-out';
  //     // } else {
  //     //   this.elementRef.nativeElement.style.transition = 'none';
  //     //   this.elementRef.nativeElement.style.setProperty('--touch-transform', `-${transform}px`);
  //     // }
  //   }
  // }
}
