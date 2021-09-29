import { Component } from '@angular/core';
import { Timetable } from './timetable';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styles: []
})
export class TimetableComponent {
  private _selectedWeekDayIndex: number = Timetable.currentWeekDayIndex;

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  public set selectedWeekDayIndex(index: number) {
    this._selectedWeekDayIndex = index;
  }
}
