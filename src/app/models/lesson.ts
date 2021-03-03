import { DayTime } from "./day-time";

export interface Lesson {
  name: string;
  short_name: string;
  info: string;
  place: string;
  lecturer: string;
  class: string;
  obligatory: boolean;
  groups?: string[];
  occurs: DayTime[];
  additional_info?: string;
  links: {name: string; link: string;}[];
}
