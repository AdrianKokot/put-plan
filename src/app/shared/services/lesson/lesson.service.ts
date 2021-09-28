import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Observable } from 'rxjs';
// @ts-ignore
import { Timetable } from "../../../modules/timetable/timetable";
import { Lesson } from "../../models/lesson";
import { Preferences } from "../../models/preferences";


@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private storageData:
    { classes: Lesson[], groups: string[], optionalClasses: string[], languageClasses: string[], hours: string[], lastChange: string }
    = JSON.parse((localStorage.getItem('put-plan-data') || '{}'));

  private classes = new BehaviorSubject<Lesson[]>(this.storageData.classes as Lesson[]);
  private groups = new BehaviorSubject<string[]>(this.storageData.groups);
  private optionalClasses = new BehaviorSubject<string[]>(this.storageData.optionalClasses);
  private languageClasses = new BehaviorSubject<string[]>(this.storageData.languageClasses);
  private lastChange = new BehaviorSubject<string>(this.storageData.lastChange);
  private hours = this.storageData.hours || Timetable.ClassesHours;

  public isWeekEven = Timetable.isCurrentWeekEven;

  public preferences: Preferences = {
    selectedGroup: localStorage.getItem('selectedGroup') || '',
    selectedOptionalClasses: localStorage.getItem('selectedOptionalClasses')?.split(':') || [],
    selectedLanguageClass: localStorage.getItem('selectedLanguageClass') || ''
  };

  constructor(private database: AngularFireDatabase) {
    this.database.database.goOffline();
    if (this.storageData.classes) {
      this.database.database.goOnline();
      // @ts-ignore
      this.database.database.ref('lastChange').get().then(x => {
        this.database.database.goOffline();
        if (x.val() !== this.storageData.lastChange) {
          this.getDataFromFirebaseDatabase();
        }
      });
    } else {
      this.getDataFromFirebaseDatabase();
    }
  }

  private getDataFromFirebaseDatabase(): void {
    this.database.database.goOnline();
    // @ts-ignore
    this.database.database.ref().get().then(x => {
      this.storageData = x.val();
      localStorage.setItem('put-plan-data', JSON.stringify(this.storageData));

      this.classes.next(this.storageData.classes);
      this.groups.next(this.storageData.groups);
      this.optionalClasses.next(this.storageData.optionalClasses);
      this.languageClasses.next(this.storageData.languageClasses);

      this.database.database.goOffline();
    });
  }

  public savePreferencesInStorage(): void {
    const {selectedGroup, selectedOptionalClasses, selectedLanguageClass} = this.preferences;
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

  public getDataVersion(): Observable<string> {
    return this.lastChange.asObservable();
  }

  public getLesson(dayNumber: number, lessonNumber: number): Lesson {
    const filtered = this.classes.value.map(x => {
      if (x.isOptional) {
        if (!this.preferences.selectedOptionalClasses.includes(x.name)) {
          return null;
        }
      }
      const occur = x.occurs.find(y => {
        if (
          y.day_number === dayNumber
          && y.lesson_number === lessonNumber
          && (
            y.groups.includes(this.preferences.selectedGroup)
            || y.groups.includes(this.preferences.selectedLanguageClass)
          )
        ) {
          return (y.isEven === this.isWeekEven) || y.isBoth;
        }
        return false;
      });

      if (occur != null) {
        x = {...x, ...occur};
        return x;
      }
      return null;
    }).filter(x => x != null);

    return filtered[0] || {} as Lesson;
  }
}
