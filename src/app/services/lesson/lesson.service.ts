import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import classes from 'src/assets/classes.json';
import groups from 'src/assets/groups.json';
import optionalClasses from 'src/assets/optional.json';
import hours from 'src/assets/hours.json';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private classes = new BehaviorSubject<Lesson[]>(classes as Lesson[]);
  private groups = new BehaviorSubject<string[]>(groups);
  private optionalClasses = new BehaviorSubject<string[]>(optionalClasses);
  private hours = hours;

  constructor() { }

  public getAll(): Observable<Lesson[]> {
    return this.classes.asObservable();
  }

  public getGroups(): Observable<string[]> {
    return this.groups.asObservable();
  }

  public getOptionalClasses(): Observable<string[]> {
    return this.optionalClasses.asObservable();
  }

  public getHours(): string[] {
    return this.hours;
  }

  public getLesson(day_number: number, lesson_number: number, optionalClasses: string[] = [], selectedGroup: string = '', isWeekEven: boolean = true): Lesson {
    let filtered = this.classes.value.map(x => {
      if (x.isOptional) {
        if (!optionalClasses.includes(x.name)) {
          return null;
        }
      }
      const occur = x.occurs.find(y => {
        if (y.day_number === day_number && y.lesson_number === lesson_number && y.groups.includes(selectedGroup)) {
          return (y.isEven === isWeekEven) || y.isBoth;
        }
        return false;
      });

      if (occur != null) {
        x = { ...x, ...occur };
        return x;
      }
      return null;
    }).filter(x => x != null);

    return filtered[0] || {} as Lesson;
  }
}
