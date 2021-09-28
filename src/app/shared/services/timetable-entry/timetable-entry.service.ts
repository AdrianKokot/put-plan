import { Injectable } from '@angular/core';
import { TimetableEntry } from "../../models/timetable-entry";

// @ts-ignore
import data from "C:/Users/kokotadrian/Desktop/work/put-plan-db/db.json";
import { Timetable } from "../../../modules/timetable/timetable";
import { TimetableService } from "../timetable/timetable.service";

@Injectable({
  providedIn: 'root'
})
export class TimetableEntryService {

  constructor(
    private timetable: TimetableService
  ) {
  }

  private groupData: TimetableEntry[] = data.classes
    .map(
      (x: any) => ({
        ...x,
        occurrences: x.occurrences
          ? x.occurrences.filter((y: any) => y.groups.match(/i3([^.]|\.2)/))
          : []
      })
    )
    .flatMap((x: any) => {
        console.log(x);
        return x.occurrences ? (x.occurrences as any[]).map(
          o => ({
            isOptional: x.isOptional,
            name: x.name,
            shortName: x.shortName,
            class: x.class,
            ...o,
            lecturer: data.lecturers[o.lecturer],
            location: data.locations[o.location]
          } as TimetableEntry)
        ) : []
      }
    );

  private getEntry(weekdayIndex: number, hourIndex: number): TimetableEntry | null {
    return this.groupData.find(x => x.weekdayIndex === weekdayIndex && x.hourIndex === hourIndex && ["both", this.timetable.isSelectedWeekEven ? "even" : "odd"].includes(x.weekType)) || null;
  }

  public get(weekDayIndex: number): (TimetableEntry | null)[] {
    const occurrences: (TimetableEntry | null)[] = [];

    for (let i = 0; i < Timetable.ClassesHours.length; i++) {
      occurrences.push(this.getEntry(weekDayIndex, i));
    }

    return occurrences;
  }
}
