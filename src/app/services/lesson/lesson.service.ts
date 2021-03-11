import { isWeekParityReversed } from 'src/environments/timetable';
import { Preferences } from 'src/app/models/preferences';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import classes from 'src/assets/classes.json';
import groups from 'src/assets/groups.json';
import optionalClasses from 'src/assets/optional.json';
import hours from 'src/assets/hours.json';
import languageClasses from 'src/assets/language-classes.json';


function getWeekNumber(d: any = new Date()) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private classes = new BehaviorSubject<Lesson[]>(classes as Lesson[]);
  private groups = new BehaviorSubject<string[]>(groups);
  private optionalClasses = new BehaviorSubject<string[]>(optionalClasses);
  private languageClasses = new BehaviorSubject<string[]>(languageClasses);
  private hours = hours;
  public isWeekEven = (getWeekNumber() % 2 == 0) === !isWeekParityReversed;

  public preferences: Preferences = {
    selectedGroup: localStorage.getItem('selectedGroup') || '',
    selectedOptionalClasses: localStorage.getItem('selectedOptionalClasses')?.split(':') || [],
    selectedLanguageClass: localStorage.getItem('selectedLanguageClass') || ''
  };

  public savePreferencesInStorage() {
    const { selectedGroup, selectedOptionalClasses, selectedLanguageClass } = this.preferences;
    localStorage.setItem('selectedGroup', selectedGroup);
    localStorage.setItem('selectedOptionalClasses', selectedOptionalClasses.join(':'));
    localStorage.setItem('selectedLanguageClass', selectedLanguageClass);
  }

  public getAll(): Observable<Lesson[]> {
    return this.classes.asObservable();
  }

  public getGroups(): Observable<string[]> {
    return this.groups.asObservable();
  }

  public getLanguagesClasses(): Observable<string[]> {
    return this.languageClasses.asObservable();
  }

  public getOptionalClasses(): Observable<string[]> {
    return this.optionalClasses.asObservable();
  }

  public getHours(): string[] {
    return this.hours;
  }

  public getLesson(day_number: number, lesson_number: number): Lesson {
    let filtered = this.classes.value.map(x => {
      if (x.isOptional) {
        if (!this.preferences.selectedOptionalClasses.includes(x.name)) {
          return null;
        }
      }
      const occur = x.occurs.find(y => {
        if (y.day_number === day_number && y.lesson_number === lesson_number && (y.groups.includes(this.preferences.selectedGroup) || y.groups.includes(this.preferences.selectedLanguageClass))) {
          return (y.isEven === this.isWeekEven) || y.isBoth;
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
