import { Component } from '@angular/core';
import { TimetableService } from '../../../shared/services/timetable/timetable.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  constructor(public timetable: TimetableService) { }
}
