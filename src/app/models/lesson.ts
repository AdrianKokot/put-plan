import { DayTime } from "./day-time";

export interface Lesson {
  name: string;
  short_name: string;
  info: string;
  place: string;
  lecturer: string;
  class: string;
  obligatory: boolean;
  occurs: DayTime[];
}
