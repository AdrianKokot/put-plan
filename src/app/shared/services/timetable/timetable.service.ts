import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, take, tap } from 'rxjs/operators';
import { firebaseConfig } from 'src/environments/firebase';
import { Timetable } from '../../../modules/timetable/timetable';
import { Preferences } from '../../models/preferences';
import { TimetableEntry } from '../../models/timetable-entry';
import { TimetableData, TimetableStorage } from './timetable-storage';

@Injectable({
  providedIn: 'root',
})
export class TimetableService implements OnDestroy {
  private apiEndpoints = {
    version: firebaseConfig.databaseURL + '/version.json',
    root: firebaseConfig.databaseURL + '/.json',
  };

  private preferencesStorageKey = 'preferences';

  private _preferences: Preferences = JSON.parse(
    localStorage.getItem(this.preferencesStorageKey) || '{}'
  ) as Preferences;
  public set preferences(value: Partial<Preferences>) {
    Object.assign(this._preferences, value);
    this.data$.next(this.data$.value);
  }
  public get preferences(): Preferences {
    return this._preferences;
  }

  private isCurrentWeekEven: boolean = true;
  private _isSelectedWeekEven = this.isCurrentWeekEven;
  public get isSelectedWeekEven(): boolean {
    return this._isSelectedWeekEven;
  }
  public get isSelectedWeekSameAsCurrentWeek(): boolean {
    return this._isSelectedWeekEven === this.isCurrentWeekEven;
  }

  private data$: BehaviorSubject<TimetableData | null> =
    new BehaviorSubject<TimetableData | null>(
      TimetableStorage.getDbDataFromStorage()
    );
  private selectedGroupData$ = new BehaviorSubject<TimetableEntry[]>([]);
  public optionalClasses$ = this.data$.pipe(
    map((d) => d?.optionalClasses || [])
  );
  public languageClasses$ = this.data$.pipe(
    map((d) => d?.languageClasses || [])
  );
  public groups$ = this.data$.pipe(map((d) => d?.groups || []));
  public version$ = this.data$.pipe(map((d) => d?.version || ''));
  public isWeekParityReversed$ = this.data$.pipe(
    map((d) => d?.isWeekParityReversed || false),
    share()
  );

  private selectedGroupDataSubscription = this.data$
    .pipe(
      tap((data) => {
        if(data !== null) {
          const isCurrentWeekEven = Timetable.isCurrentWeekEven(data.isWeekParityReversed);
          this.isCurrentWeekEven = isCurrentWeekEven;
          this._isSelectedWeekEven = isCurrentWeekEven;
        }
      }),
      map((data) => {
        if (!this.preferences.selectedGroup) {
          return [];
        }

        const groupParts = this.preferences.selectedGroup.split('.');
        const langClass = this.preferences.selectedLanguageClass
          ? '|' + this.preferences.selectedLanguageClass
          : '';
        const optionalClasses = this.preferences.selectedOptionalClasses || [];

        const selectedGroupRegex = new RegExp(
          `(${groupParts[0]}([^.]|$|\.${groupParts[1]}))${langClass}`
        );

        return (data?.classes || [])
          .map((dataClass) => {
            const shouldAttend =
              dataClass.occurrences &&
              (!dataClass.isOptional ||
                optionalClasses.includes(dataClass.shortName));

            return {
              ...dataClass,
              occurrences: shouldAttend
                ? dataClass.occurrences.filter((occurrence) =>
                    occurrence.groups.match(selectedGroupRegex)
                  )
                : [],
            };
          })
          .flatMap((dataClass) => {
            return dataClass.occurrences.map((o) => {
              return {
                isOptional: dataClass.isOptional,
                name: dataClass.name,
                shortName: dataClass.shortName,
                class: dataClass.class,
                ...o,
                lecturer: data?.lecturers[o.lecturer],
                location: data?.locations[o.location],
              } as TimetableEntry;
            });
          });
      })
    )
    .subscribe((entries) => {
      this.selectedGroupData$.next(entries);
    });

  constructor(private http: HttpClient) {
    this.checkForDbUpdate();
  }

  public changeWeek(): void {
    this._isSelectedWeekEven = !this._isSelectedWeekEven;
    this.selectedGroupData$.next(this.selectedGroupData$.value);
  }

  public savePreferences(): void {
    localStorage.setItem(
      this.preferencesStorageKey,
      JSON.stringify(this._preferences)
    );
  }

  public get(weekDayIndex: number): Observable<(TimetableEntry | null)[]> {
    return this.selectedGroupData$.pipe(
      map((groupData) => {
        const occurrences: (TimetableEntry | null)[] = [];
        const weekTypes = ['both', this.isSelectedWeekEven ? 'even' : 'odd'];

        for (
          let hourIndex = 0;
          hourIndex < Timetable.ClassesHours.length;
          hourIndex++
        ) {
          const foundClass =
            groupData.find(
              (e) =>
                e.weekdayIndex === weekDayIndex &&
                e.hourIndex === hourIndex &&
                weekTypes.includes(e.weekType)
            ) || null;

          occurrences.push(foundClass);
        }

        return occurrences;
      })
    );
  }

  public checkForDbUpdate(): void {
    this.http
      .get<string>(this.apiEndpoints.version)
      .pipe(take(1))
      .subscribe((dbVersion) => {
        const clientVersion = this.data$.value?.version || null;

        if (clientVersion !== dbVersion) {
          this.updateDbData();
        }
      });
  }

  private updateDbData(): void {
    this.http
      .get<TimetableData>(this.apiEndpoints.root)
      .pipe(take(1))
      .subscribe((data) => {
        this.data$.next(data);
        TimetableStorage.saveDbDataToStorage(this.data$.value);
      });
  }

  public ngOnDestroy(): void {
    this.selectedGroupDataSubscription.unsubscribe();
  }
}
