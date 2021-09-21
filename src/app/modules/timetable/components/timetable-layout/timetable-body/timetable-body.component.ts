import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { Lesson } from "../../../../../shared/models/lesson";
import { Timetable } from "../../../timetable";
import { LessonService } from "../../../../../shared/services/lesson/lesson.service";
import { fromEvent, Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-timetable-body',
  templateUrl: './timetable-body.component.html',
  styles: []
})
export class TimetableBodyComponent implements AfterViewInit, OnDestroy {

  @ViewChild('timetableColumnsContainer') columnsContainer!: ElementRef;

  private _selectedWeekDayIndex!: number;

  @Input()
  public set selectedWeekDayIndex(index: number) {
    this._selectedWeekDayIndex = index;

    this.columnsContainer && this.updateContainerScrollLeft();
  }

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  @Output() public selectedWeekDayIndexChange = new EventEmitter<number>();

  public selectedItem: Lesson = {} as Lesson;
  public hours = Timetable.ClassesHours;

  private HTMLColumnsContainerWidth: number = 0;
  private HTMLColumnsContainer!: HTMLElement;

  private resizeEventSubscription: Subscription = fromEvent(this.document, 'resize')
    .subscribe(() => {
      this.HTMLColumnsContainer && (this.HTMLColumnsContainerWidth = this.HTMLColumnsContainer.getBoundingClientRect().width);
    });

  constructor(
    private lessonService: LessonService,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit(): void {
    this.HTMLColumnsContainer = this.columnsContainer.nativeElement;
    this.HTMLColumnsContainerWidth = this.HTMLColumnsContainer.getBoundingClientRect().width;
    this.updateContainerScrollLeft(false);
  }

  ngOnDestroy(): void {
    this.resizeEventSubscription.unsubscribe();
  }

  public getClassesForWeekDay(weekDayIndex: number): Lesson[] {
    let res = [];

    for (let lesson_number = 1; lesson_number <= this.hours.length; lesson_number++) {
      res.push(this.lessonService.getLesson(weekDayIndex + 1, lesson_number))
    }

    return res;
  }

  private updateContainerScrollLeft(displayAnimation = true): void {
    displayAnimation || this.HTMLColumnsContainer.classList.toggle('scroll-smooth');
    this.HTMLColumnsContainer.scrollLeft = this.selectedWeekDayIndex * this.HTMLColumnsContainerWidth;
    displayAnimation || this.HTMLColumnsContainer.classList.toggle('scroll-smooth');
  }

}
