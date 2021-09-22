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

  public static getCurrentDayIndex(): number {
    return (((new Date()).getDay() || 7) - 1);
  }
}

