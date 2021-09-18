import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './components/timetable/timetable.component';
import { SharedModule } from "../../shared/shared.module";
import { LessonDetailsComponent } from "./components/lesson-details/lesson-details.component";
import { TimetableColumnComponent } from './components/timetable-column/timetable-column.component';
import { TimetableStringColumnComponent } from './components/timetable-string-column/timetable-string-column.component';


@NgModule({
  declarations: [
    TimetableComponent,
    LessonDetailsComponent,
    TimetableColumnComponent,
    TimetableStringColumnComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TimetableComponent]
})
export class TimetableModule {
}
