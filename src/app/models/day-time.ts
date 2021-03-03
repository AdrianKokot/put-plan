export interface DayTime {
  lesson_number: number;
  day_number: number;
  info: string;
  lecturer: string;
  place: string;
  isBoth: boolean;
  isEven: boolean;
  groups: string[];
  additional_info: string;
  links: {name: string; link: string;}[];
}
