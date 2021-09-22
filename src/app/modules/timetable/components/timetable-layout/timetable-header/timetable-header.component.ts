import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Timetable } from "../../../timetable";

@Component({
  selector: 'app-timetable-header',
  templateUrl: './timetable-header.component.html',
  styles: []
})
export class TimetableHeaderComponent {
  private _selectedWeekDayIndex!: number;

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  @Input()
  public set selectedWeekDayIndex(value: number) {
    this._selectedWeekDayIndex = value;
    console.log("SET!");
  }

  @Output() public selectedWeekDayIndexChange = new EventEmitter<number>();

  @ViewChild('timetableWeekDaysContainer') timetableWeekDaysContainer!: ElementRef;

  public weekDays = Timetable.WeekDays;

  public selectWeekDayIndex(index: number): void {
    if (window.innerWidth < 768) {
      this.selectedWeekDayIndexChange.emit(index);
    }
  }

}
