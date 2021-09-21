import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable.component';
import { SharedModule } from "../../shared/shared.module";
import { TimetableColumnComponent } from './components/timetable-layout/timetable-column/timetable-column.component';
import { TimetableStringColumnComponent } from './components/timetable-layout/timetable-string-column/timetable-string-column.component';
import { TimetableHeaderComponent } from './components/timetable-layout/timetable-header/timetable-header.component';
import { TimetableBodyComponent } from './components/timetable-layout/timetable-body/timetable-body.component';
import { TimetableEntryDetailsComponent } from './components/timetable-entry-details/timetable-entry-details.component';


@NgModule({
  declarations: [
    TimetableComponent,
    TimetableColumnComponent,
    TimetableStringColumnComponent,
    TimetableHeaderComponent,
    TimetableBodyComponent,
    TimetableEntryDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TimetableComponent]
})
export class TimetableModule {
}
