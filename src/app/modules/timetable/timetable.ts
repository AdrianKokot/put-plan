function getWeekNumber(d: Date = new Date()): number {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

export class Timetable {
  public static readonly weekParityStorageKey = 'isweekparityreversed';
  public static WeekDays: string[] = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

  public static ClassesHours: string[] = [
    '8:00 - 9:30',
    '9:45 - 11:15',
    '11:45 - 13:15',
    '13:30 - 15:00',
    '15:10 - 16:40',
    '16:50 - 18:20',
    '18:30 - 20:00',
    '20:10 - 21:40'
  ]

  public static Groups: string[] = ['i3.1', 'i3.2']

  private static getCurrentDayIndex(): number {
    return (((new Date()).getDay() || 7) - 1);
  }

  private static getCurrentWeekDayIndex(): number {
    const currentDayIndex = Timetable.getCurrentDayIndex();
    return currentDayIndex < 5 ? currentDayIndex : 4;
  }

  public static isCurrentWeekEven(isWeekParityReversed:boolean): boolean {
    return (getWeekNumber() % 2 === 0) === !isWeekParityReversed;
  }

  public static currentDayIndex: number = Timetable.getCurrentDayIndex();
  public static currentWeekDayIndex: number = Timetable.getCurrentWeekDayIndex();
}
