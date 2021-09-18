import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './components/timetable/timetable.component';
import { SharedModule } from "../../shared/shared.module";
import { LessonDetailsComponent } from "./components/lesson-details/lesson-details.component";


@NgModule({
  declarations: [
    TimetableComponent,
    LessonDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TimetableComponent]
})
export class TimetableModule {
}
