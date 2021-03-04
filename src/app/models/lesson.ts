export interface LessonOccurance {
  lesson_number: number;
  day_number: number;
  info: string;
  lecturer: string;
  place: string;
  isBoth: boolean;
  isEven: boolean;
  groups: string[];
  additional_info: string;
  links: Link[];
}

export interface Link {
  name: string;
  link: string;
}

export interface Lesson extends LessonOccurance {
  name: string;
  short_name: string;
  class: string;
  isOptional: boolean;
  occurs: LessonOccurance[];
}
