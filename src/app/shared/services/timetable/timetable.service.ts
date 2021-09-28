import { Injectable } from '@angular/core';
import { Timetable } from "../../../modules/timetable/timetable";
import { Preferences } from "../../models/preferences";
import firebase from "firebase/compat";
import { BehaviorSubject, Observable, of } from "rxjs";
import { TimetableData, TimetableStorage } from "./timetable-storage";
import { map } from "rxjs/operators";
import { TimetableEntry } from "../../models/timetable-entry";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  set preferences(value: Partial<Preferences>) {
    Object.assign(this._preferences, value);
  }

  get preferences(): Preferences {
    return this._preferences;
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

  private preferencesStorageKey = "preferences";

  private _preferences: Preferences = JSON.parse(localStorage.getItem(this.preferencesStorageKey) || "{}") as Preferences;

  public savePreferences(): void {
    localStorage.setItem(this.preferencesStorageKey, JSON.stringify(this._preferences));
  }

  private database: firebase.database.Database;

  private data$: BehaviorSubject<TimetableData | null> = new BehaviorSubject<TimetableData | null>(TimetableStorage.getDbDataFromStorage());

  private selectedGroupData$ = this.data$
    .pipe(
      map(data => {
        //TODO adjust accordingly to timetable settings
        const selectedGroupRegex = /i3([^.]|\.2)/;

        return (data?.classes || [])
          .map(
            x => ({
              ...x,
              occurrences: x.occurrences
                ? x.occurrences.filter((y: any) => y.groups.match(selectedGroupRegex))
                : []
            })
          )
          .flatMap(x => {
              return x.occurrences ? x.occurrences.map(
                o => ({
                  isOptional: x.isOptional,
                  name: x.name,
                  shortName: x.shortName,
                  class: x.class,
                  ...o,
                  lecturer: data?.lecturers[o.lecturer],
                  location: data?.locations[o.location]
                } as TimetableEntry)
              ) : []
            }
          );
      })
    )

  constructor(
    fireDatabase: AngularFireDatabase
  ) {
    this.database = fireDatabase.database;
    this.checkForDbUpdate();
  }

  public optionalClasses$ = this.data$.pipe(map(d => d?.optionalClasses || []));
  public languageClasses$ = this.data$.pipe(map(d => d?.languageClasses || []));
  public groups$ = of(Timetable.Groups);

  public get(weekDayIndex: number): Observable<(TimetableEntry | null)[]> {
    return this.selectedGroupData$
      .pipe(
        map(groupData => {
          const occurrences: (TimetableEntry | null)[] = [];
          const weekTypes = ["both", this.isSelectedWeekEven ? "even" : "odd"];

          for (let hourIndex = 0; hourIndex < Timetable.ClassesHours.length; hourIndex++) {
            const foundClass = groupData
              .find(e =>
                e.weekdayIndex === weekDayIndex && e.hourIndex === hourIndex
                && weekTypes.includes(e.weekType)
              ) || null;

            occurrences.push(foundClass);
          }

          return occurrences;
        })
      );
  }

  private checkForDbUpdate(): void {
    this.database.ref('version').get().then(x => {
      const dbVersion = x.val();
      const clientVersion = this.data$.value?.version || null;

      if (clientVersion !== dbVersion) {
        this.updateDbData();
      } else {
        this.database.goOffline();
      }
    });
  }

  private updateDbData(): void {
    this.database.ref()
      .get()
      .then(x => {
        this.data$.next(x.val() as TimetableData);
        TimetableStorage.saveDbDataToStorage(this.data$.value);
        this.database.goOffline();
      });
  }
}
