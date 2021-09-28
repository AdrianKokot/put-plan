// const getWeekDays = function (locale = 'pl-PL'): string[] {
//   let weekDays = [];
//
//   const monday = new Date();
//   monday.setHours(-24 * ((monday.getDay() || 7) - 1));
//
//   for (let i = 0; i < 5; i++) {
//     weekDays.push(
//       monday.toLocaleString(locale, {weekday: 'long'})
//     );
//     monday.setHours(+24);
//   }
//
//   return weekDays;
// }
//
// const getClassesHours = function (locale = 'pl-PL'): string[] {
//   let hours: string[] = [];
//
//   const breaks = [15, 30, 15, 10, 10, 10, 10];
//
//   const date = new Date();
//
//   date.setHours(8, 0);
//
//   let i = 0;
//
//   do {
//     let hourStr = date.toLocaleTimeString(locale, {minute: '2-digit', hour: 'numeric'});
//     hourStr += ' - ';
//
//     date.setMinutes(date.getMinutes() + 90);
//
//     hourStr += date.toLocaleTimeString(locale, {minute: '2-digit', hour: 'numeric'});
//
//     hours.push(hourStr);
//     date.setMinutes(date.getMinutes() + breaks[i]);
//     i++;
//   } while (i <= breaks.length)
//
//   hours.push();
//
//   return hours;
// }

import { isWeekParityReversed } from "../../../environments/timetable";

function getWeekNumber(d: any = new Date()): number {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

export class Timetable {
  public static WeekDays: string[] = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

  public static ClassesHours: string[] = [
    "8:00 - 9:30",
    "9:45 - 11:15",
    "11:45 - 13:15",
    "13:30 - 15:00",
    "15:10 - 16:40",
    "16:50 - 18:20",
    "18:30 - 20:00",
    "20:10 - 21:40"
  ]

  public static Groups: string[] = ["i3.1", "i3.2"]

  private static getCurrentDayIndex(): number {
    return (((new Date()).getDay() || 7) - 1);
  }

  private static getCurrentWeekDayIndex(): number {
    // TODO checking app settings to set weekend behavior
    const currentDayIndex = Timetable.getCurrentDayIndex();
    return currentDayIndex < 5 ? currentDayIndex : 4;
  }

  private static getIsCurrentWeekEven(): boolean {
    // TODO checking app settings to set weekend behavior
    return (getWeekNumber() % 2 === 0) === !isWeekParityReversed;
  }

  public static currentDayIndex: number = Timetable.getCurrentDayIndex();
  public static currentWeekDayIndex: number = Timetable.getCurrentWeekDayIndex();
  public static isCurrentWeekEven: boolean = Timetable.getIsCurrentWeekEven();
}


