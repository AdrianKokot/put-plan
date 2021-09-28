import { Injectable } from '@angular/core';
import { Timetable } from "../../../modules/timetable/timetable";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor() {
  }

  private _isSelectedWeekEven = Timetable.isCurrentWeekEven;

  public get isSelectedWeekEven(): boolean {
    return this._isSelectedWeekEven;
  }

  public get isSelectedWeekSameAsCurrentWeek(): boolean {
    return this._isSelectedWeekEven === Timetable.isCurrentWeekEven;
  }

  public changeWeek(): void {
    this._isSelectedWeekEven = !this._isSelectedWeekEven;
  }
}
