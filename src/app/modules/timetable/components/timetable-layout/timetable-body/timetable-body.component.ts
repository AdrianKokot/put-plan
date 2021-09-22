import {
  Component,
  EventEmitter, HostListener, Inject,
  Input, Output
} from '@angular/core';
import { Lesson } from "../../../../../shared/models/lesson";
import { Timetable } from "../../../timetable";
import { LessonService } from "../../../../../shared/services/lesson/lesson.service";
import { DOCUMENT } from "@angular/common";

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
  private currentDayIndex = Timetable.getCurrentDayIndex();

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.currentDayIndex !== this.selectedWeekDayIndex) {
      this.selectedWeekDayIndexChange.emit(this.currentDayIndex);
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
    @Inject(DOCUMENT) private document: Document) {
  }

  public getClassesForWeekDay(weekDayIndex: number): Lesson[] {
    let res = [];

    for (let lesson_number = 1; lesson_number <= this.hours.length; lesson_number++) {
      res.push(this.lessonService.getLesson(weekDayIndex + 1, lesson_number))
    }

    return res;
  }

}
